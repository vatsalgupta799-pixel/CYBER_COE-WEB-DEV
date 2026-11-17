'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Terminal, BookOpen, Wrench, ChevronRight, Clock, Target, Flag,
  CheckCircle2, XCircle, Square, Lightbulb, Code, Sparkles, Copy, Check, Play,
  HelpCircle, ChevronDown, ChevronUp, Shield, Rocket, Info, ExternalLink, ShieldCheck, ShieldAlert,
  Eye, EyeOff, KeyRound, Zap, Bot, MessageSquare, Cpu
} from 'lucide-react';
import LiveKaliTerminal from '../../../components/LiveKaliTerminal';
import LabAIMentor from '../../../components/LabAIMentor';
import DataDustBackground from '../../../components/DataDustBackground';
import { labDetails } from '../../../data/labDetails';

export default function LabPage({ params }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : (params || {});
  const labId = resolvedParams?.labId || 'sql-injection';
  const [isLabStarted, setIsLabStarted] = useState(false);
  const [sizeTier, setSizeTier] = useState('normal'); // 'compact' | 'normal' | 'expanded' | 'fullscreen'
  const [activeRightTab, setActiveRightTab] = useState('guide'); // 'guide' | 'ai_mentor'
  const [isAiFloatingOpen, setIsAiFloatingOpen] = useState(false);
  const labData = labDetails[labId] || {
    title: 'Unknown Lab',
    difficulty: 'Beginner',
    category: 'Cybersecurity Practice',
    estimatedTime: '1 Hour (60 Mins)',
    concept: 'Learn hands-on cybersecurity techniques in a safe, fun sandbox.',
    analogy: 'Think of this lab like an interactive practice flight simulator for ethical hacking.',
    example: {
      normal: 'Normal input',
      payload: 'Exploit payload',
      explanation: 'Learn how inputs interact with security boundaries.'
    },
    mitreAttack: {
      id: 'T1190',
      name: 'Exploit Public-Facing Application',
      tactic: 'Initial Access',
      url: 'https://attack.mitre.org/techniques/T1190/',
      defense: 'Input validation, parameterized queries, and Web Application Firewalls (WAF).'
    },
    tools: ['bash', 'nmap', 'curl'],
    solutionFlag: 'FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}',
    attackSteps: [
      {
        title: 'Step 1: Launch Workspace',
        explanation: 'Click Launch Kali Workspace to start your practice terminal.',
        command: 'help',
        breakdown: [
          { part: 'help', meaning: 'Displays available built-in commands and terminal usage.' }
        ]
      }
    ],
    flagHint: 'Run the exploit commands in your terminal to extract the flag.'
  };

  const isAdvancedLab = labData.difficulty === 'Advanced';
  const labDurationSeconds = isAdvancedLab ? 7200 : 3600; // 2 Hours (7200s) for Advanced, 1 Hour (3600s) for Beginner/Intermediate

  const [timeRemaining, setTimeRemaining] = useState(labDurationSeconds);
  const [targetIp, setTargetIp] = useState('10.100.1.10');
  const [sessionId, setSessionId] = useState(`session-${labId || 'demo'}`);
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [ranCmd, setRanCmd] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolutionFlag, setShowSolutionFlag] = useState(false);
  
  // Flag Submission State
  const [flagInput, setFlagInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [flagFeedback, setFlagFeedback] = useState(null);

  // Synchronize timer duration with selected lab
  useEffect(() => {
    setTimeRemaining(labDurationSeconds);
  }, [labId, labDurationSeconds]);

  useEffect(() => {
    let interval;
    if (isLabStarted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLabStarted, timeRemaining]);

  const formatTimer = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartLab = () => {
    setIsLabStarted(true);
    setSizeTier('normal');
    setTimeRemaining(labDurationSeconds);
    setShowSolutionFlag(false);
    setActiveRightTab('guide');
    setSessionId(`cr-${labId}-${Date.now().toString().slice(-6)}`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  const handleStopLab = () => {
    setIsLabStarted(false);
    setIsSolved(false);
    setFlagFeedback(null);
    setFlagInput('');
    setShowSolutionFlag(false);
    setIsAiFloatingOpen(false);
    setTimeRemaining(labDurationSeconds);
  };

  // 🔴 Red: Return to Lab Explanation
  const handleRedClose = () => {
    setIsLabStarted(false);
  };

  // 🟡 Yellow: Decrease Lab Size
  const handleYellowDecrease = () => {
    setSizeTier((prev) => {
      if (prev === 'fullscreen') return 'expanded';
      if (prev === 'expanded') return 'normal';
      if (prev === 'normal') return 'compact';
      return 'compact';
    });
  };

  // 🟢 Green: Increase Lab Size
  const handleGreenIncrease = () => {
    setSizeTier((prev) => {
      if (prev === 'compact') return 'normal';
      if (prev === 'normal') return 'expanded';
      if (prev === 'expanded') return 'fullscreen';
      return 'fullscreen';
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const autoRunInTerminal = (command) => {
    window.dispatchEvent(new CustomEvent('cybercoe:run_command', { detail: command }));
    setRanCmd(command);
    setTimeout(() => setRanCmd(null), 2000);
  };

  const autoFillSolutionFlag = () => {
    if (labData.solutionFlag) {
      setFlagInput(labData.solutionFlag);
      copyToClipboard(labData.solutionFlag);
    }
  };

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    if (!flagInput.trim()) return;

    const cleanFlag = flagInput.trim();
    if (
      cleanFlag === 'FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}' ||
      cleanFlag.toLowerCase().includes('sql_1nj3ct10n') ||
      cleanFlag === 'FLAG{c0mm4nd_1nj3ct10n_pwn3d_2026}' ||
      cleanFlag === 'FLAG{hello_cyber_coe_2026}' ||
      cleanFlag === 'FLAG{b0f_st4ck_sm4sh_r0p_g4dg3t_pwn_2026}' ||
      cleanFlag === 'FLAG{4pt_m3m0ry_f0r3ns1cs_v0l4t1l1ty_hunt3r_2026}' ||
      cleanFlag === 'FLAG{m4lw4r3_r3v3rs1ng_upx_d3p4ck_ptf_2026}' ||
      (labData.solutionFlag && cleanFlag === labData.solutionFlag)
    ) {
      setIsSolved(true);
      setFlagFeedback({ isCorrect: true, message: '🎉 Outstanding job! Flag verified. Challenge completed successfully!' });
    } else {
      setFlagFeedback({ isCorrect: false, message: 'Incorrect flag. Follow the Step-by-Step Attack Guide on the right or ask AI Mentor for a hint!' });
    }
  };

  useEffect(() => {
    if (isLabStarted) {
      const resetScroll = () => {
        if (typeof window !== 'undefined') {
          if (window.scrollX !== 0 || window.pageXOffset !== 0) {
            window.scrollTo(0, 0);
          }
          if (document.documentElement) document.documentElement.scrollLeft = 0;
          if (document.body) document.body.scrollLeft = 0;
        }
      };
      resetScroll();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('scroll', resetScroll);
      return () => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        window.removeEventListener('scroll', resetScroll);
      };
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  }, [isLabStarted]);

  // Autostart workspace when navigated with ?autostart=true
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autostart') === 'true') {
        handleStartLab();
      }
    }
  }, [labId]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#03050a', color: '#fff', overflowX: 'hidden' }}>

      {/* Fullscreen Interactive Kali Linux Tactical Workspace Layer */}
      {isLabStarted && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '100vw',
          height: '100%',
          maxHeight: '100vh',
          background: '#03050a',
          zIndex: 9990,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Top Workspace Header Bar (Visible when Lab is Started & Not in Fullscreen) */}
          {sizeTier !== 'fullscreen' && (
            <div style={{
              height: '60px',
              background: 'rgba(10, 15, 25, 0.98)',
              borderBottom: '1px solid rgba(30, 101, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1.5rem',
              flexShrink: 0,
              zIndex: 10
            }}>
              {/* Left Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={handleRedClose}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#fff',
                    background: 'rgba(255,255,255,0.08)',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  <ArrowLeft size={16} /> Briefing
                </button>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>{labData.title}</span>
                    <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '4px', background: 'rgba(30, 101, 255, 0.2)', border: '1px solid #1E65FF', color: '#1E65FF', fontWeight: 'bold' }}>
                      {labData.difficulty === 'Advanced' ? '2 HOURS LAB SESSION' : '1 HOUR LAB SESSION'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Target Info & Quick MITRE Link */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '0.4rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  fontSize: '0.85rem',
                  fontFamily: 'monospace'
                }}>
                  <Target size={16} color="#ef4444" />
                  <span style={{ color: '#94a3b8' }}>Target IP:</span>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>{targetIp}:80</span>
                </div>

                {labData.mitreAttack && (
                  <a
                    href={labData.mitreAttack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open official MITRE ATT&CK page for ${labData.mitreAttack.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'linear-gradient(135deg, #1E65FF 0%, #0052cc 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      color: '#fff',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      boxShadow: '0 0 10px rgba(30, 101, 255, 0.5)'
                    }}
                  >
                    <Shield size={12} />
                    <span>MITRE {labData.mitreAttack.id} ↗</span>
                  </a>
                )}
              </div>

              {/* Right Timer & Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                {/* Timer countdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 'bold', background: 'rgba(245, 158, 11, 0.1)', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  <Clock size={15} />
                  <span>{formatTimer(timeRemaining)}</span>
                </div>

                {/* Stop Lab */}
                <button
                  onClick={handleStopLab}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#ef4444',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}
                >
                  <Square size={13} /> Stop Lab
                </button>
              </div>
            </div>
          )}

          {/* Main Tactical Terminal Workspace View (When Started) */}
          <div style={{
            flex: 1,
            display: 'flex',
            gap: '0.85rem',
            padding: sizeTier === 'fullscreen' ? 0 : '0.65rem 1rem 1rem 1rem',
            background: '#03050a',
            overflow: 'hidden',
            minHeight: 0,
            width: '100%',
            maxWidth: '100vw',
            boxSizing: 'border-box'
          }}>
            {/* Left Side: Live Kali Linux Terminal with Dynamic Size */}
            <div style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              minHeight: 0,
              overflow: 'hidden'
            }}>
              <LiveKaliTerminal
                sessionId={sessionId}
                targetIp={targetIp}
                labId={labId}
                sizeTier={sizeTier}
                onClose={handleRedClose}
                onDecreaseSize={handleYellowDecrease}
                onIncreaseSize={handleGreenIncrease}
              />
            </div>

            {/* Right Side: Tabbed Interface (Guided Attack Steps OR AI Lab Mentor) */}
            {sizeTier !== 'fullscreen' && (
              <div style={{
                width: sizeTier === 'compact' ? '520px' : sizeTier === 'expanded' ? '340px' : '460px',
                maxWidth: '46vw',
                minWidth: '320px',
                flexShrink: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                overflowY: 'hidden',
                minHeight: 0,
                transition: 'width 0.2s ease'
              }}>
              {/* Tab Navigation (Attack Guide vs AI Mentor) */}
              <div style={{
                display: 'flex',
                background: 'rgba(10, 15, 25, 0.95)',
                padding: '4px',
                borderRadius: '8px',
                border: '1px solid rgba(30, 101, 255, 0.3)',
                gap: '4px',
                flexShrink: 0
              }}>
                <button
                  onClick={() => setActiveRightTab('guide')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeRightTab === 'guide' ? '#1E65FF' : 'transparent',
                    color: activeRightTab === 'guide' ? '#fff' : '#94a3b8',
                    fontSize: '0.82rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Terminal size={15} /> Attack Guide
                </button>

                <button
                  onClick={() => setActiveRightTab('ai_mentor')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeRightTab === 'ai_mentor' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                    color: activeRightTab === 'ai_mentor' ? '#fff' : '#94a3b8',
                    fontSize: '0.82rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Bot size={15} /> AI Lab Mentor
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                </button>
              </div>

              {/* Tab 1: Guided Attack Steps & Flag Submission */}
              {activeRightTab === 'guide' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem', overflowY: 'auto' }}>
                  {/* Flag Submission Card */}
                  <div style={{
                    background: 'rgba(10, 15, 25, 0.95)',
                    border: '1px solid rgba(30, 101, 255, 0.3)',
                    borderRadius: '8px',
                    padding: '1.1rem',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                    flexShrink: 0
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Flag size={17} color="#1E65FF" />
                        <span style={{ fontWeight: 'bold', fontSize: '0.88rem' }}>Flag Verification</span>
                      </div>
                      {isSolved && (
                        <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
                          SOLVED
                        </span>
                      )}
                    </div>

                    <form onSubmit={handleFlagSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                        placeholder="FLAG{...}"
                        disabled={isSolved}
                        style={{
                          flex: 1,
                          background: '#05080f',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '6px',
                          padding: '0.55rem 0.75rem',
                          color: '#fff',
                          fontFamily: 'monospace',
                          fontSize: '0.82rem',
                          outline: 'none'
                        }}
                      />
                      <button
                        type="submit"
                        disabled={isSolved || !flagInput.trim()}
                        style={{
                          background: '#1E65FF',
                          border: 'none',
                          color: '#fff',
                          padding: '0.55rem 1.1rem',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          opacity: isSolved || !flagInput.trim() ? 0.5 : 1
                        }}
                      >
                        Submit
                      </button>
                    </form>

                    {flagFeedback && (
                      <div style={{
                        marginTop: '0.65rem',
                        padding: '0.55rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: flagFeedback.isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        border: `1px solid ${flagFeedback.isCorrect ? '#10b981' : '#ef4444'}`,
                        color: flagFeedback.isCorrect ? '#10b981' : '#ef4444'
                      }}>
                        {flagFeedback.isCorrect ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                        <span>{flagFeedback.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Guided Attack Steps */}
                  <div style={{
                    flex: 1,
                    background: 'rgba(10, 15, 25, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '1.1rem',
                    overflowY: 'auto'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1E65FF', fontSize: '0.9rem', margin: 0 }}>
                        <Terminal size={17} /> Guided Attack Steps
                      </h3>
                      <span style={{ fontSize: '0.72rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2px 6px', borderRadius: '4px' }}>
                        1-Click Auto-Run
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {labData.attackSteps ? (
                        labData.attackSteps.map((step, idx) => (
                          <div key={idx} style={{
                            background: '#05080f',
                            padding: '0.8rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(30, 101, 255, 0.25)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                              <span style={{ fontWeight: 'bold', color: '#60a5fa', fontSize: '0.85rem' }}>
                                {step.title}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                                #{idx + 1}
                              </span>
                            </div>

                            <p style={{ color: '#cbd5e1', fontSize: '0.8rem', marginBottom: step.command ? '0.6rem' : '0', lineHeight: '1.4', margin: step.command ? '0 0 0.6rem 0' : '0' }}>
                              {step.explanation}
                            </p>

                            {step.command ? (
                              <>
                                <div style={{
                                  background: 'rgba(0,0,0,0.7)',
                                  border: '1px solid rgba(30, 101, 255, 0.4)',
                                  borderRadius: '6px',
                                  padding: '0.45rem 0.7rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  fontFamily: 'monospace',
                                  fontSize: '0.78rem',
                                  color: '#34d399'
                                }}>
                                  <span style={{ wordBreak: 'break-all' }}>$ {step.command}</span>
                                  
                                  <div style={{ display: 'flex', gap: '0.3rem', marginLeft: '0.5rem', flexShrink: 0 }}>
                                    <button
                                      onClick={() => autoRunInTerminal(step.command)}
                                      title="Run command in terminal"
                                      style={{
                                        background: '#1E65FF',
                                        border: 'none',
                                        color: '#fff',
                                        borderRadius: '4px',
                                        padding: '3px 8px',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '3px'
                                      }}
                                    >
                                      <Play size={10} fill="#fff" /> Run
                                    </button>

                                    <button
                                      onClick={() => copyToClipboard(step.command)}
                                      title="Copy command"
                                      style={{
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        color: '#cbd5e1',
                                        borderRadius: '4px',
                                        padding: '3px 6px',
                                        fontSize: '0.7rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '2px'
                                      }}
                                    >
                                      {copiedCmd === step.command ? <Check size={11} color="#10b981" /> : <Copy size={11} />}
                                    </button>
                                  </div>
                                </div>

                                {step.breakdown && (
                                  <div style={{ marginTop: '0.45rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.45rem 0.6rem' }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#93c5fd', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                      <HelpCircle size={11} color="#60a5fa" />
                                      <span>Command Meaning & Why We Use It:</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                      {step.breakdown.map((item, bIdx) => (
                                        <div key={bIdx} style={{ fontSize: '0.72rem', lineHeight: '1.3', display: 'flex', alignItems: 'flex-start', gap: '0.3rem' }}>
                                          <code style={{ background: 'rgba(30,101,255,0.25)', color: '#93c5fd', padding: '1px 4px', borderRadius: '3px', fontFamily: 'monospace', fontWeight: 'bold', flexShrink: 0 }}>
                                            {item.part}
                                          </code>
                                          <span style={{ color: '#94a3b8' }}>➔ {item.meaning}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div style={{
                                marginTop: '0.35rem',
                                padding: '0.4rem 0.6rem',
                                background: 'rgba(30, 101, 255, 0.08)',
                                borderRadius: '4px',
                                border: '1px dashed rgba(30, 101, 255, 0.3)',
                                fontSize: '0.72rem',
                                color: '#93c5fd',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                              }}>
                                <Flag size={12} color="#1E65FF" />
                                <span>Paste the discovered flag into the verification box above!</span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : null}
                    </div>

                    {/* Stuck? See Flag Drawer */}
                    <div style={{
                      marginTop: '0.85rem',
                      background: showSolutionFlag ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${showSolutionFlag ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '6px',
                      padding: '0.65rem',
                      transition: 'all 0.2s ease'
                    }}>
                      <button
                        onClick={() => setShowSolutionFlag((prev) => !prev)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: showSolutionFlag ? '#f87171' : '#94a3b8',
                          fontWeight: 'bold',
                          fontSize: '0.78rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          {showSolutionFlag ? <EyeOff size={14} /> : <Eye size={14} />}
                          <span>{showSolutionFlag ? 'Hide Solution Flag' : 'Stuck? See the Flag'}</span>
                        </span>
                        {showSolutionFlag ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {showSolutionFlag && (
                        <div style={{ marginTop: '0.65rem', paddingTop: '0.65rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ fontSize: '0.72rem', color: '#fca5a5', marginBottom: '0.35rem', fontWeight: 'bold' }}>
                            Challenge Solution Flag:
                          </div>
                          <div style={{
                            background: 'rgba(0,0,0,0.8)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            borderRadius: '4px',
                            padding: '0.35rem 0.55rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontFamily: 'monospace',
                            fontSize: '0.78rem',
                            color: '#f87171',
                            marginBottom: '0.45rem'
                          }}>
                            <span>{labData.solutionFlag || 'FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}'}</span>
                            <button
                              onClick={() => copyToClipboard(labData.solutionFlag || 'FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}')}
                              title="Copy flag"
                              style={{ background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer' }}
                            >
                              {copiedCmd === (labData.solutionFlag || 'FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}') ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                            </button>
                          </div>

                          <button
                            onClick={autoFillSolutionFlag}
                            style={{
                              width: '100%',
                              background: 'rgba(30, 101, 255, 0.2)',
                              border: '1px solid #1E65FF',
                              color: '#60a5fa',
                              borderRadius: '4px',
                              padding: '0.3rem',
                              fontSize: '0.72rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px'
                            }}
                          >
                            <Zap size={11} /> Auto-fill into Submission Box
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Embedded AI Lab Mentor */}
              {activeRightTab === 'ai_mentor' && (
                <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
                  <LabAIMentor
                    labId={labId}
                    labData={labData}
                    isLabStarted={isLabStarted}
                    targetIp={targetIp}
                    isSolved={isSolved}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      )}

      {/* Floating AI Lab Mentor Drawer (Only when lab is started) */}
      {isLabStarted && isAiFloatingOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '420px',
            height: '560px',
            zIndex: 100,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <LabAIMentor
            labId={labId}
            labData={labData}
            isLabStarted={isLabStarted}
            targetIp={targetIp}
            isSolved={isSolved}
            isOpen={isAiFloatingOpen}
            onClose={() => setIsAiFloatingOpen(false)}
          />
        </div>
      )}

      {/* Floating AI Mentor Button (Only in Active Lab Terminal View) */}
      {isLabStarted && !isAiFloatingOpen && activeRightTab !== 'ai_mentor' && (
        <button
          onClick={() => setIsAiFloatingOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'linear-gradient(135deg, #1E65FF 0%, #10b981 100%)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '50px',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 'bold',
            fontSize: '0.88rem',
            cursor: 'pointer',
            zIndex: 90,
            boxShadow: '0 4px 20px rgba(30, 101, 255, 0.6)',
            animation: 'pulseGlow 2.5s infinite'
          }}
        >
          <Bot size={20} />
          <span>Ask AI Mentor</span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
        </button>
      )}

      {/* Background Cyber Dust when viewing briefing */}
      {!isLabStarted && <DataDustBackground />}

      {/* ======================================================== */}
      {/* Super Beginner-Friendly Mission Briefing (When NOT Started) */}
      {/* ======================================================== */}
      {!isLabStarted && (
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          zIndex: 20,
          background: 'radial-gradient(circle at center, #0a0f1a 0%, #03050a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '3rem 2rem 4rem 2rem'
        }}>
        {/* Back Button & Top Launch CTA */}
        <div style={{ width: '100%', maxWidth: '1100px', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link 
              href="/practice-labs" 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'none',
                background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1.25rem', borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem'
              }}
            >
              <ArrowLeft size={18} /> Back to Labs
            </Link>

            <button 
              onClick={handleStartLab}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #1E65FF 0%, #0052cc 100%)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '0.6rem 1.4rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(30, 101, 255, 0.6)',
                transition: 'all 0.2s ease'
              }}
            >
              <Play size={15} fill="#fff" /> Launch Kali Workspace
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* GLOWING MITRE BADGE AT THE VERY TOP */}
            {labData.mitreAttack && (
              <a
                href={labData.mitreAttack.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #1E65FF 0%, #0052cc 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  color: '#fff',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  textDecoration: 'none',
                  boxShadow: '0 0 15px rgba(30, 101, 255, 0.6)'
                }}
              >
                <Shield size={13} />
                <span>MITRE {labData.mitreAttack.id} ↗</span>
              </a>
            )}

            <span style={{ background: 'rgba(30, 101, 255, 0.15)', border: '1px solid #1E65FF', color: '#60a5fa', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {labData.category || 'Web Security'}
            </span>
            <span style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#34d399', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {labData.difficulty || 'Beginner'}
            </span>
            <span style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', color: '#fbbf24', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} /> {labData.estimatedTime || '1 Hour (60 Mins)'}
            </span>
          </div>
        </div>

        <div style={{
          maxWidth: '1100px', width: '100%',
          background: 'rgba(10, 15, 25, 0.85)',
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(30, 101, 255, 0.3)',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 25px rgba(30, 101, 255, 0.12)',
          margin: 'auto 0'
        }}>
          {/* Header Title */}
          <div style={{ borderBottom: '2px solid rgba(30, 101, 255, 0.3)', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1E65FF', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              <Sparkles size={16} /> Beginner-Friendly Mission Briefing
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>
              {labData.title}
            </h1>
          </div>

          {/* 3-Step "How This Lab Works" Visual Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(30, 101, 255, 0.08)', border: '1px solid rgba(30, 101, 255, 0.25)', borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1E65FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.88rem', color: '#60a5fa' }}>Launch Workspace</div>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{isAdvancedLab ? '2-Hour sandbox starts in browser' : '1-Hour sandbox starts in browser'}</div>
              </div>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.88rem', color: '#34d399' }}>Follow Guided Steps</div>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Click &quot;Run&quot; on each command</div>
              </div>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.88rem', color: '#fbbf24' }}>Submit Secret Flag</div>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Verify & complete challenge</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2.5rem' }}>
            
            {/* 1. Beginner-Friendly Concept & Metaphor */}
            <div style={{ background: 'rgba(30, 101, 255, 0.05)', borderRadius: '10px', padding: '1.5rem', border: '1px solid rgba(30, 101, 255, 0.25)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', marginBottom: '0.75rem', fontSize: '1.15rem' }}>
                <BookOpen size={20} /> What is this concept? (In Simple Words)
              </h3>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.95rem', margin: 0 }}>
                {labData.concept}
              </p>

              {labData.analogy && (
                <div style={{
                  marginTop: '1.25rem',
                  padding: '1.1rem',
                  background: 'rgba(245, 158, 11, 0.08)',
                  borderLeft: '4px solid #f59e0b',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem'
                }}>
                  <Lightbulb size={22} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontWeight: 'bold', color: '#fbbf24', fontSize: '0.9rem' }}>🎒 Everyday Life Analogy (For Absolute Beginners): </span>
                    <p style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: '1.6', margin: '0.35rem 0 0 0' }}>{labData.analogy}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. 🛡️ MITRE ATT&CK Framework & Defense Mechanism (PROMINENT HIGHLIGHT) */}
            {labData.mitreAttack && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(30, 101, 255, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
                borderRadius: '10px',
                padding: '1.75rem',
                border: '2px solid rgba(30, 101, 255, 0.5)',
                boxShadow: '0 0 30px rgba(30, 101, 255, 0.25)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ color: '#60a5fa', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      Official Cybersecurity Standard
                    </div>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
                      <Shield size={22} color="#1E65FF" /> MITRE ATT&CK® Technique: {labData.mitreAttack.id}
                    </h3>
                  </div>

                  {/* HIGH-CONTRAST CLICKABLE MITRE LINK BUTTON */}
                  <a
                    href={labData.mitreAttack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'linear-gradient(135deg, #1E65FF 0%, #0052cc 100%)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#fff',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      boxShadow: '0 0 20px rgba(30, 101, 255, 0.6)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      cursor: 'pointer'
                    }}
                  >
                    <span>🔗 Open Official MITRE Page ({labData.mitreAttack.id})</span>
                    <ExternalLink size={16} />
                  </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  {/* Attack Technique Details */}
                  <div style={{ background: '#05080f', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(30, 101, 255, 0.3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span style={{ background: '#1E65FF', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
                        {labData.mitreAttack.id}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        Tactic: <strong>{labData.mitreAttack.tactic}</strong>
                      </span>
                    </div>
                    <div style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      {labData.mitreAttack.name}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                      Referral URL: <a href={labData.mitreAttack.url} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', wordBreak: 'break-all' }}>{labData.mitreAttack.url}</a>
                    </div>
                  </div>

                  {/* Defense Mechanism */}
                  <div style={{ background: '#05080f', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      <ShieldCheck size={18} /> How Blue Teams Defend This:
                    </div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      {labData.mitreAttack.defense}
                    </div>
                  </div>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Info size={15} color="#60a5fa" style={{ flexShrink: 0 }} />
                  <span>Click the blue button above to open the official MITRE ATT&CK knowledge base in a new tab for deep-dive technical documentation!</span>
                </div>
              </div>
            )}

            {/* 3. Concrete Code / Attack Example */}
            {labData.example && (
              <div style={{ background: 'rgba(16, 185, 129, 0.04)', borderRadius: '10px', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', marginBottom: '1rem', fontSize: '1.15rem' }}>
                  <Code size={20} /> How It Works in Practice
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  {/* Normal Input */}
                  <div style={{ background: '#05080f', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      😇 Normal Everyday Action:
                    </div>
                    <code style={{ fontFamily: 'monospace', color: '#93c5fd', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                      {labData.example.normal}
                    </code>
                  </div>

                  {/* Exploit Payload */}
                  <div style={{ background: '#05080f', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#f87171', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      🕵️ What an Ethical Hacker Tests:
                    </div>
                    <code style={{ fontFamily: 'monospace', color: '#fca5a5', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                      {labData.example.payload}
                    </code>
                  </div>
                </div>

                <div style={{ color: '#a0aec0', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  💡 <strong>In Plain English:</strong> {labData.example.explanation}
                </div>
              </div>
            )}

            {/* 4. Ready-to-Run Step-by-Step Attack Plan */}
            <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', marginBottom: '1.25rem', fontSize: '1.15rem' }}>
                <Terminal size={20} /> Ready-to-Run Attack Plan (Step-by-Step with Command Anatomy)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {labData.attackSteps ? (
                  labData.attackSteps.map((step, idx) => (
                    <div key={idx} style={{ background: '#05080f', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(30, 101, 255, 0.2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span style={{ fontWeight: 'bold', color: '#60a5fa', fontSize: '0.95rem' }}>
                          {step.title}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
                          Step {idx + 1} of {labData.attackSteps.length}
                        </span>
                      </div>
                      
                      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: step.command ? '0.75rem' : '0', lineHeight: '1.5', margin: step.command ? '0 0 0.75rem 0' : '0' }}>
                        {step.explanation}
                      </p>

                      {step.command && (
                        <>
                          <div style={{
                            background: 'rgba(0,0,0,0.7)',
                            border: '1px solid rgba(30, 101, 255, 0.4)',
                            borderRadius: '6px',
                            padding: '0.6rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontFamily: 'monospace',
                            fontSize: '0.85rem',
                            color: '#34d399'
                          }}>
                            <span style={{ wordBreak: 'break-all' }}>$ {step.command}</span>
                            <button
                              onClick={() => copyToClipboard(step.command)}
                              title="Copy command"
                              style={{
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '4px',
                                color: '#e2e8f0',
                                padding: '4px 8px',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginLeft: '0.75rem',
                                flexShrink: 0
                              }}
                            >
                              {copiedCmd === step.command ? (
                                <>
                                  <Check size={13} color="#10b981" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy size={13} /> Copy
                                </>
                              )}
                            </button>
                          </div>

                          {/* Command Breakdown Box */}
                          {step.breakdown && (
                            <div style={{ marginTop: '0.65rem', background: 'rgba(30, 101, 255, 0.05)', borderRadius: '6px', border: '1px solid rgba(30, 101, 255, 0.15)', padding: '0.65rem 0.85rem' }}>
                              <div style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#93c5fd', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <HelpCircle size={14} color="#60a5fa" />
                                <span>Why & How this command works:</span>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                {step.breakdown.map((item, bIdx) => (
                                  <div key={bIdx} style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.4', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                                    <code style={{ background: 'rgba(30,101,255,0.25)', color: '#93c5fd', padding: '1px 5px', borderRadius: '3px', fontFamily: 'monospace', fontWeight: 'bold', flexShrink: 0 }}>
                                      {item.part}
                                    </code>
                                    <span style={{ color: '#94a3b8' }}>➔ {item.meaning}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))
                ) : null}
              </div>
            </div>

            {/* 5. Pre-installed Offensive Arsenal */}
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F59E0B', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                <Wrench size={18} /> Tools You Will Use in this Lab
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {labData.tools.map((tool, idx) => (
                  <span key={idx} style={{ 
                    background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', 
                    padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid rgba(245, 158, 11, 0.3)',
                    fontFamily: 'monospace'
                  }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.75rem' }}>
            <Link 
              href="/practice-labs" 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'none',
                background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1.5rem', borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem'
              }}
            >
              <ArrowLeft size={18} /> Back to Labs
            </Link>

            <button 
              onClick={handleStartLab}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: 'linear-gradient(135deg, #1E65FF 0%, #0052cc 100%)',
                color: 'white', border: 'none',
                padding: '1rem 2.5rem', borderRadius: '6px', fontSize: '1.1rem', fontWeight: 'bold',
                cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '0.05em',
                boxShadow: '0 0 25px rgba(30, 101, 255, 0.5)'
              }}
            >
              LAUNCH KALI WORKSPACE ({isAdvancedLab ? '2 HR' : '1 HR'}) <ChevronRight size={20} />
            </button>
          </div>
        </div>
        </div>
      )}
      
    </div>
  );
}

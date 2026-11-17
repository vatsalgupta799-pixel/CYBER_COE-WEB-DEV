'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Bot, Send, Sparkles, AlertCircle, CheckCircle2, Play, Terminal, HelpCircle,
  Minimize2, Maximize2, X, RefreshCw, Lightbulb, Shield, ShieldCheck, ChevronRight,
  Eye, Zap, Cpu, GraduationCap, Crosshair, ShieldAlert, Trash2, Copy, Check
} from 'lucide-react';

const MENTOR_MODES = [
  { id: 'tutor', name: 'Tutor', icon: GraduationCap, color: '#38bdf8', desc: 'Beginner-friendly guidance, concept breakdowns & readiness quizzes' },
  { id: 'red_team', name: 'Red Team', icon: Crosshair, color: '#f87171', desc: 'Exploit analysis, payload crafting & bypass tactics' },
  { id: 'blue_team', name: 'Blue Team', icon: ShieldCheck, color: '#34d399', desc: 'Detection engineering, SIEM logging & defensive hardening' },
  { id: 'solver', name: 'Rapid Hints', icon: Zap, color: '#fbbf24', desc: 'Instant command diagnostics, syntax fixes & 1-click execution' }
];

export default function LabAIMentor({
  labId,
  labData,
  isLabStarted,
  targetIp = '10.100.1.10',
  isSolved = false,
  isOpen = false,
  onClose = null
}) {
  const [activeMode, setActiveMode] = useState('tutor');
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `👋 **Greetings! I am your CyberCoE Advanced AI Lab Mentor.**\n\nI am equipped with specialized guidance for **${labData?.title || 'this challenge'}**.\n\nChoose a persona mode above (🎓 **Tutor**, ⚔️ **Red Team**, 🛡️ **Blue Team**, or ⚡ **Rapid Hints**) and ask me anything, test your readiness with a quiz, or click any prompt below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedCommand: null
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [progressInfo, setProgressInfo] = useState(null);
  const [liveAlert, setLiveAlert] = useState(null);
  const [telemetry, setTelemetry] = useState({
    recentCommands: [],
    lastOutput: '',
    currentPath: `/root/labs/${labId || 'workspace'}`,
    hasError: false
  });

  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Real-Time Telemetry Listener from Live Kali Terminal
  useEffect(() => {
    const handleTerminalActivity = (event) => {
      if (!event.detail) return;
      const { command, output, cwd } = event.detail;

      const isError =
        (output && (output.toLowerCase().includes('command not found') || output.toLowerCase().includes('error') || output.toLowerCase().includes('failed'))) || false;

      const hasFlag = output && output.includes('FLAG{');

      setTelemetry((prev) => ({
        recentCommands: [...prev.recentCommands.slice(-8), command],
        lastOutput: output ? output.slice(-400) : '',
        currentPath: cwd || prev.currentPath,
        hasError: isError
      }));

      // Proactive live monitoring notification
      if (hasFlag) {
        setLiveAlert({ type: 'flag', text: '🎉 Secret flag discovered in your terminal output!' });
      } else if (isError) {
        setLiveAlert({ type: 'error', text: `⚠️ Error detected on command: '${command}'. Click to diagnose.` });
      } else {
        setLiveAlert(null);
      }
    };

    window.addEventListener('cybercoe:terminal_activity', handleTerminalActivity);
    return () => window.removeEventListener('cybercoe:terminal_activity', handleTerminalActivity);
  }, []);

  const sendMessage = async (customPrompt = null) => {
    const promptToSend = (customPrompt || inputMessage).trim();
    if (!promptToSend || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newMsg = {
      id: userMessageId,
      sender: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setIsLoading(true);
    setLiveAlert(null);

    try {
      const res = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptToSend,
          mode: activeMode,
          context: {
            labId: labId || 'sql-injection',
            labTitle: labData?.title || 'Practice Lab',
            concept: labData?.concept || '',
            recentCommands: telemetry.recentCommands,
            lastOutput: telemetry.lastOutput,
            currentPath: telemetry.currentPath,
            isSolved: isSolved,
            isLabStarted: isLabStarted
          }
        })
      });

      const data = await res.json();

      if (data.success) {
        if (data.progress) {
          setProgressInfo(data.progress);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: data.response,
            suggestedCommand: data.suggestedCommand,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: "I noticed a brief network timeout. Please check your command in the attack guide or ask me again!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: "I couldn't reach the AI mentor service right now. Please follow the Guided Attack Steps on the right!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const autoRunInTerminal = (command) => {
    if (!command) return;
    window.dispatchEvent(new CustomEvent('cybercoe:run_command', { detail: command }));
  };

  const copyMessageText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        sender: 'ai',
        text: `Conversation cleared. I am ready to guide you in **${activeMode.toUpperCase()}** mode!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedCommand: null
      }
    ]);
  };

  // Helper to format markdown-like text
  const formatText = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, lIdx) => {
      const parts = line.split(/(\*\*.*?\*\*|\`.*?\`)/g);

      return (
        <p key={lIdx} style={{ margin: '0 0 0.4rem 0', lineHeight: '1.5' }}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} style={{ color: '#93c5fd', fontWeight: '700' }}>
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code
                  key={pIdx}
                  style={{
                    background: 'rgba(30, 101, 255, 0.25)',
                    color: '#34d399',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.84em'
                  }}
                >
                  {part.slice(1, -1)}
                </code>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  // Mode-specific quick action chips
  const getQuickChips = () => {
    const baseChips = [
      { label: '👁️ Review My Live Progress', prompt: 'Review my live terminal progress and tell me what to do next' }
    ];

    if (activeMode === 'tutor') {
      return [
        ...baseChips,
        { label: '🎯 Quiz My Readiness', prompt: 'Quiz my readiness on this lab with 2 questions' },
        { label: '🎒 Everyday Analogy', prompt: 'Explain this lab concept using a simple everyday life analogy' },
        { label: '❓ What are the goals?', prompt: 'What are the main learning goals of this challenge?' }
      ];
    }
    if (activeMode === 'red_team') {
      return [
        ...baseChips,
        { label: '⚔️ Exploit Breakdown', prompt: 'Explain the Red Team exploit payload and attack mechanics' },
        { label: '🛡️ Bypass Techniques', prompt: 'What filters might an attacker encounter and how are they bypassed?' },
        { label: '🎯 Target Recon', prompt: 'How do I identify that the target is vulnerable?' }
      ];
    }
    if (activeMode === 'blue_team') {
      return [
        ...baseChips,
        { label: '🛡️ Blue Team Defense', prompt: 'How do enterprise security teams defend against this attack?' },
        { label: '📊 SIEM & Logs', prompt: 'What specific log signatures should a SOC analyst look for?' },
        { label: '🔧 Code Remediation', prompt: 'How should developers write code to prevent this flaw?' }
      ];
    }
    // Solver / Rapid Hints
    return [
      ...baseChips,
      { label: '🔍 Diagnose Error', prompt: 'Diagnose my last terminal command and output' },
      { label: '💡 Smart Next Step', prompt: 'Give me a smart hint on what to run next' },
      { label: '📖 Explain Syntax', prompt: 'Explain the syntax and meaning of my last command' }
    ];
  };

  const activeModeObj = MENTOR_MODES.find(m => m.id === activeMode) || MENTOR_MODES[0];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'rgba(7, 11, 20, 0.98)',
        borderRadius: '10px',
        border: '1px solid rgba(30, 101, 255, 0.4)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden'
      }}
    >
      {/* 1. Header Bar with Mode Selector */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(30, 101, 255, 0.25) 0%, rgba(10, 15, 25, 0.95) 100%)',
          borderBottom: '1px solid rgba(30, 101, 255, 0.3)',
          padding: '0.65rem 0.9rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #1E65FF 0%, #0052cc 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(30, 101, 255, 0.6)'
              }}
            >
              <Bot size={18} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>CyberCoE AI Lab Mentor</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.68rem',
                    background: isLabStarted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                    border: `1px solid ${isLabStarted ? '#10b981' : '#38bdf8'}`,
                    color: isLabStarted ? '#10b981' : '#38bdf8',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: isLabStarted ? '#10b981' : '#38bdf8',
                      boxShadow: `0 0 6px ${isLabStarted ? '#10b981' : '#38bdf8'}`
                    }}
                  />
                  {isLabStarted ? 'LIVE TELEMETRY' : 'PRE-LAB COACH'}
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                {activeModeObj.desc}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <button
              onClick={clearChat}
              title="Clear Conversation"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px 6px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Trash2 size={14} />
            </button>

            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px'
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0, 0, 0, 0.4)', padding: '3px', borderRadius: '6px' }}>
          {MENTOR_MODES.map((mode) => {
            const Icon = mode.icon;
            const isSelected = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: isSelected ? 'rgba(30, 101, 255, 0.35)' : 'transparent',
                  border: isSelected ? `1px solid ${mode.color}` : '1px solid transparent',
                  color: isSelected ? '#fff' : '#94a3b8',
                  padding: '4px 6px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: isSelected ? 'bold' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={13} color={isSelected ? mode.color : '#94a3b8'} />
                <span>{mode.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Live Telemetry & Progress Observer Bar */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.65)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.45rem 0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          fontSize: '0.72rem',
          fontFamily: 'monospace'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <Terminal size={12} color="#60a5fa" />
            <span>KALI TERMINAL:</span>
            <span style={{ color: '#38bdf8' }}>{targetIp}</span>
          </div>

          {progressInfo && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>
                STEP {progressInfo.currentStepIndex + 1}/{progressInfo.totalSteps}
              </span>
            </div>
          )}
        </div>

        {telemetry.recentCommands.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}>
              <span style={{ color: '#64748b' }}>LAST:</span>
              <span style={{ color: '#34d399', fontWeight: 'bold' }}>
                $ {telemetry.recentCommands[telemetry.recentCommands.length - 1]}
              </span>
            </div>

            <button
              onClick={() => sendMessage('Review my live terminal progress and tell me what to do next')}
              style={{
                background: 'rgba(30, 101, 255, 0.25)',
                border: '1px solid #1E65FF',
                color: '#93c5fd',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '0.68rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                flexShrink: 0
              }}
            >
              <Eye size={11} /> Live Check
            </button>
          </div>
        )}

        {/* Real-time proactive alert pill */}
        {liveAlert && (
          <div
            onClick={() => sendMessage(liveAlert.type === 'error' ? 'Diagnose my last terminal command and error' : 'What is the flag and how do I submit it?')}
            style={{
              marginTop: '2px',
              padding: '3px 8px',
              background: liveAlert.type === 'flag' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
              border: `1px solid ${liveAlert.type === 'flag' ? '#10b981' : '#ef4444'}`,
              borderRadius: '4px',
              color: liveAlert.type === 'flag' ? '#34d399' : '#fca5a5',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.72rem',
              animation: 'pulseGlow 2s infinite'
            }}
          >
            <span>{liveAlert.text}</span>
            <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Ask AI ➔</span>
          </div>
        )}
      </div>

      {/* 3. Messages Chat Feed */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.9rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          background: 'radial-gradient(circle at 50% 0%, rgba(30, 101, 255, 0.05) 0%, transparent 80%)'
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div
              style={{
                maxWidth: '92%',
                background: msg.sender === 'user' ? '#1E65FF' : 'rgba(15, 23, 42, 0.95)',
                color: '#fff',
                padding: '0.75rem 0.9rem',
                borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                border: msg.sender === 'user' ? 'none' : '1px solid rgba(30, 101, 255, 0.3)',
                boxShadow: msg.sender === 'user' ? '0 2px 10px rgba(30, 101, 255, 0.4)' : '0 2px 10px rgba(0, 0, 0, 0.4)',
                fontSize: '0.84rem',
                position: 'relative'
              }}
            >
              {msg.sender === 'ai' ? formatText(msg.text) : <p style={{ margin: 0, lineHeight: '1.45' }}>{msg.text}</p>}

              {/* 1-Click Run Button for AI-Suggested Commands */}
              {msg.suggestedCommand && (
                <div
                  style={{
                    marginTop: '0.65rem',
                    padding: '0.5rem 0.65rem',
                    background: 'rgba(0,0,0,0.7)',
                    borderRadius: '6px',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                  }}
                >
                  <code style={{ color: '#34d399', fontSize: '0.78rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    $ {msg.suggestedCommand}
                  </code>
                  {isLabStarted && (
                    <button
                      onClick={() => autoRunInTerminal(msg.suggestedCommand)}
                      style={{
                        background: '#10b981',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '4px',
                        padding: '3px 8px',
                        fontSize: '0.72rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        flexShrink: 0
                      }}
                    >
                      <Play size={11} fill="#fff" /> Run
                    </button>
                  )}
                </div>
              )}

              {/* Footer with Timestamp and Copy */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: msg.sender === 'ai' ? 'space-between' : 'flex-end',
                  marginTop: '0.4rem',
                  fontSize: '0.65rem',
                  color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : '#64748b'
                }}
              >
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => copyMessageText(msg.text, msg.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: copiedId === msg.id ? '#10b981' : '#64748b',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      padding: 0,
                      fontSize: '0.68rem'
                    }}
                  >
                    {copiedId === msg.id ? <Check size={11} /> : <Copy size={11} />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
                <span>{msg.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontSize: '0.8rem', padding: '0.5rem' }}>
            <RefreshCw size={14} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
            <span>AI Mentor analyzing {activeMode.replace('_', ' ')} context...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 4. Quick Action Chips (Mode-Specific) */}
      <div
        style={{
          padding: '0.45rem 0.85rem',
          background: 'rgba(10, 15, 25, 0.9)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {getQuickChips().map((chip, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(chip.prompt)}
            style={{
              background: 'rgba(30, 101, 255, 0.15)',
              border: '1px solid rgba(30, 101, 255, 0.3)',
              color: '#60a5fa',
              borderRadius: '15px',
              padding: '3px 8px',
              fontSize: '0.72rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              flexShrink: 0,
              transition: 'background 0.2s'
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* 5. Chat Input */}
      <div
        style={{
          padding: '0.65rem 0.85rem',
          background: '#05080f',
          borderTop: '1px solid rgba(30, 101, 255, 0.3)',
          display: 'flex',
          gap: '0.5rem'
        }}
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={`Ask AI Mentor in ${activeModeObj.name} mode...`}
          disabled={isLoading}
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '6px',
            padding: '0.55rem 0.75rem',
            color: '#fff',
            fontSize: '0.82rem',
            outline: 'none'
          }}
        />

        <button
          onClick={() => sendMessage()}
          disabled={isLoading || !inputMessage.trim()}
          style={{
            background: '#1E65FF',
            border: 'none',
            color: '#fff',
            borderRadius: '6px',
            padding: '0.55rem 0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isLoading || !inputMessage.trim() ? 0.5 : 1
          }}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}


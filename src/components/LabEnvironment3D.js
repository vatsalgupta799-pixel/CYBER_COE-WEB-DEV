'use client';

import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Text, Box, Float, ContactShadows, Environment, Stars, Image as DreiImage } from '@react-three/drei';
import { FrontSide } from 'three';
import { labDetails } from '../data/labDetails';

function TerminalScreen({ labId, isStarted, onHover }) {
  const meshRef = useRef();
  const scrollRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const [executed, setExecuted] = useState(false);

  // Fallback data if labId is not found
  const defaultData = {
    title: 'Unknown Lab',
    logs: ['[SYSTEM] Error: Lab environment not found.', 'Please return to the main menu.'],
    expectedCommand: 'reboot',
    actionResult: 'Rebooting system...'
  };
  
  const labData = labDetails[labId] || defaultData;
  
  const [history, setHistory] = useState([
    ...labData.logs.map(log => ({ type: 'system', content: log }))
  ]);

  useFrame((state) => {
    // Gentle floating effect for the screen itself
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 + 0.2;
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.trim();
      let newHistory = [...history, { type: 'command', content: cmd }];
      
      if (cmd === 'clear') {
        newHistory = [];
      } else if (cmd === 'ls') {
        newHistory.push({ type: 'output', content: 'flag.txt  secret_data.bin  tools' });
      } else if (cmd === 'whoami') {
        newHistory.push({ type: 'output', content: 'root' });
      } else if (cmd === 'pwd') {
        newHistory.push({ type: 'output', content: `/root/labs/${labId}` });
      } else if (cmd === 'help') {
        newHistory.push({ type: 'output', content: 'Available commands: clear, ls, whoami, pwd, help' });
      } else if (cmd === labData.expectedCommand && !executed) {
        setExecuted(true);
        newHistory.push({ type: 'success', content: labData.actionResult });
      } else if (cmd !== '') {
        newHistory.push({ type: 'error', content: `bash: ${cmd}: command not found` });
      }
      
      setHistory(newHistory);
      setInputValue('');
      
      // Auto-scroll to bottom
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 50);
    }
  };

  const renderKaliPrompt = () => (
    <div style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.2', marginTop: '8px', marginBottom: '4px' }}>
      <div style={{ display: 'flex', color: '#3B82F6' }}>
        <span>┌──(</span>
        <span style={{ color: '#EF4444', fontWeight: 'bold' }}>root㉿kali</span>
        <span>)-[</span>
        <span style={{ color: '#ffffff' }}>~/labs/{labId}</span>
        <span>]</span>
      </div>
      <div style={{ display: 'flex', color: '#3B82F6' }}>
        <span>└─#</span>
      </div>
    </div>
  );

  return (
    <group ref={meshRef}>
      {/* Monitor Bezel */}
      <Box args={[4.2, 2.7, 0.3]} position={[0, 0, -0.15]}>
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.8} />
      </Box>

      {/* Monitor Screen Background (Front) */}
      <Box args={[4, 2.5, 0.05]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#000000" />
      </Box>
      
      {/* Back of the monitor Content */}
      <group position={[0, 0, -0.31]} rotation={[0, Math.PI, 0]}>
        <Suspense fallback={null}>
          <DreiImage url="/hacker-logo.jpg" position={[0, 0.2, 0]} scale={[2, 2]} />
          <Text 
            position={[0, -1, 0]} 
            fontSize={0.12} 
            color="#10B981" 
            maxWidth={3.5}
            textAlign="center"
          >
            &quot;Looking for hints on the back of the monitor? How cute. A real hacker doesn&apos;t need help. Go back and try harder, script kiddie.&quot;
          </Text>
        </Suspense>
      </group>

      {/* Interactive HTML Terminal Overlay on the 3D Screen */}
      <Html 
        transform 
        position={[0, 0, 0.03]} 
      >
        <div style={{
          width: '380px',
          height: '240px',
          background: 'rgba(0, 0, 0, 0.85)',
          border: '1px solid #333',
          borderRadius: '4px',
          padding: '12px',
          color: '#e0e0e0',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.8) inset',
          opacity: isStarted ? 1 : 0,
          pointerEvents: isStarted ? 'auto' : 'none',
          transition: 'opacity 0.2s ease',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}>
          <div 
            onPointerEnter={() => onHover && onHover(true)}
            onPointerLeave={() => onHover && onHover(false)}
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
          
          <div ref={scrollRef} style={{ flex: 1, fontSize: '12px', lineHeight: '1.4', overflowY: 'auto', paddingRight: '4px' }}>
            {history.map((item, i) => {
              if (item.type === 'system') {
                return (
                  <p key={i} style={{ 
                    color: item.content.includes('[ERROR]') || item.content.includes('CRITICAL') ? '#EF4444' : 
                           item.content.includes('[WARN]') || item.content.includes('[TASK]') ? '#F59E0B' : '#10B981',
                    marginBottom: '4px'
                  }}>
                    {item.content}
                  </p>
                );
              } else if (item.type === 'command') {
                return (
                  <div key={i}>
                    {renderKaliPrompt()}
                    <span style={{ marginLeft: '24px', color: '#e0e0e0' }}>{item.content}</span>
                  </div>
                );
              } else if (item.type === 'output') {
                return <p key={i} style={{ color: '#e0e0e0', marginTop: '4px', marginBottom: '4px', whiteSpace: 'pre-wrap' }}>{item.content}</p>;
              } else if (item.type === 'error') {
                return <p key={i} style={{ color: '#EF4444', marginTop: '4px', marginBottom: '4px' }}>{item.content}</p>;
              } else if (item.type === 'success') {
                return <p key={i} style={{ color: '#10B981', fontWeight: 'bold', marginTop: '4px', marginBottom: '4px' }}>{'>'} {item.content}</p>;
              }
              return null;
            })}
            
            {/* Current Input Line */}
            {renderKaliPrompt()}
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '24px', marginTop: '-14px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#e0e0e0',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  width: '100%',
                  outline: 'none',
                }}
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
      </Html>

      {/* Floating 3D Text below screen */}
      <Text 
        position={[0, -2, 0.5]} 
        fontSize={0.3} 
        color="#1E65FF"
        anchorX="center"
        anchorY="middle"
        material-side={FrontSide}
      >
        LAB: {labId.toUpperCase()}
      </Text>
    </group>
  );
}

function CyberEnvironment() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#1E65FF" />
      <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#EF4444" />
      
      {/* Cool stars/particles in background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
      
      {/* Floor reflection */}
      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={10} color="#1E65FF" />
      
      {/* Grid Floor */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
      </mesh>
    </>
  );
}

export default function LabEnvironment3D({ labId, isStarted }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      {/* CSS cursor blink for the HTML overlay */}
      <style>{`
        .blinking-cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <color attach="background" args={['#03050a']} />
        
        <CyberEnvironment />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <TerminalScreen labId={labId} isStarted={isStarted} onHover={setIsHovering} />
        </Float>
        
        <OrbitControls 
          enabled={!isHovering}
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}

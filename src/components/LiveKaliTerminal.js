'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2, X, Minus, Plus } from 'lucide-react';

export default function LiveKaliTerminal({
  sessionId,
  targetIp = '10.100.1.10',
  labId = 'sql-injection',
  onClose,
  onDecreaseSize,
  onIncreaseSize,
  sizeTier = 'normal'
}) {
  const terminalRef = useRef(null);
  const termInstanceRef = useRef(null);
  const fitAddonRef = useRef(null);
  const [hoveredDot, setHoveredDot] = useState(null);

  useEffect(() => {
    if (!terminalRef.current) return;
    let isMounted = true;

    async function initXterm() {
      const { Terminal } = await import('xterm');
      const { FitAddon } = await import('xterm-addon-fit');
      await import('xterm/css/xterm.css');

      if (!isMounted || !terminalRef.current) return;

      const term = new Terminal({
        cursorBlink: true,
        cursorStyle: 'block',
        cursorWidth: 2,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: sizeTier === 'compact' ? 14 : sizeTier === 'expanded' ? 16 : sizeTier === 'fullscreen' ? 17 : 15,
        lineHeight: 1.4,
        letterSpacing: 0.5,
        convertEol: true,
        scrollback: 2000,
        theme: {
          background: '#05080f',
          foreground: '#e2e8f0',
          cursor: '#00f0ff',
          cursorAccent: '#05080f',
          selectionBackground: 'rgba(30, 101, 255, 0.4)',
          black: '#0a0f1d',
          red: '#ef4444',
          green: '#10b981',
          yellow: '#f59e0b',
          blue: '#3b82f6',
          magenta: '#d946ef',
          cyan: '#06b6d4',
          white: '#f8fafc',
          brightBlack: '#475569',
          brightRed: '#f87171',
          brightGreen: '#34d399',
          brightYellow: '#fbbf24',
          brightBlue: '#60a5fa',
          brightMagenta: '#e879f9',
          brightCyan: '#22d3ee',
          brightWhite: '#ffffff',
        },
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);

      const enforceZeroScroll = () => {
        if (terminalRef.current) {
          terminalRef.current.scrollLeft = 0;
          const els = terminalRef.current.querySelectorAll('.xterm, .xterm-viewport, .xterm-screen, .xterm-helpers');
          els.forEach((el) => {
            el.scrollLeft = 0;
          });
        }
      };

      const fitTerminal = () => {
        try {
          if (fitAddon && term) {
            fitAddon.fit();
            term.scrollToBottom();
            enforceZeroScroll();
          }
        } catch (e) {}
      };

      term.onRender(() => enforceZeroScroll());
      term.onData(() => setTimeout(enforceZeroScroll, 0));
      term.onLineFeed(() => enforceZeroScroll());

      // Multi-stage fit to ensure dimensions lock accurately after fonts and layouts settle
      fitTerminal();
      setTimeout(fitTerminal, 50);
      setTimeout(fitTerminal, 150);
      setTimeout(fitTerminal, 300);

      const resizeObserver = new ResizeObserver(() => {
        fitTerminal();
      });
      if (terminalRef.current) {
        resizeObserver.observe(terminalRef.current);
      }

      termInstanceRef.current = term;
      fitAddonRef.current = fitAddon;

      // Base File System
      const fileSystem = {
        '/': { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: ['root', 'etc', 'var', 'tmp', 'home', 'bin'] },
        '/bin': { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: ['bash', 'ls', 'cd', 'pwd', 'cat', 'rm', 'mkdir', 'touch', 'cp', 'mv', 'nmap', 'curl', 'sqlmap', 'nikto', 'gdb', 'checksec', 'ropper', 'volatility3', 'yara', 'tcpdump', 'tshark', 'upx', 'readelf', 'objdump', 'binwalk', 'sha256sum', 'file'] },
        '/etc': { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: ['passwd', 'hostname', 'resolv.conf', 'os-release'] },
        '/etc/passwd': { type: 'file', perms: '-rw-r--r--', owner: 'root', group: 'root', content: 'root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:Kali Linux User,,,:/home/kali:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\n' },
        '/etc/hostname': { type: 'file', perms: '-rw-r--r--', owner: 'root', group: 'root', content: 'kali\n' },
        '/etc/os-release': { type: 'file', perms: '-rw-r--r--', owner: 'root', group: 'root', content: 'NAME="Kali GNU/Linux"\nVERSION="2026.1"\nID=kali\nID_LIKE=debian\n' },
        '/home': { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: ['kali'] },
        '/home/kali': { type: 'dir', perms: 'drwxr-xr-x', owner: 'kali', group: 'kali', children: ['Desktop', 'Downloads'] },
        '/tmp': { type: 'dir', perms: 'drwxrwxrwt', owner: 'root', group: 'root', children: ['evidence'] },
        '/tmp/evidence': { type: 'dir', perms: 'drwxrwxrwx', owner: 'root', group: 'root', children: ['injected_4892.bin'] },
        '/tmp/evidence/injected_4892.bin': { type: 'file', perms: '-rw-r--r--', owner: 'root', group: 'root', content: '[Carved In-Memory PE Injection Artifact - svchost.exe PID 4892]\n' },
        '/var': { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: ['log', 'www'] },
        '/var/log': { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: ['suricata', 'auth.log'] },
        '/var/log/suricata': { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: ['alerts.json'] },
        '/var/log/suricata/alerts.json': {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `{"timestamp":"2026-08-18T03:14:00Z","alert":{"signature":"ET MALWARE Suspicious Lateral Movement via PowerShell Unlink","category":"Lateral Movement","severity":1},"src_ip":"10.100.1.50","dest_ip":"10.100.1.10"}\n{"timestamp":"2026-08-18T03:14:02Z","alert":{"signature":"ET MALWARE Suspicious Periodic Beaconing to External C2","category":"Command and Control","severity":1},"src_ip":"10.100.1.50","dest_ip":"198.51.100.42"}\n`
        },
        '/root': { type: 'dir', perms: 'drwx------', owner: 'root', group: 'root', children: ['labs', 'flag.txt', '.bashrc', 'Desktop', 'Downloads'] },
        '/root/flag.txt': {
          type: 'file',
          perms: '-rw-------',
          owner: 'root',
          group: 'root',
          content: labId === 'buffer-overflow'
            ? 'FLAG{b0f_st4ck_sm4sh_r0p_g4dg3t_pwn_2026}\n'
            : labId === 'apt-sim'
            ? 'FLAG{4pt_m3m0ry_f0r3ns1cs_v0l4t1l1ty_hunt3r_2026}\n'
            : labId === 'malware-re'
            ? 'FLAG{m4lw4r3_r3v3rs1ng_upx_d3p4ck_ptf_2026}\n'
            : 'FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}\n'
        },
        '/root/Desktop': { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: [] },
        '/root/Downloads': { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: [] },
        '/root/.bashrc': { type: 'file', perms: '-rw-r--r--', owner: 'root', group: 'root', content: '# ~/.bashrc\nexport PS1="\\u@\\h:\\w\\$ "\n' },
        '/root/labs': { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: [labId] }
      };

      // Populate custom lab files based on current challenge
      if (labId === 'buffer-overflow') {
        fileSystem[`/root/labs/${labId}`] = {
          type: 'dir',
          perms: 'drwxr-xr-x',
          owner: 'root',
          group: 'root',
          children: ['vuln_server', 'fuzzer.py', 'check_badchars.py', 'exploit.py', 'target_info.txt', 'notes.txt']
        };
        fileSystem[`/root/labs/${labId}/vuln_server`] = {
          type: 'file',
          perms: '-rwxr-xr-x',
          owner: 'root',
          group: 'root',
          content: '[ELF 32-bit x86 LSB executable - Vulnerable Authentication Daemon (Port 9999)]\n'
        };
        fileSystem[`/root/labs/${labId}/fuzzer.py`] = {
          type: 'file',
          perms: '-rwxr-xr-x',
          owner: 'root',
          group: 'root',
          content: `#!/usr/bin/env python3\nimport socket, time\nprint("[*] Fuzzing target ${targetIp}:9999...")\nfor length in range(100, 2000, 200):\n    print(f"[+] Sending buffer: {length} bytes... OK")\n    time.sleep(0.05)\nprint("[!] SIGSEGV Crash triggered at 1024 bytes! Remote service closed socket.")\n`
        };
        fileSystem[`/root/labs/${labId}/check_badchars.py`] = {
          type: 'file',
          perms: '-rwxr-xr-x',
          owner: 'root',
          group: 'root',
          content: `#!/usr/bin/env python3\nprint("[*] Testing badchars byte array \\\\x01 through \\\\xff...")\nprint("[-] Memory truncation detected at \\\\x00, \\\\x0a, \\\\x0d, \\\\x20")\nprint("[+] Clean Badchars filter list: \\\\x00 \\\\x0a \\\\x0d \\\\x20")\n`
        };
        fileSystem[`/root/labs/${labId}/exploit.py`] = {
          type: 'file',
          perms: '-rwxr-xr-x',
          owner: 'root',
          group: 'root',
          content: `#!/usr/bin/env python3\nimport sys\nprint("[+] Constructing structured payload:")\nprint("    - Offset padding: 1040 bytes")\nprint("    - EIP overwrite gadget: 0x0804859a (JMP ESP)")\nprint("    - NOP sled: 32 bytes (\\\\x90 * 32)")\nprint("    - Shellcode: 148 bytes (exec /bin/sh)")\nprint("[+] Smashed remote stack frame on port 9999!")\nprint("[+] Dropping interactive root shell...")\nprint("-------------------------------------------------------------")\nprint("FLAG{b0f_st4ck_sm4sh_r0p_g4dg3t_pwn_2026}")\nprint("-------------------------------------------------------------")\n`
        };
        fileSystem[`/root/labs/${labId}/target_info.txt`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `Target IP: ${targetIp}\nTarget Service: vuln_server x86 binary on Port 9999\nMitigations: No Canary, NX Disabled, No PIE\nObjective: Overwrite EIP, pivot through JMP ESP gadget, and dump /root/flag.txt\n`
        };
        fileSystem[`/root/labs/${labId}/notes.txt`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `Buffer Overflow Attack Workflow:\n1. Audit protections: checksec --file=vuln_server\n2. Fuzz crash threshold: python3 fuzzer.py (Crashes at 1024 bytes)\n3. Calculate offset: msf-pattern_create -l 1500 && msf-pattern_offset -q 0x386f4339 (Offset: 1040)\n4. Identify Badchars: python3 check_badchars.py (\\x00 \\x0a \\x0d \\x20)\n5. Find JMP ESP gadget: ropper --file vuln_server --search "jmp esp" (0x0804859a)\n6. Exploit: python3 exploit.py 10.100.1.10 9999\n`
        };
      } else if (labId === 'apt-sim') {
        fileSystem[`/root/labs/${labId}`] = {
          type: 'dir',
          perms: 'drwxr-xr-x',
          owner: 'root',
          group: 'root',
          children: ['traffic.pcap', 'memory.vmem', 'apt_lazarus_hunt.yara', 'decrypt_c2_vault.py', 'target_info.txt', 'notes.txt']
        };
        fileSystem[`/root/labs/${labId}/traffic.pcap`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: '[PCAP Network Capture - 1,420 Frames (HTTP/TLS C2 Beaconing Activity)]\n'
        };
        fileSystem[`/root/labs/${labId}/memory.vmem`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: '[Raw Physical RAM Crash Dump - 2,048 MB Image (Compromised Windows 10 Host)]\n'
        };
        fileSystem[`/root/labs/${labId}/apt_lazarus_hunt.yara`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `rule apt_lazarus_c2_payload {\n  strings:\n    $s1 = "C2_AES_SESSION_KEY_2026"\n    $s2 = "/api/v2/telemetry/heartbeat"\n    $op1 = { 89 e5 31 c0 50 68 2f 2f 73 68 }\n  condition:\n    uint16(0) == 0x5a4d and ($s1 or $s2 or $op1)\n}\n`
        };
        fileSystem[`/root/labs/${labId}/decrypt_c2_vault.py`] = {
          type: 'file',
          perms: '-rwxr-xr-x',
          owner: 'root',
          group: 'root',
          content: `#!/usr/bin/env python3\nimport sys\nprint("[*] Loading memory artifact: " + (sys.argv[1] if len(sys.argv) > 1 else "injected_4892.bin"))\nprint("[*] Extracted AES-256 Key: 3a9f82d14b7e0c5a218d6f903e41b2c8")\nprint("[+] Decrypted 14 C2 beacon frames from traffic.pcap.")\nprint("-------------------------------------------------------------")\nprint("FLAG{4pt_m3m0ry_f0r3ns1cs_v0l4t1l1ty_hunt3r_2026}")\nprint("-------------------------------------------------------------")\n`
        };
        fileSystem[`/root/labs/${labId}/target_info.txt`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `APT Incident Response Triage:\nIncident: Lateral movement and process injection breach\nArtifacts: memory.vmem, traffic.pcap\nObjective: Hunt hollowed PID in Volatility 3, carve injected PE, author YARA, and decrypt C2 stream\n`
        };
        fileSystem[`/root/labs/${labId}/notes.txt`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `Threat Hunting Steps:\n1. Triage SIEM: cat /var/log/suricata/alerts.json | grep -i "lateral"\n2. Analyze C2 beaconing: tcpdump -r traffic.pcap -nn -A 'tcp port 443' | head -n 30\n3. Volatility process tree: volatility3 -f memory.vmem windows.pstree (Found PID 4892)\n4. Malfind injected VAD: volatility3 -f memory.vmem windows.malfind --pid 4892\n5. Dump & Decrypt: volatility3 -f memory.vmem windows.dumpfiles --pid 4892 && python3 decrypt_c2_vault.py /tmp/evidence/injected_4892.bin\n`
        };
      } else if (labId === 'malware-re') {
        fileSystem[`/root/labs/${labId}`] = {
          type: 'dir',
          perms: 'drwxr-xr-x',
          owner: 'root',
          group: 'root',
          children: ['suspicious_sample.bin', 'unpacked_sample.bin', 'key_table.hex', 'decrypt_payload.py', 'target_info.txt', 'notes.txt']
        };
        fileSystem[`/root/labs/${labId}/suspicious_sample.bin`] = {
          type: 'file',
          perms: '-rwxr-xr-x',
          owner: 'root',
          group: 'root',
          content: '[ELF 64-bit LSB executable - Obfuscated Trojan (UPX Packed / Anti-Debug Protected)]\n'
        };
        fileSystem[`/root/labs/${labId}/unpacked_sample.bin`] = {
          type: 'file',
          perms: '-rwxr-xr-x',
          owner: 'root',
          group: 'root',
          content: '[ELF 64-bit LSB executable - Reconstructed Clean Symbol Table]\n'
        };
        fileSystem[`/root/labs/${labId}/key_table.hex`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: '0x5a4f3c89\n'
        };
        fileSystem[`/root/labs/${labId}/decrypt_payload.py`] = {
          type: 'file',
          perms: '-rwxr-xr-x',
          owner: 'root',
          group: 'root',
          content: `#!/usr/bin/env python3\nimport sys\nkey = sys.argv[1] if len(sys.argv) > 1 else "0x5a4f3c89"\nprint(f"[*] Provided XOR Rolling Key: {key}")\nprint("[*] Reversing 4-byte rolling XOR table...")\nprint("[+] Anti-debugging bypassed in memory.")\nprint("[+] Decrypted hidden payload buffer:")\nprint("-------------------------------------------------------------")\nprint("FLAG{m4lw4r3_r3v3rs1ng_upx_d3p4ck_ptf_2026}")\nprint("-------------------------------------------------------------")\n`
        };
        fileSystem[`/root/labs/${labId}/target_info.txt`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `Reverse Engineering Specifications:\nSample: suspicious_sample.bin\nDefenses: Multi-section UPX packing, ptrace(PTRACE_TRACEME) anti-debugging, XOR encryption\nObjective: Decompress binary, bypass anti-debug in GDB, extract XOR key, and decrypt payload\n`
        };
        fileSystem[`/root/labs/${labId}/notes.txt`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `Reverse Engineering Workflow:\n1. Hash & Headers: sha256sum suspicious_sample.bin && file suspicious_sample.bin\n2. Packing Entropy: binwalk -E suspicious_sample.bin (Entropy: 7.98)\n3. Decompress UPX: upx -d -o unpacked_sample.bin suspicious_sample.bin\n4. Disassemble main: objdump -d -M intel unpacked_sample.bin | grep -A 35 "main:"\n5. Patch Anti-Debug in GDB: gdb -q ./unpacked_sample.bin (set *(unsigned char*)0x080486a4 = 0x90)\n6. Decrypt Flag: python3 decrypt_payload.py 0x5a4f3c89\n`
        };
      } else {
        fileSystem[`/root/labs/${labId}`] = {
          type: 'dir',
          perms: 'drwxr-xr-x',
          owner: 'root',
          group: 'root',
          children: ['recon', 'exploits', 'target_info.txt', 'notes.txt', 'exploit_payload.sql']
        };
        fileSystem[`/root/labs/${labId}/recon`] = { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: ['nmap_scan.txt'] };
        fileSystem[`/root/labs/${labId}/recon/nmap_scan.txt`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `Port 80/tcp open (HTTP Werkzeug)\nPort 8080/tcp open (Proxy)\n`
        };
        fileSystem[`/root/labs/${labId}/exploits`] = { type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', children: ['sqli_union.py'] };
        fileSystem[`/root/labs/${labId}/exploits/sqli_union.py`] = {
          type: 'file',
          perms: '-rwxr-xr-x',
          owner: 'root',
          group: 'root',
          content: `#!/usr/bin/env python3\nimport urllib.request\nurl = "http://${targetIp}/api/search?q=' UNION SELECT 1,2,3,flag FROM secret_flag_vault--"\nprint(urllib.request.urlopen(url).read().decode())\n`
        };
        fileSystem[`/root/labs/${labId}/target_info.txt`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `Target IP: ${targetIp}\nTarget Service: Vulnerable Internal Banking Portal (HTTP)\nPorts Open: 80/tcp (HTTP), 8080/tcp (Proxy)\nChallenge Type: Web Exploitation & SQL Injection\n`
        };
        fileSystem[`/root/labs/${labId}/notes.txt`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `Recon Notes:\n1. Scan target using: nmap ${targetIp}\n2. Test search parameter: curl "http://${targetIp}/api/search?q=admin"\n3. Exploit UNION SQLi: curl "http://${targetIp}/api/search?q=' UNION SELECT 1,2,3,flag FROM secret_flag_vault--"\n4. Flag format: FLAG{...}\n`
        };
        fileSystem[`/root/labs/${labId}/exploit_payload.sql`] = {
          type: 'file',
          perms: '-rw-r--r--',
          owner: 'root',
          group: 'root',
          content: `' UNION SELECT 1, 2, 3, flag FROM secret_flag_vault -- \n`
        };
      }


      let currentWorkingDir = `/root/labs/${labId}`;
      let previousWorkingDir = '/root';
      const commandHistory = [];

      const resolvePath = (path) => {
        if (!path || path === '.') return currentWorkingDir;
        if (path === '~' || path === '~/') return '/root';
        if (path.startsWith('~/')) path = '/root/' + path.slice(2);

        let parts;
        if (path.startsWith('/')) {
          parts = path.split('/').filter(Boolean);
        } else {
          parts = (currentWorkingDir + '/' + path).split('/').filter(Boolean);
        }

        const resolved = [];
        for (const part of parts) {
          if (part === '.') continue;
          if (part === '..') {
            if (resolved.length > 0) resolved.pop();
          } else {
            resolved.push(part);
          }
        }
        return resolved.length === 0 ? '/' : '/' + resolved.join('/');
      };

      const formatPromptPath = (path) => {
        if (path === '/root') return '~';
        if (path.startsWith('/root/')) return '~' + path.slice(5);
        return path;
      };

      const getPrompt = () => `\r\n\x1b[1;34m┌──(\x1b[1;31mroot㉿kali\x1b[1;34m)-[\x1b[0;37m${formatPromptPath(currentWorkingDir)}\x1b[1;34m]\r\n└─# \x1b[0m`;

      const banner =
        '\x1b[1;34m' +
        '   ______      __               ______      ______ \r\n' +
        '  / ____/_  __/ /_  ___  _____ / ____/___  / ____/ \r\n' +
        ' / /   / / / / __ \\/ _ \\/ ___// /   / __ \\/ __/    \r\n' +
        '/ /___/ /_/ / /_/ /  __/ /   / /___/ /_/ / /___    \r\n' +
        '\\____/\\__, /_.___/\\___/_/    \\____/\\____/_____/    \r\n' +
        '     /____/           CyberCoE Red-Team Range \r\n' +
        '\x1b[0m\r\n' +
        `\x1b[0;32m[*] Kali Linux Workspace initialized\x1b[0m\r\n` +
        `\x1b[0;33m[*] Target Host: ${targetIp} (Port 80)\x1b[0m\r\n` +
        `\x1b[0;37m[*] Follow the Step-by-Step Guide on the right\x1b[0m\r\n`;

      term.write(banner);
      term.write(getPrompt());

      // ==========================================
      // Linux Command Interpreter
      // ==========================================
      const executeCommand = (rawLine) => {
        const line = rawLine.trim();
        if (!line) return;

        commandHistory.push(line);

        let isAppend = false;
        let isRedirect = false;
        let redirectTarget = null;
        let commandText = line;

        if (line.includes('>>')) {
          isAppend = true;
          const parts = line.split('>>');
          commandText = parts[0].trim();
          redirectTarget = parts[1].trim();
        } else if (line.includes('>')) {
          isRedirect = true;
          const parts = line.split('>');
          commandText = parts[0].trim();
          redirectTarget = parts[1].trim();
        }

        const tokens = commandText.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
        if (tokens.length === 0) return;

        const cleanTokens = tokens.map((t) => t.replace(/^"(.*)"$/, '$1'));
        let tool = cleanTokens[0];
        let args = cleanTokens.slice(1);

        if (tool === 'sudo') {
          tool = args[0];
          args = args.slice(1);
        }

        let outputBuffer = '';

        // --- pwd ---
        if (tool === 'pwd') {
          outputBuffer = `${currentWorkingDir}\r\n`;
        }
        // --- cd ---
        else if (tool === 'cd') {
          const rawTarget = args[0];

          if (!rawTarget || rawTarget === '~') {
            previousWorkingDir = currentWorkingDir;
            currentWorkingDir = '/root';
          } else if (rawTarget === '-') {
            const temp = currentWorkingDir;
            currentWorkingDir = previousWorkingDir;
            previousWorkingDir = temp;
            outputBuffer = `${currentWorkingDir}\r\n`;
          } else {
            const targetResolved = resolvePath(rawTarget);
            const node = fileSystem[targetResolved];
            if (!node) {
              outputBuffer = `bash: cd: ${rawTarget}: No such file or directory\r\n`;
            } else if (node.type !== 'dir') {
              outputBuffer = `bash: cd: ${rawTarget}: Not a directory\r\n`;
            } else {
              previousWorkingDir = currentWorkingDir;
              currentWorkingDir = targetResolved;
            }
          }
        }
        // --- ls ---
        else if (tool === 'ls') {
          let showLong = false;
          let showAll = false;
          let targetPath = currentWorkingDir;

          for (const arg of args) {
            if (arg.startsWith('-')) {
              if (arg.includes('l')) showLong = true;
              if (arg.includes('a')) showAll = true;
            } else {
              targetPath = resolvePath(arg);
            }
          }

          const node = fileSystem[targetPath];
          if (!node) {
            outputBuffer = `ls: cannot access '${args[args.length - 1] || targetPath}': No such file or directory\r\n`;
          } else if (node.type === 'file') {
            outputBuffer = `${targetPath.split('/').pop()}\r\n`;
          } else {
            const children = [...node.children];
            if (showAll) {
              children.unshift('.', '..');
            }

            if (showLong) {
              outputBuffer = `total ${children.length * 4}\r\n`;
              for (const child of children) {
                const childPath = child === '.' ? targetPath : child === '..' ? resolvePath(targetPath + '/..') : (targetPath === '/' ? '/' + child : targetPath + '/' + child);
                const childNode = fileSystem[childPath] || { perms: '-rw-r--r--', owner: 'root', group: 'root', type: 'file' };
                const isDir = childNode.type === 'dir';
                const colorCode = isDir ? '\x1b[1;34m' : '\x1b[0m';
                outputBuffer += `${childNode.perms} 1 ${childNode.owner} ${childNode.group} 4096 Aug 17 01:48 ${colorCode}${child}\x1b[0m\r\n`;
              }
            } else {
              const formatted = children.map((c) => {
                const cPath = targetPath === '/' ? '/' + c : targetPath + '/' + c;
                const cNode = fileSystem[cPath];
                return cNode && cNode.type === 'dir' ? `\x1b[1;34m${c}\x1b[0m` : c;
              });
              outputBuffer = formatted.join('  ') + '\r\n';
            }
          }
        }
        // --- mkdir ---
        else if (tool === 'mkdir') {
          if (!args[0]) {
            outputBuffer = 'mkdir: missing operand\r\n';
          } else {
            for (const dirName of args.filter((a) => !a.startsWith('-'))) {
              const dirPath = resolvePath(dirName);
              const parentPath = resolvePath(dirPath + '/..');
              if (fileSystem[dirPath]) {
                outputBuffer += `mkdir: cannot create directory '${dirName}': File exists\r\n`;
              } else if (!fileSystem[parentPath]) {
                outputBuffer += `mkdir: cannot create directory '${dirName}': No such file or directory\r\n`;
              } else {
                fileSystem[dirPath] = {
                  type: 'dir',
                  perms: 'drwxr-xr-x',
                  owner: 'root',
                  group: 'root',
                  children: []
                };
                fileSystem[parentPath].children.push(dirPath.split('/').pop());
              }
            }
          }
        }
        // --- touch ---
        else if (tool === 'touch') {
          if (!args[0]) {
            outputBuffer = 'touch: missing file operand\r\n';
          } else {
            for (const fileName of args) {
              const filePath = resolvePath(fileName);
              const parentPath = resolvePath(filePath + '/..');
              if (!fileSystem[parentPath]) {
                outputBuffer += `touch: cannot touch '${fileName}': No such file or directory\r\n`;
              } else {
                if (!fileSystem[filePath]) {
                  fileSystem[filePath] = {
                    type: 'file',
                    perms: '-rw-r--r--',
                    owner: 'root',
                    group: 'root',
                    content: ''
                  };
                  fileSystem[parentPath].children.push(filePath.split('/').pop());
                }
              }
            }
          }
        }
        // --- rm ---
        else if (tool === 'rm') {
          if (!args[0]) {
            outputBuffer = 'rm: missing operand\r\n';
          } else {
            const isRecursive = args.some((a) => a.includes('r'));
            const targets = args.filter((a) => !a.startsWith('-'));

            for (const targetName of targets) {
              const targetPath = resolvePath(targetName);
              const node = fileSystem[targetPath];
              if (!node) {
                outputBuffer += `rm: cannot remove '${targetName}': No such file or directory\r\n`;
              } else if (node.type === 'dir' && !isRecursive) {
                outputBuffer += `rm: cannot remove '${targetName}': Is a directory (use -r)\r\n`;
              } else {
                const parentPath = resolvePath(targetPath + '/..');
                if (fileSystem[parentPath]) {
                  fileSystem[parentPath].children = fileSystem[parentPath].children.filter((c) => c !== targetPath.split('/').pop());
                }
                delete fileSystem[targetPath];
              }
            }
          }
        }
        // --- cat ---
        else if (tool === 'cat') {
          if (!args[0]) {
            outputBuffer = 'cat: missing operand\r\n';
          } else {
            for (const fileName of args) {
              const filePath = resolvePath(fileName);
              const node = fileSystem[filePath];
              if (!node) {
                outputBuffer += `cat: ${fileName}: No such file or directory\r\n`;
              } else if (node.type === 'dir') {
                outputBuffer += `cat: ${fileName}: Is a directory\r\n`;
              } else {
                outputBuffer += node.content.replace(/\n/g, '\r\n');
                if (!node.content.endsWith('\n')) outputBuffer += '\r\n';
              }
            }
          }
        }
        // --- echo ---
        else if (tool === 'echo') {
          const text = args.join(' ');
          if (redirectTarget) {
            const destPath = resolvePath(redirectTarget);
            const parentPath = resolvePath(destPath + '/..');
            if (fileSystem[parentPath]) {
              if (!fileSystem[destPath]) {
                fileSystem[destPath] = { type: 'file', perms: '-rw-r--r--', owner: 'root', group: 'root', content: '' };
                fileSystem[parentPath].children.push(destPath.split('/').pop());
              }
              if (isAppend) {
                fileSystem[destPath].content += text + '\n';
              } else {
                fileSystem[destPath].content = text + '\n';
              }
            }
          } else {
            outputBuffer = `${text}\r\n`;
          }
        }
        // --- cp ---
        else if (tool === 'cp') {
          if (args.length < 2) {
            outputBuffer = 'cp: missing destination file operand\r\n';
          } else {
            const src = resolvePath(args[0]);
            const dest = resolvePath(args[1]);
            const srcNode = fileSystem[src];
            if (!srcNode) {
              outputBuffer = `cp: cannot stat '${args[0]}': No such file or directory\r\n`;
            } else {
              const destParent = resolvePath(dest + '/..');
              if (fileSystem[destParent]) {
                fileSystem[dest] = JSON.parse(JSON.stringify(srcNode));
                if (!fileSystem[destParent].children.includes(dest.split('/').pop())) {
                  fileSystem[destParent].children.push(dest.split('/').pop());
                }
              }
            }
          }
        }
        // --- mv ---
        else if (tool === 'mv') {
          if (args.length < 2) {
            outputBuffer = 'mv: missing destination file operand\r\n';
          } else {
            const src = resolvePath(args[0]);
            const dest = resolvePath(args[1]);
            const srcNode = fileSystem[src];
            if (!srcNode) {
              outputBuffer = `mv: cannot stat '${args[0]}': No such file or directory\r\n`;
            } else {
              const destParent = resolvePath(dest + '/..');
              const srcParent = resolvePath(src + '/..');
              if (fileSystem[destParent]) {
                fileSystem[dest] = srcNode;
                if (!fileSystem[destParent].children.includes(dest.split('/').pop())) {
                  fileSystem[destParent].children.push(dest.split('/').pop());
                }
                if (fileSystem[srcParent]) {
                  fileSystem[srcParent].children = fileSystem[srcParent].children.filter((c) => c !== src.split('/').pop());
                }
                delete fileSystem[src];
              }
            }
          }
        }
        // --- python / python3 ---
        else if (tool === 'python' || tool === 'python3') {
          const rawJoined = line;
          if (rawJoined.includes('rot_13') || rawJoined.includes('codecs')) {
            outputBuffer = `FLAG{hello_cyber_coe_2026}\r\n`;
          } else if (rawJoined.includes('fuzzer.py')) {
            outputBuffer =
              `[*] Fuzzing remote service target ${targetIp}:9999...\r\n` +
              `[+] Transmitting buffer length: 100 bytes ... OK (200 bytes/sec)\r\n` +
              `[+] Transmitting buffer length: 300 bytes ... OK\r\n` +
              `[+] Transmitting buffer length: 600 bytes ... OK\r\n` +
              `[+] Transmitting buffer length: 900 bytes ... OK\r\n` +
              `[+] Transmitting buffer length: 1000 bytes ... OK\r\n` +
              `[!] Target service crashed at 1024 bytes! Remote socket closed abruptly (SIGSEGV).\r\n` +
              `[+] Crash threshold isolated: 1,024 bytes.\r\n`;
          } else if (rawJoined.includes('check_badchars.py')) {
            outputBuffer =
              `[*] Injected full 256-byte test sequence (\\x01 through \\xff) into buffer...\r\n` +
              `[*] Examining stack memory dump in GDB (x/256bx $esp)...\r\n` +
              `[-] Truncation anomaly detected at byte: \\x00 (Null Byte)\r\n` +
              `[-] Truncation anomaly detected at byte: \\x0a (Line Feed - LF)\r\n` +
              `[-] Truncation anomaly detected at byte: \\x0d (Carriage Return - CR)\r\n` +
              `[-] Truncation anomaly detected at byte: \\x20 (Space delimiter)\r\n` +
              `[+] Bad characters elimination matrix: \\x00 \\x0a \\x0d \\x20\r\n` +
              `[+] Safe character set prepared for shellcode generation.\r\n`;
          } else if (rawJoined.includes('exploit.py')) {
            outputBuffer =
              `[*] Target Host: ${targetIp} | Port: 9999\r\n` +
              `[*] Exploit Architecture: x86 (32-bit little-endian)\r\n` +
              `[*] Payload Construction:\r\n` +
              `    - Offset Padding: 1040 bytes ('A' * 1040)\r\n` +
              `    - EIP Overwrite Gadget: 0x0804859a (JMP ESP in .text)\r\n` +
              `    - NOP Sled: 32 bytes (\\x90 * 32)\r\n` +
              `    - msfvenom Staged Shellcode: 148 bytes (exec /bin/sh -b '\\x00\\x0a\\x0d\\x20')\r\n` +
              `[+] Transmitting 1,220-byte exploit payload ...\r\n` +
              `[+] Remote stack frame smashed successfully!\r\n` +
              `[+] Control flow hijacked: EIP redirected to 0x0804859a -> JMP ESP.\r\n` +
              `[+] NOP sled hit. Shellcode executed.\r\n` +
              `[+] Spawning interactive root shell session #1 on ${targetIp}:9999...\r\n` +
              `# whoami\r\nroot\r\n# cat /root/flag.txt\r\n\x1b[1;32mFLAG{b0f_st4ck_sm4sh_r0p_g4dg3t_pwn_2026}\x1b[0m\r\n`;
          } else if (rawJoined.includes('decrypt_c2_vault.py')) {
            outputBuffer =
              `[*] Initializing forensic decryption engine ...\r\n` +
              `[*] Loading memory artifact: /tmp/evidence/injected_4892.bin\r\n` +
              `[*] Recovered AES-256-CBC Key: 3a9f82d14b7e0c5a218d6f903e41b2c8\r\n` +
              `[*] Recovered Initialization Vector (IV): f41c890a5d2e3b71\r\n` +
              `[*] Decrypting captured network telemetry streams in traffic.pcap ...\r\n` +
              `[+] Reconstructed 14 exfiltration chunks from /api/v2/telemetry\r\n` +
              `[+] Master C2 Vault Disclosed:\r\n` +
              `-------------------------------------------------------------\r\n` +
              `\x1b[1;32mFLAG{4pt_m3m0ry_f0r3ns1cs_v0l4t1l1ty_hunt3r_2026}\x1b[0m\r\n` +
              `-------------------------------------------------------------\r\n`;
          } else if (rawJoined.includes('decrypt_payload.py')) {
            const keyArg = args[args.length - 1] || '0x5a4f3c89';
            outputBuffer =
              `[*] Ingesting dynamic rolling key table: ${keyArg}\r\n` +
              `[*] Anti-debugging bypass verified: GDB runtime patch active.\r\n` +
              `[*] Deobfuscating encrypted .rodata payload bytes (64 iterations) ...\r\n` +
              `[+] CRC32 checksum match: 0x8F9C21A0\r\n` +
              `[+] Decrypted Master Trojan Flag:\r\n` +
              `-------------------------------------------------------------\r\n` +
              `\x1b[1;32mFLAG{m4lw4r3_r3v3rs1ng_upx_d3p4ck_ptf_2026}\x1b[0m\r\n` +
              `-------------------------------------------------------------\r\n`;
          } else if (rawJoined.includes('sqli_union.py') || rawJoined.includes('exploit')) {
            outputBuffer = `{"status": "success", "data": [{"id": 1, "username": "admin", "secret": "FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}"}]}\r\n`;
          } else {
            outputBuffer = `Python 3.11.8 (main, Kali Linux)\r\n[+] Script execution completed successfully.\r\n`;
          }
        }
        // --- checksec ---
        else if (tool === 'checksec') {
          outputBuffer =
            `\x1b[1m[*] '/root/labs/buffer-overflow/vuln_server'\x1b[0m\r\n` +
            `    \x1b[1;36mArch:    \x1b[0m i386-32-little (x86)\r\n` +
            `    \x1b[1;31mRELRO:   \x1b[0m No RELRO\r\n` +
            `    \x1b[1;31mStack:   \x1b[0m \x1b[1;31mNo canary found\x1b[0m\r\n` +
            `    \x1b[1;31mNX:      \x1b[0m \x1b[1;31mNX disabled (Stack is Executable: RWX)\x1b[0m\r\n` +
            `    \x1b[1;31mPIE:     \x1b[0m \x1b[1;31mNo PIE (Base 0x08048000)\x1b[0m\r\n` +
            `    \x1b[1;33mRWX:     \x1b[0m Has RWX segments in memory map\r\n`;
        }
        // --- msf-pattern_create ---
        else if (tool === 'msf-pattern_create' || tool === 'pattern_create') {
          outputBuffer =
            `Aa0Aa1Aa2Aa3Aa4Aa5Aa6Aa7Aa8Aa9Ab0Ab1Ab2Ab3Ab4Ab5Ab6Ab7Ab8Ab9Ac0Ac1Ac2Ac3Ac4Ac5Ac6Ac7Ac8Ac9Ad0Ad1Ad2Ad3Ad4Ad5Ad6Ad7Ad8Ad9Ae0Ae1Ae2Ae3Ae4Ae5Ae6Ae7Ae8Ae9Af0Af1Af2Af3Af4Af5Af6Af7Af8Af9Ag0Ag1Ag2Ag3Ag4Ag5Ag6Ag7Ag8Ag9Ah0Ah1Ah2Ah3Ah4Ah5Ah6Ah7Ah8Ah9Ai0Ai1Ai2Ai3Ai4Ai5Ai6Ai7Ai8Ai9Aj0Aj1Aj2Aj3Aj4Aj5Aj6Aj7Aj8Aj9\r\n` +
            `[+] Generated 1,500-byte non-repeating De Bruijn sequence.\r\n`;
        }
        // --- msf-pattern_offset ---
        else if (tool === 'msf-pattern_offset' || tool === 'pattern_offset') {
          outputBuffer =
            `[*] Exact match at offset 1040\r\n` +
            `[+] EIP register overwrite occurs precisely after 1,040 bytes of padding.\r\n`;
        }
        // --- ropper ---
        else if (tool === 'ropper') {
          outputBuffer =
            `[INFO] Loading gadgets for 'vuln_server'\r\n` +
            `[LOAD] Parsing ELF sections ... 100%\r\n` +
            `[LOAD] Eliminating bad characters (\\x00\\x0a\\x0d\\x20) ... 100%\r\n` +
            `\r\n\x1b[1;32m[+] Matching Gadgets Found:\x1b[0m\r\n` +
            `  0x0804859a : jmp esp\r\n` +
            `  0x080485a0 : call esp\r\n` +
            `  0x0804860b : push esp; ret\r\n` +
            `[+] Chosen reliable pivot gadget: \x1b[1;36m0x0804859a (jmp esp)\x1b[0m\r\n`;
        }
        // --- volatility3 / volatility ---
        else if (tool === 'volatility3' || tool === 'volatility') {
          const rawJoined = line;
          if (rawJoined.includes('pstree') || rawJoined.includes('pslist')) {
            outputBuffer =
              `Volatility 3 Framework 2.5.0\r\n` +
              `PID\tPPID\tImageFileName\tOffset(V)\tThreads\tHandles\tSessionId\tNotes\r\n` +
              `4\t0\tSystem\t\t0xfa8001832040\t84\t-\tN/A\tLegitimate\r\n` +
              `484\t4\tsmss.exe\t0xfa8002a7b880\t2\t29\tN/A\tSession Manager\r\n` +
              `580\t568\tcsrss.exe\t0xfa8002b85060\t9\t420\t0\tSubsystem\r\n` +
              `708\t648\tservices.exe\t0xfa8002d29060\t7\t198\t0\tService Host\r\n` +
              `732\t708\tsvchost.exe\t0xfa8002d41060\t10\t312\t0\tSystem32 Legit\r\n` +
              `\x1b[1;31m4892\t1248\tsvchost.exe\t0xfa8003e89040\t1\t14\t1\t[!] HOLLOWED (Parent: powershell.exe, Path: AppData\\Roaming)\x1b[0m\r\n`;
          } else if (rawJoined.includes('malfind')) {
            outputBuffer =
              `Volatility 3 Framework 2.5.0\r\n` +
              `Scanning VAD tags for PAGE_EXECUTE_READWRITE segments in PID 4892 ...\r\n` +
              `------------------------------------------------------------\r\n` +
              `Process: svchost.exe Pid: 4892 Address: 0x002a0000 Vad: VadS\r\n` +
              `Protection: \x1b[1;31mPAGE_EXECUTE_READWRITE (RWX)\x1b[0m\r\n` +
              `0x002a0000  \x1b[1;33m4d 5a\x1b[0m 90 00 03 00 00 00 04 00 00 00 ff ff 00 00  \x1b[1;33mMZ\x1b[0m..............\r\n` +
              `0x002a0010  b8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00  ........@.......\r\n` +
              `0x002a0020  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................\r\n` +
              `0x002a0030  e8 00 00 00 00 58 83 c0 1c 50 68 89 e5 31 c0 50  .....X...Ph..1.P\r\n` +
              `[+] Injected executable PE binary identified in hollowed VAD memory.\r\n`;
          } else if (rawJoined.includes('dumpfiles')) {
            outputBuffer =
              `Volatility 3 Framework 2.5.0\r\n` +
              `Progress: 100.00%\tExtracting memory-mapped image sections for PID 4892 ...\r\n` +
              `[+] Dumped file: /tmp/evidence/injected_4892.bin (Size: 42,496 bytes)\r\n` +
              `[+] Artifact ready for static YARA analysis & key recovery.\r\n`;
          } else {
            outputBuffer = `Volatility 3 Framework 2.5.0\r\nType 'volatility3 -f memory.vmem windows.pstree' or 'windows.malfind' to analyze memory.\r\n`;
          }
        }
        // --- yara ---
        else if (tool === 'yara') {
          outputBuffer =
            `[+] Compiling YARA signature: apt_lazarus_hunt.yara ... OK\r\n` +
            `[+] Scanning memory artifact directory: /tmp/evidence/ ...\r\n` +
            `\x1b[1;32m[MATCH] apt_lazarus_c2_payload /tmp/evidence/injected_4892.bin\x1b[0m\r\n` +
            `  $s1: "C2_AES_SESSION_KEY_2026" at offset 0x00000140\r\n` +
            `  $s2: "/api/v2/telemetry/heartbeat" at offset 0x00000280\r\n` +
            `  $op1: { 89 e5 31 c0 50 68 2f 2f 73 68 } at offset 0x00000310\r\n` +
            `[+] 1/1 files matched threat rule signatures.\r\n`;
        }
        // --- tcpdump ---
        else if (tool === 'tcpdump') {
          outputBuffer =
            `reading from file traffic.pcap, link-type EN10MB (Ethernet), snapshot length 262144\r\n` +
            `03:14:02.104829 IP 10.100.1.50.49182 > 198.51.100.42.443: Flags [P.], seq 1:148, ack 1\r\n` +
            `E...4.@.@...\r\n.d.R..*...P....&....POST /api/v2/telemetry HTTP/1.1\r\n` +
            `Host: 198.51.100.42\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n` +
            `Content-Type: application/x-www-form-urlencoded\r\n\r\n` +
            `data=e0FFU19FTkNfQzJfQkVBQ09OfQ==&jitter=60s\r\n` +
            `03:15:02.108420 IP 10.100.1.50.49182 > 198.51.100.42.443: Flags [P.], seq 149:298, ack 1\r\n` +
            `[+] Periodic beaconing detected: exact 60-second intervals to 198.51.100.42:443.\r\n`;
        }
        // --- tshark ---
        else if (tool === 'tshark') {
          outputBuffer =
            `/api/v2/telemetry?node=WORKSTATION-04&status=active&beacon=60s\r\n` +
            `/api/v2/telemetry?sync=aes256_enc_payload_chunk_01&nonce=9a8b7c\r\n` +
            `/api/v2/telemetry?exfil=FLAG_DATA_EXFIL_STAGE2&session=3a9f82d14b7e0c5a218d6f903e41b2c8\r\n` +
            `[+] Extracted 3 encoded C2 exfiltration requests.\r\n`;
        }
        // --- sha256sum ---
        else if (tool === 'sha256sum') {
          const target = args[0] || 'suspicious_sample.bin';
          outputBuffer = `a4f89d019b88234e6c7104b281f9a0d8e2098bc3141592653589793238462643  ${target}\r\n`;
        }
        // --- file ---
        else if (tool === 'file') {
          const target = args[0] || 'suspicious_sample.bin';
          if (target.includes('unpacked')) {
            outputBuffer = `${target}: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, not stripped\r\n`;
          } else {
            outputBuffer = `${target}: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, stripped, UPX compressed\r\n`;
          }
        }
        // --- binwalk ---
        else if (tool === 'binwalk') {
          outputBuffer =
            `DECIMAL       HEXADECIMAL     DESCRIPTION\r\n` +
            `--------------------------------------------------------------------------------\r\n` +
            `0             0x0             ELF, 64-bit LSB executable, AMD x86-64, version 1 (SYSV)\r\n` +
            `312           0x138           UPX compressed data, version 3.96, ultra compression method\r\n` +
            `14820         0x39E4          \x1b[1;31mHigh Entropy Block: 7.989218 bits/byte (Encrypted Payload)\x1b[0m\r\n` +
            `[+] High block entropy confirmed: Binary is protected by UPX compressor.\r\n`;
        }
        // --- upx ---
        else if (tool === 'upx') {
          outputBuffer =
            `                       Ultimate Packer for eXecutables\r\n` +
            `                          Copyright (C) 1996 - 2026\r\n` +
            `        File size         Ratio      Format      Name\r\n` +
            `   --------------------   ------   -----------   -----------\r\n` +
            `     15820 ->     48200   32.82%    linux/x86_64 unpacked_sample.bin\r\n` +
            `\r\n\x1b[1;32mUnpacked 1 file.\x1b[0m Section headers reconstructed successfully.\r\n`;
        }
        // --- readelf ---
        else if (tool === 'readelf') {
          outputBuffer =
            `Section Headers:\r\n` +
            `  [Nr] Name              Type             Address           Offset   Flags\r\n` +
            `  [ 0]                   NULL             0000000000000000  00000000\r\n` +
            `  [ 1] .text             PROGBITS         0000000000401000  00001000  [AX : Alloc Exec]\r\n` +
            `  [ 2] .rodata           PROGBITS         0000000000402000  00002000  [A  : Alloc]\r\n` +
            `  [ 3] .data             PROGBITS         0000000000403000  00003000  [WA : Write Alloc]\r\n` +
            `  [ 4] .bss              NOBITS           0000000000403040  00003040  [WA : Write Alloc]\r\n` +
            `[+] Reconstructed 24 clean ELF section headers.\r\n`;
        }
        // --- objdump ---
        else if (tool === 'objdump') {
          outputBuffer =
            `0000000000401140 <main>:\r\n` +
            `  401140: 55                    push   rbp\r\n` +
            `  401141: 48 89 e5              mov    rbp,rsp\r\n` +
            `  401144: 48 83 ec 20           sub    rsp,0x20\r\n` +
            `  401148: \x1b[1;31me8 33 00 00 00        call   401180 <check_debugger>\x1b[0m\r\n` +
            `  40114d: 85 c0                 test   eax,eax\r\n` +
            `  40114f: \x1b[1;33m75 22                 jne    401173 <abort_execution>\x1b[0m\r\n` +
            `  401151: 48 8d 3d a8 0e 00 00  lea    rdi,[rip+0xea8] # 0x402000 <encrypted_flag>\r\n` +
            `  401158: e8 63 00 00 00        call   4011c0 <decrypt_routine>\r\n` +
            `  40115d: b8 00 00 00 00        mov    eax,0x0\r\n` +
            `  401162: c9                    leave\r\n` +
            `  401163: c3                    ret\r\n`;
        }
        // --- gdb ---
        else if (tool === 'gdb') {
          const rawJoined = line;
          if (rawJoined.includes('check_debugger') || rawJoined.includes('disas')) {
            outputBuffer =
              `Dump of assembler code for function check_debugger:\r\n` +
              `   0x08048680 <+0>:   push   ebp\r\n` +
              `   0x08048681 <+1>:   mov    ebp,esp\r\n` +
              `   0x08048683 <+3>:   push   0x0\r\n` +
              `   0x08048685 <+5>:   push   0x1\r\n` +
              `   0x08048687 <+7>:   push   0x0\r\n` +
              `   0x08048689 <+9>:   push   0x0       # PTRACE_TRACEME (0)\r\n` +
              `   0x0804868b <+11>:  call   0x8048450 <ptrace@plt>\r\n` +
              `   0x08048690 <+16>:  cmp    eax,0xffffffff\r\n` +
              `   0x080486a4 <+20>:  \x1b[1;31mjne    0x80486c0 <terminate_tampered_process>\x1b[0m\r\n` +
              `   0x080486a6 <+22>:  leave\r\n` +
              `   0x080486a7 <+23>:  ret\r\n` +
              `End of assembler dump.\r\n`;
          } else if (rawJoined.includes('0x90') || rawJoined.includes('set *')) {
            outputBuffer =
              `[+] Breakpoint 1 at 0x08048680\r\n` +
              `[+] Starting program: /root/labs/malware-re/unpacked_sample.bin\r\n` +
              `Breakpoint 1, 0x08048680 in check_debugger ()\r\n` +
              `\x1b[1;32m[+] Memory patch applied: *(unsigned char*)0x080486a4 = 0x90 (NOP)\x1b[0m\r\n` +
              `[+] Anti-debugging branch neutralized. Continuing execution ...\r\n` +
              `[+] Reached payload decryption stub. Key buffer located in .rodata at 0x080499b0.\r\n`;
          } else {
            outputBuffer =
              `GNU gdb (Debian 13.2-1) 13.2\r\n` +
              `Reading symbols from ./unpacked_sample.bin... (symbols loaded)\r\n` +
              `(gdb) Type 'disas check_debugger' or run commands.\r\n`;
          }
        }
        // --- grep ---
        else if (tool === 'grep') {
          if (args.length < 1) {
            outputBuffer = 'grep: missing pattern\r\n';
          } else {
            const pattern = args[0];
            const file = args[1];
            if (!file) {
              outputBuffer = 'grep: missing file operand\r\n';
            } else {
              const filePath = resolvePath(file);
              const node = fileSystem[filePath];
              if (!node || node.type !== 'file') {
                outputBuffer = `grep: ${file}: No such file\r\n`;
              } else {
                const lines = node.content.split('\n');
                const matched = lines.filter((l) => l.includes(pattern));
                outputBuffer = matched.map((l) => `\x1b[1;31m${l}\x1b[0m`).join('\r\n') + (matched.length > 0 ? '\r\n' : '');
              }
            }
          }
        }
        // --- chmod ---
        else if (tool === 'chmod') {
          if (args.length < 2) {
            outputBuffer = 'chmod: missing operand\r\n';
          } else {
            const filePath = resolvePath(args[1]);
            if (fileSystem[filePath]) {
              fileSystem[filePath].perms = '-rwxrwxrwx';
              outputBuffer = '';
            } else {
              outputBuffer = `chmod: cannot access '${args[1]}': No such file or directory\r\n`;
            }
          }
        }
        // --- whoami ---
        else if (tool === 'whoami') {
          outputBuffer = 'root\r\n';
        }
        // --- id ---
        else if (tool === 'id') {
          outputBuffer = 'uid=0(root) gid=0(root) groups=0(root)\r\n';
        }
        // --- uname ---
        else if (tool === 'uname') {
          outputBuffer = 'Linux kali 6.6.0-kali1-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux\r\n';
        }
        // --- date ---
        else if (tool === 'date') {
          outputBuffer = `${new Date().toUTCString()}\r\n`;
        }
        // --- hostname ---
        else if (tool === 'hostname') {
          outputBuffer = 'kali\r\n';
        }
        // --- clear ---
        else if (tool === 'clear') {
          term.write('\x1b[2J\x1b[H');
          return;
        }
        // --- history ---
        else if (tool === 'history') {
          outputBuffer = commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\r\n') + '\r\n';
        }
        // --- ping ---
        else if (tool === 'ping') {
          const host = args[args.length - 1] || targetIp;
          if (host === targetIp || host === '127.0.0.1' || host === 'localhost') {
            outputBuffer =
              `PING ${host} (${host}) 56(84) bytes of data.\r\n` +
              `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.382 ms\r\n` +
              `64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.415 ms\r\n` +
              `--- ${host} ping statistics ---\r\n` +
              `2 packets transmitted, 2 received, 0% packet loss\r\n`;
          } else {
            outputBuffer = `From 10.100.1.5 icmp_seq=1 Destination Host Unreachable (Deny-by-default isolation)\r\n`;
          }
        }
        // --- nmap ---
        else if (tool === 'nmap') {
          const rawJoined = line;
          if (rawJoined.includes('9999')) {
            outputBuffer =
              `Starting Nmap 7.94SVN ( https://nmap.org )\r\n` +
              `Nmap scan report for ${targetIp}\r\n` +
              `Host is up (0.00032s latency).\r\n` +
              `PORT     STATE SERVICE VERSION\r\n` +
              `9999/tcp open  abyss?  vuln_server x86 custom binary (Authentication Daemon)\r\n` +
              `Nmap done: 1 IP address (1 host up) scanned in 0.84 seconds\r\n`;
          } else {
            outputBuffer =
              `Starting Nmap 7.94SVN ( https://nmap.org )\r\n` +
              `Nmap scan report for ${targetIp}\r\n` +
              `Host is up (0.00045s latency).\r\n` +
              `PORT     STATE SERVICE VERSION\r\n` +
              `80/tcp   open  http    Werkzeug/3.0.1 Python/3.11.8 (Flask/SQLite)\r\n` +
              `|_http-title: BankVault Employee Directory (Internal)\r\n` +
              `8080/tcp open  http-proxy\r\n` +
              `Nmap done: 1 IP address (1 host up) scanned in 1.18 seconds\r\n`;
          }
        }
        // --- curl ---
        else if (tool === 'curl') {
          const rawQuery = line;
          if (rawQuery.includes('-I') || rawQuery.includes('-i')) {
            outputBuffer =
              `HTTP/1.1 200 OK\r\n` +
              `Server: Werkzeug/3.0.1 Python/3.11.8\r\n` +
              `Date: ${new Date().toUTCString()}\r\n` +
              `Content-Type: text/html; charset=utf-8\r\n` +
              `Content-Length: 184\r\n\r\n`;
          } else if (rawQuery.includes('UNION') || rawQuery.includes('%27') || rawQuery.includes("'")) {
            outputBuffer =
              `HTTP/1.1 200 OK\r\n` +
              `Content-Type: application/json\r\n\r\n` +
              `{\r\n` +
              `  "status": "success",\r\n` +
              `  "data": [\r\n` +
              `    {"id": 1, "username": "admin", "secret": "FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}"}\r\n` +
              `  ]\r\n` +
              `}\r\n`;
          } else {
            outputBuffer =
              `HTTP/1.1 200 OK\r\n` +
              `Content-Type: text/html\r\n\r\n` +
              `<!DOCTYPE html><html><title>BankVault Employee Portal</title>\r\n` +
              `<body><h1>BankVault Portal</h1><p>Search endpoint: /api/search?q=alice</p></body></html>\r\n`;
          }
        }
        // --- sqlmap ---
        else if (tool === 'sqlmap') {
          outputBuffer =
            `[INFO] testing connection to the target URL: http://${targetIp}/api/search?q=test\r\n` +
            `[INFO] GET parameter 'q' is vulnerable to SQL injection (Generic UNION query)\r\n` +
            `[+] Extracted Flag: FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}\r\n` +
            `[*] database dump completed successfully\r\n`;
        }
        // --- nikto ---
        else if (tool === 'nikto') {
          outputBuffer =
            `+ Target IP: ${targetIp}\r\n` +
            `+ Server: Werkzeug/3.0.1 Python/3.11.8\r\n` +
            `+ /api/search: Parameter 'q' vulnerable to direct SQL injection.\r\n`;
        }
        // --- help ---
        else if (tool === 'help') {
          outputBuffer =
            `\r\n\x1b[1;36mCyberCoE Interactive Linux Terminal & Offensive Security Toolchain:\x1b[0m\r\n` +
            `  \x1b[1;33mBinary & Exploit Development:\x1b[0m\r\n` +
            `    checksec --file=<binary>       - Audit stack canaries, NX, PIE, RELRO\r\n` +
            `    msf-pattern_create -l <len>    - Generate non-repeating De Bruijn offset pattern\r\n` +
            `    msf-pattern_offset -q <addr>   - Calculate exact EIP overwrite distance\r\n` +
            `    ropper --file <bin> --search   - Search memory for JMP ESP & ROP gadgets\r\n` +
            `    gdb -q ./<binary>              - Disassemble, set breakpoints & memory patches\r\n\r\n` +
            `  \x1b[1;33mThreat Hunting & Memory Forensics:\x1b[0m\r\n` +
            `    volatility3 -f <vmem> <plugin> - Memory analysis (pstree, malfind, dumpfiles)\r\n` +
            `    yara -r <rule.yara> <path>     - Compile and scan malware signature rules\r\n` +
            `    tcpdump -r <pcap> -nn -A       - Read raw PCAP packet stream\r\n` +
            `    tshark -r <pcap> -Y <filter>   - Protocol frame extraction\r\n\r\n` +
            `  \x1b[1;33mReverse Engineering & Unpacking:\x1b[0m\r\n` +
            `    upx -d -o <out> <packed_bin>   - Decompress UPX packed ELF/PE binary\r\n` +
            `    binwalk -E <binary>            - Section entropy analysis\r\n` +
            `    readelf -S <binary>            - Inspect reconstructed section table\r\n` +
            `    objdump -d -M intel <binary>   - Disassemble x86/x64 assembly instructions\r\n` +
            `    sha256sum, file, python3\r\n`;
        } else {
          outputBuffer = `bash: ${tool}: command not found. Type 'help' for available tools.\r\n`;
        }

        if (outputBuffer) {
          term.write(outputBuffer);
        }

        // Broadcast telemetry to AI Mentor & Workspace
        try {
          const strippedOutput = (outputBuffer || '').replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '');
          window.dispatchEvent(new CustomEvent('cybercoe:terminal_activity', {
            detail: {
              command: rawLine,
              output: strippedOutput,
              cwd: currentWorkingDir,
              timestamp: Date.now()
            }
          }));
        } catch (e) {}
      };

      let currentLine = '';

      // Global event listener for 1-click Auto-Run from Guide
      const handleRemoteCommand = (event) => {
        if (event.detail && typeof event.detail === 'string') {
          const cmd = event.detail.trim();
          term.write(`${cmd}\r\n`);
          executeCommand(cmd);
          currentLine = '';
          term.write(getPrompt());
          term.scrollToBottom();
        }
      };

      window.addEventListener('cybercoe:run_command', handleRemoteCommand);

      const onDataDisposable = term.onData((data) => {
        for (let i = 0; i < data.length; i++) {
          const char = data[i];

          // Enter / Return
          if (char === '\r' || char === '\n') {
            term.write('\r\n');
            executeCommand(currentLine);
            currentLine = '';
            term.write(getPrompt());
            term.scrollToBottom();
          }
          // Backspace / DEL
          else if (char === '\x08' || char === '\x7f') {
            if (currentLine.length > 0) {
              currentLine = currentLine.slice(0, -1);
              term.write('\b \b');
              term.scrollToBottom();
            }
          }
          // Ctrl+C (Interrupt)
          else if (char === '\x03') {
            currentLine = '';
            term.write('^C');
            term.write(getPrompt());
            term.scrollToBottom();
          }
          // Ctrl+L (Clear)
          else if (char === '\x0c') {
            term.write('\x1b[2J\x1b[H');
            term.write(getPrompt());
            if (currentLine) term.write(currentLine);
            term.scrollToBottom();
          }
          // Printable characters
          else if (char.charCodeAt(0) >= 32) {
            currentLine += char;
            term.write(char);
            term.scrollToBottom();
          }
        }
      });

      const handleResize = () => {
        try {
          fitAddon.fit();
        } catch (e) {}
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('cybercoe:run_command', handleRemoteCommand);
        window.removeEventListener('resize', handleResize);
        if (resizeObserver) {
          try { resizeObserver.disconnect(); } catch (e) {}
        }
        onDataDisposable.dispose();
        term.dispose();
      };
    }

    const cleanupPromise = initXterm();

    return () => {
      isMounted = false;
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === 'function') cleanup();
      });
    };
  }, [sessionId, targetIp, labId, sizeTier]);

  const handleFit = () => {
    if (fitAddonRef.current && termInstanceRef.current) {
      try {
        fitAddonRef.current.fit();
        termInstanceRef.current.scrollToBottom();
      } catch (e) {}
    }
  };

  useEffect(() => {
    handleFit();
    const t = setTimeout(handleFit, 60);
    return () => clearTimeout(t);
  }, [sizeTier]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#05080f',
      borderRadius: sizeTier === 'fullscreen' ? 0 : '8px',
      border: sizeTier === 'fullscreen' ? 'none' : '1px solid rgba(30, 101, 255, 0.4)',
      overflow: 'hidden',
      boxShadow: '0 0 40px rgba(0,0,0,0.9), inset 0 0 20px rgba(30, 101, 255, 0.15)'
    }}>
      {/* Terminal Title Bar */}
      <div style={{
        background: 'rgba(10, 15, 25, 0.98)',
        padding: '0.55rem 1rem',
        borderBottom: '1px solid rgba(30, 101, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        userSelect: 'none',
        flexShrink: 0,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Red, Yellow, Green Interactive Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* 🔴 Red: Return to Lab Explanation */}
            <button
              onClick={onClose}
              onMouseEnter={() => setHoveredDot('red')}
              onMouseLeave={() => setHoveredDot(null)}
              title="Close Workspace & Return to Briefing"
              style={{
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: '#ef4444',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                transform: hoveredDot === 'red' ? 'scale(1.2)' : 'scale(1)',
                boxShadow: hoveredDot === 'red' ? '0 0 8px #ef4444' : 'none'
              }}
            >
              {hoveredDot === 'red' && <X size={9} color="#7f1d1d" strokeWidth={3} />}
            </button>

            {/* 🟡 Yellow: Decrease Lab Size */}
            <button
              onClick={onDecreaseSize}
              onMouseEnter={() => setHoveredDot('yellow')}
              onMouseLeave={() => setHoveredDot(null)}
              title="Decrease Terminal Size"
              style={{
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: '#f59e0b',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                transform: hoveredDot === 'yellow' ? 'scale(1.2)' : 'scale(1)',
                boxShadow: hoveredDot === 'yellow' ? '0 0 8px #f59e0b' : 'none'
              }}
            >
              {hoveredDot === 'yellow' && <Minus size={9} color="#78350f" strokeWidth={3} />}
            </button>

            {/* 🟢 Green: Increase Lab Size / Fullscreen */}
            <button
              onClick={onIncreaseSize}
              onMouseEnter={() => setHoveredDot('green')}
              onMouseLeave={() => setHoveredDot(null)}
              title="Increase Terminal Size / Maximize"
              style={{
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: '#10b981',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                transform: hoveredDot === 'green' ? 'scale(1.2)' : 'scale(1)',
                boxShadow: hoveredDot === 'green' ? '0 0 8px #10b981' : 'none'
              }}
            >
              {hoveredDot === 'green' && <Plus size={9} color="#064e3b" strokeWidth={3} />}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#60a5fa', fontWeight: 'bold' }}>
              root@kali:~
            </span>
            <span style={{ color: '#475569' }}>|</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>
              CyberCoE Kali Linux Red-Team Workspace
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px #10b981'
            }}></span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>
              WORKSPACE ACTIVE
            </span>
          </div>

          <button
            onClick={sizeTier === 'fullscreen' ? onDecreaseSize : onIncreaseSize}
            title={sizeTier === 'fullscreen' ? "Exit Fullscreen" : "Maximize"}
            style={{
              background: sizeTier === 'fullscreen' ? '#1E65FF' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              padding: '4px 8px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem'
            }}
          >
            {sizeTier === 'fullscreen' ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            {sizeTier === 'fullscreen' ? 'Exit Fullscreen' : 'Maximize'}
          </button>
        </div>
      </div>

      {/* Terminal Viewport Container */}
      <div 
        style={{ 
          flex: 1, 
          padding: '6px 12px 10px 12px', 
          overflow: 'hidden',
          position: 'relative',
          background: '#05080f',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          minWidth: 0
        }}
      >
        <style>{`
          .xterm, .xterm-viewport, .xterm-screen {
            overflow-x: hidden !important;
            max-width: 100% !important;
          }
          .xterm-viewport {
            overflow-y: auto !important;
          }
          .xterm-helper-textarea {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 1px !important;
            height: 1px !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `}</style>
        <div 
          ref={terminalRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden',
            flex: 1
          }}
        />
      </div>
    </div>
  );
}

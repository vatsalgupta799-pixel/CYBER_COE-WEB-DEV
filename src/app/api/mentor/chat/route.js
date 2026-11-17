import { NextResponse } from 'next/server';
import { labDetails } from '../../../../data/labDetails';
import { rateLimit } from '@/lib/rateLimit';
import { sanitizeString, sanitizeNoSql } from '@/lib/sanitize';
import { handleApiError } from '@/lib/errorHandler';

// Comprehensive Knowledge Base for All 9 Practice Labs
const LAB_KNOWLEDGE = {
  'intro-to-crypto': {
    title: 'Intro to Cryptography: Secret Codes & Ciphers',
    category: 'Cryptography & Ciphers',
    difficulty: 'Beginner',
    mitreId: 'T1140',
    mitreTactic: 'Defense Evasion',
    mitreUrl: 'https://attack.mitre.org/techniques/T1140/',
    flag: 'FLAG{hello_cyber_coe_2026}',
    concept: 'Encoding scrambles data for format compatibility (reversible without keys), whereas cryptography uses mathematical algorithms to conceal information. In this lab, Caesar/ROT13 cipher shifts characters by 13 positions.',
    analogy: 'Think of ROT13 like rotating a 26-letter decoder wheel by 13 clicks. Rotating it twice (26 clicks) brings you right back to where you started!',
    tools: ['python3', 'CyberChef', 'bash', 'cat'],
    quiz: [
      {
        question: 'What is the main difference between Encoding (like Base64/ROT13) and Encryption (like AES)?',
        answer: 'Encoding can be decoded by anyone without a secret key, whereas encryption strictly requires a cryptographic key.'
      },
      {
        question: 'Why does applying ROT13 twice to a message return the original text?',
        answer: 'Because the English alphabet has 26 letters, and shifting by 13 + 13 = 26 positions completes a full circle.'
      }
    ],
    redTeam: 'Adversaries use ROT13 or XOR obfuscation to bypass simple static antivirus string checks in malicious scripts or macros.',
    blueTeam: 'Implement entropy analysis and memory inspection (EDR) to detect dynamic string deobfuscation at runtime.'
  },
  'basic-linux': {
    title: 'Linux Commands for Complete Beginners',
    category: 'Linux Essentials',
    difficulty: 'Beginner',
    mitreId: 'T1059.004',
    mitreTactic: 'Execution',
    mitreUrl: 'https://attack.mitre.org/techniques/T1059/004/',
    flag: 'FLAG{hello_cyber_coe_2026}',
    concept: 'Linux terminal gives you direct command over the operating system filesystem, permissions, processes, and network sockets using bash commands.',
    analogy: 'Typing commands in the terminal is like speaking directly to the operating system engine without having a slow graphical user interface in between.',
    tools: ['pwd', 'ls', 'cd', 'cat', 'mkdir', 'touch', 'rm'],
    quiz: [
      {
        question: 'What does the `-a` flag in `ls -la` do?',
        answer: 'It reveals hidden files and directories whose names begin with a dot (`.`).'
      },
      {
        question: 'What does `&&` between two terminal commands mean?',
        answer: 'It executes the second command only if the first command succeeds with exit code 0.'
      }
    ],
    redTeam: 'Attackers use basic Unix shell commands to conduct initial host reconnaissance, locate credential files, and map permissions.',
    blueTeam: 'Deploy auditd/syslog monitoring for suspicious command executions (e.g. `whoami`, `id`, `cat /etc/shadow`) and enforce sudo least privilege.'
  },
  'phishing-id': {
    title: 'Spotting Fake Phishing Emails & Scams',
    category: 'Social Engineering Defense',
    difficulty: 'Beginner',
    mitreId: 'T1566.002',
    mitreTactic: 'Initial Access',
    mitreUrl: 'https://attack.mitre.org/techniques/T1566/002/',
    flag: 'FLAG{hello_cyber_coe_2026}',
    concept: 'Phishing mimics trusted senders to steal user credentials or deliver payloads via lookalike domains and deceptive links.',
    analogy: 'A phishing email is like a letter with a fake bank logo printed on it asking you to mail your ATM pin to a PO box.',
    tools: ['curl', 'cat', 'grep', 'whois'],
    quiz: [
      {
        question: 'What email security protocols protect against domain spoofing?',
        answer: 'SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC.'
      },
      {
        question: 'What is a homoglyph attack in phishing links?',
        answer: 'Replacing standard letters with identical-looking unicode/Cyrillic characters (e.g. `gооgle.com` where `о` is Cyrillic).'
      }
    ],
    redTeam: 'Spearphishing leverages OSINT from LinkedIn and corporate sites to craft tailored pretexts with credential harvesting landing pages.',
    blueTeam: 'Enforce hardware FIDO2 MFA tokens (phishing-resistant), email quarantine filters, and continuous employee security awareness simulations.'
  },
  'sql-injection': {
    title: 'SQL Injection Basics & Data Extraction',
    category: 'Web Application Security',
    difficulty: 'Intermediate',
    mitreId: 'T1190',
    mitreTactic: 'Initial Access',
    mitreUrl: 'https://attack.mitre.org/techniques/T1190/',
    flag: 'FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}',
    concept: 'SQL Injection happens when untrusted user input is directly concatenated into a database SQL query string without parameterization or escaping.',
    analogy: 'Imagine a bank teller asking for your name, and you say: "John; ALSO TRANSFER $10,000 TO MY ACCOUNT". If the teller blindly executes everything you say, that is SQL Injection.',
    tools: ['curl', 'sqlmap', 'nmap', 'python3'],
    quiz: [
      {
        question: 'What purpose does the `--` comment operator serve in SQL Injection payloads?',
        answer: 'It instructs the database engine to ignore the remainder of the developer\'s original query following the injected payload.'
      },
      {
        question: 'What is the definitive defense against SQL Injection in modern web development?',
        answer: 'Parameterized queries (Prepared Statements) or ORMs that separate user data from SQL code execution.'
      }
    ],
    redTeam: 'UNION-based SQLi attaches rows from target tables like `secret_flag_vault` to the application\'s normal result set.',
    blueTeam: 'Use Web Application Firewalls (WAF) with ModSecurity/AWS WAF SQLi rule groups and parameterized queries in backend code.'
  },
  'network-sniffing': {
    title: 'Network Packet Sniffing & Credential Harvesting',
    category: 'Network Security',
    difficulty: 'Intermediate',
    mitreId: 'T1040',
    mitreTactic: 'Credential Access',
    mitreUrl: 'https://attack.mitre.org/techniques/T1040/',
    flag: 'FLAG{hello_cyber_coe_2026}',
    concept: 'Network sniffing captures unencrypted raw packet traffic (HTTP, FTP, Telnet) passing through a network interface in promiscuous mode.',
    analogy: 'Unencrypted network traffic is like sending postcards through the mail—anyone handling the postcard can read every word.',
    tools: ['wireshark', 'tcpdump', 'tshark', 'grep'],
    quiz: [
      {
        question: 'Why does HTTPS prevent credential sniffing on public Wi-Fi?',
        answer: 'HTTPS encrypts the entire payload using TLS/SSL, meaning sniffers only see encrypted ciphertext.'
      },
      {
        question: 'What command-line tool in Linux captures packets to a `.pcap` file?',
        answer: '`tcpdump -i eth0 -w capture.pcap`.'
      }
    ],
    redTeam: 'Attackers use ARP spoofing or SPAN/mirror port access to capture plaintext basic authentication credentials from legacy protocols.',
    blueTeam: 'Enforce 100% TLS 1.3 encryption, disable legacy protocols (Telnet/HTTP/FTP), and deploy 802.1X Network Access Control.'
  },
  'privilege-escalation': {
    title: 'Linux Privilege Escalation via SUID Misconfiguration',
    category: 'Penetration Testing',
    difficulty: 'Intermediate',
    mitreId: 'T1548.001',
    mitreTactic: 'Privilege Escalation',
    mitreUrl: 'https://attack.mitre.org/techniques/T1548/001/',
    flag: 'FLAG{hello_cyber_coe_2026}',
    concept: 'SUID (Set User ID) binaries run with the file owner\'s permissions (often root). Misconfigured SUID binaries (like `find` or `bash`) allow low-privilege users to execute root shells.',
    analogy: 'An SUID binary is like a master key card attached to a specific office door. If that door has a backdoor leading to the server room, anyone who uses the key card can get into the server room.',
    tools: ['find', 'gtfobins', 'bash', 'id'],
    quiz: [
      {
        question: 'What numeric permission represents the SUID bit in Linux?',
        answer: 'The octal digit `4` in the first position (e.g. `4755`).'
      },
      {
        question: 'How do you search for all SUID binaries across the entire Linux filesystem?',
        answer: '`find / -perm -4000 -type f 2>/dev/null`'
      }
    ],
    redTeam: 'Attackers search GTFOBins for known execution escapes in SUID binaries to spawn interactive root shells.',
    blueTeam: 'Audit SUID binaries with `nosuid` mount flags on partitions, run periodic CIS benchmark scans, and remove unnecessary SUID permissions.'
  },
  'buffer-overflow': {
    title: 'x86 Stack Smash & ROP Gadgets',
    category: 'Binary Exploitation',
    difficulty: 'Advanced',
    mitreId: 'T1068',
    mitreTactic: 'Privilege Escalation',
    mitreUrl: 'https://attack.mitre.org/techniques/T1068/',
    flag: 'FLAG{b0f_st4ck_sm4sh_r0p_g4dg3t_pwn_2026}',
    concept: 'Stack buffer overflow overwrites the Instruction Pointer (`EIP`/`RIP`) on the stack memory frame to redirect CPU execution to shellcode or Return-Oriented Programming (ROP) gadgets.',
    analogy: 'Stack memory is like an ice cube tray. If you pour a gallon of water into one cube slot, the water spills over and drowns all the other slots below it.',
    tools: ['gdb', 'pwntools', 'ropper', 'cyclic'],
    quiz: [
      {
        question: 'What register controls the next instruction executed by the CPU in x86?',
        answer: 'The `EIP` (Extended Instruction Pointer) register.'
      },
      {
        question: 'What memory protection prevents code execution directly on the stack?',
        answer: 'NX (No-Execute) / DEP (Data Execution Prevention).'
      }
    ],
    redTeam: 'When DEP/NX is enabled, attackers chain small instruction sequences ending in `RET` (ROP gadgets) to bypass non-executable stacks.',
    blueTeam: 'Compile binaries with stack canaries (`-fstack-protector-all`), ASLR, and RELRO, or migrate to memory-safe languages (Rust/Go).'
  },
  'apt-sim': {
    title: 'Enterprise APT & Memory Forensics',
    category: 'Threat Hunting',
    difficulty: 'Advanced',
    mitreId: 'T1055.012',
    mitreTactic: 'Defense Evasion',
    mitreUrl: 'https://attack.mitre.org/techniques/T1055/012/',
    flag: 'FLAG{4pt_m3m0ry_f0r3ns1cs_v0l4t1l1ty_hunt3r_2026}',
    concept: 'Advanced Persistent Threats (APTs) use Process Hollowing (replacing legitimate code in `svchost.exe` with malicious payloads) to evade endpoint detection.',
    analogy: 'Process hollowing is like a thief wearing a security guard uniform and badge to walk through bank doors without anyone suspecting anything.',
    tools: ['volatility3', 'yara', 'wireshark', 'strings'],
    quiz: [
      {
        question: 'What Volatility 3 plugin identifies memory regions with `PAGE_EXECUTE_READWRITE` permissions indicative of process injection?',
        answer: '`windows.malfind`'
      },
      {
        question: 'What is C2 beacon jitter in adversary network communications?',
        answer: 'Adding randomized time variations to network beacons to evade statistical periodic beaconing detection algorithms.'
      }
    ],
    redTeam: 'Adversaries hollow legitimate system processes and inject shellcode into memory to leave zero uncompiled disk artifacts.',
    blueTeam: 'Use kernel-level EDR drivers to monitor `VirtualAllocEx` / `WriteProcessMemory` API calls and author memory YARA rules.'
  },
  'malware-re': {
    title: 'Malware RE & Anti-Debug Bypass',
    category: 'Reverse Engineering',
    difficulty: 'Advanced',
    mitreId: 'T1027.002',
    mitreTactic: 'Defense Evasion',
    mitreUrl: 'https://attack.mitre.org/techniques/T1027/002/',
    flag: 'FLAG{m4lw4r3_r3v3rs1ng_upx_d3p4ck_ptf_2026}',
    concept: 'Malware authors compress payloads with packers (like UPX) and check for debugger attachments via Linux `ptrace(PTRACE_TRACEME)` to thwart analysis.',
    analogy: 'Unpacking malware is like peeling the vacuum-sealed outer wrap off a gift box, while bypassing anti-debugging is like disconnecting the alarm switch before opening the lid.',
    tools: ['gdb', 'upx', 'ghidra', 'radare2', 'strace'],
    quiz: [
      {
        question: 'How can an analyst bypass `ptrace(PTRACE_TRACEME)` anti-debugging checks inside GDB?',
        answer: 'Set a breakpoint at the `ptrace` call and modify the return register `RAX`/`EAX` to `0` (Success).'
      },
      {
        question: 'What high entropy score in a PE/ELF binary header typically indicates packing or encryption?',
        answer: 'An entropy value close to 7.0 - 8.0 bits per byte.'
      }
    ],
    redTeam: 'Writers employ custom XOR encryption routines, polymorphic packers, and timing checks (`RDTSC`) to defeat automated sandboxes.',
    blueTeam: 'Deploy automated dynamic behavioral sandboxes with hypervisor-level instrumentation that are invisible to user-mode debugger checks.'
  }
};

// Evaluates student progress against lab attack steps
function evaluateProgress(labData, recentCommands, lastOutput, isSolved) {
  const steps = labData?.attackSteps || [];
  if (steps.length === 0) {
    return { currentStepIndex: 0, currentStep: null, nextStep: null, completedSteps: 0, totalSteps: 0, status: 'started' };
  }

  if (isSolved) {
    return {
      currentStepIndex: steps.length - 1,
      currentStep: steps[steps.length - 1],
      nextStep: null,
      completedSteps: steps.length,
      totalSteps: steps.length,
      status: 'completed'
    };
  }

  // Check if output contains flag
  const hasFlagInOutput = lastOutput && (lastOutput.includes('FLAG{') || (labData.solutionFlag && lastOutput.includes(labData.solutionFlag)));
  if (hasFlagInOutput) {
    return {
      currentStepIndex: steps.length - 1,
      currentStep: steps[steps.length - 1],
      nextStep: null,
      completedSteps: steps.length - 1,
      totalSteps: steps.length,
      status: 'ready_to_solve'
    };
  }

  // Match commands in reverse order
  let highestCompletedIdx = -1;
  const commandHistoryStr = recentCommands.join(' ').toLowerCase();

  for (let i = 0; i < steps.length; i++) {
    const stepCmd = (steps[i].command || '').toLowerCase().trim();
    if (!stepCmd) continue;

    // Check key tool/command tokens
    const firstWord = stepCmd.split(' ')[0];
    if (commandHistoryStr.includes(stepCmd) || (firstWord && commandHistoryStr.includes(firstWord))) {
      highestCompletedIdx = i;
    }
  }

  const nextStepIdx = Math.min(highestCompletedIdx + 1, steps.length - 1);
  return {
    currentStepIndex: nextStepIdx,
    currentStep: steps[nextStepIdx],
    nextStep: steps[nextStepIdx + 1] || null,
    completedSteps: Math.max(0, highestCompletedIdx + 1),
    totalSteps: steps.length,
    status: highestCompletedIdx >= steps.length - 2 ? 'near_completion' : 'in_progress'
  };
}

export async function POST(request) {
  try {
    // 1. IP Rate Limiting (40 requests per minute per IP)
    const limitState = rateLimit(request, 40, 60 * 1000, 'mentor_chat');
    if (!limitState.success) {
      return NextResponse.json(
        { 
          success: false,
          response: `You are sending messages too quickly. Please slow down for ${limitState.resetSeconds} seconds.`,
          retryAfter: limitState.resetSeconds 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(limitState.resetSeconds),
            'X-RateLimit-Limit': String(limitState.limit),
            'X-RateLimit-Remaining': String(limitState.remaining)
          }
        }
      );
    }

    // 2. Input Sanitization
    const rawBody = await request.json().catch(() => ({}));
    const body = sanitizeNoSql(rawBody);
    const { message, mode = 'tutor', context = {} } = body;

    const {
      labId = 'sql-injection',
      labTitle = 'Practice Lab',
      recentCommands = [],
      lastOutput = '',
      currentPath = '/root',
      isSolved = false,
      isLabStarted = false
    } = context;

    const cleanMessage = sanitizeString(message || '');
    const cleanMode = sanitizeString(mode || 'tutor');

    const detailedLab = labDetails[labId] || {};
    const knowledgeLab = LAB_KNOWLEDGE[labId] || LAB_KNOWLEDGE['sql-injection'];
    const userPrompt = cleanMessage.trim();
    const lowerPrompt = userPrompt.toLowerCase();
    const lastCmd = recentCommands.length > 0 ? recentCommands[recentCommands.length - 1] : '';

    const progress = evaluateProgress(detailedLab, recentCommands, lastOutput, isSolved);
    const attackSteps = detailedLab.attackSteps || [];

    let aiResponse = '';
    let suggestedCommand = null;

    // Mode flags
    const isRedTeamMode = mode === 'red_team';
    const isBlueTeamMode = mode === 'blue_team';

    // -------------------------------------------------------------
    // PROGRESS REVIEW / "HOW AM I DOING?" / "WHAT NEXT?"
    // -------------------------------------------------------------
    if (
      lowerPrompt.includes('progress') ||
      lowerPrompt.includes('next') ||
      lowerPrompt.includes('what to do') ||
      lowerPrompt.includes('where am i') ||
      lowerPrompt.includes('am i on track') ||
      lowerPrompt.includes('guide me')
    ) {
      if (isSolved) {
        aiResponse = `🎉 **Outstanding Achievement! Challenge Solved!**
- **Status:** You have successfully extracted and verified the secret flag for **${knowledgeLab.title}**.
- **Live Terminal Assessment:** All attack phases completed cleanly.
- **Next Recommendation:** Try another lab from the [Practice Labs](/practice-labs) catalog or switch to **Blue Team mode** to study defensive hardening!`;
      } else if (!isLabStarted) {
        aiResponse = `📍 **Live Observer Status: Pre-Lab Briefing Mode**
- **Target Host:** \`10.100.1.10\`
- **Challenge:** **${knowledgeLab.title}** (${knowledgeLab.difficulty} • ${knowledgeLab.category})

👉 **How to Begin:**
1. Review the attack steps and concept explanation below.
2. Click **Launch Kali Workspace** to start your interactive sandbox.
3. Once started, I will track every command you run and guide you step-by-step!`;
      } else if (progress.status === 'ready_to_solve' || (lastOutput && lastOutput.includes('FLAG{'))) {
        aiResponse = `🎯 **Live Terminal Observation: Flag Discovered!**
- **Terminal Status:** I detected the secret flag in your recent output!
- **Discovered Flag:** \`${knowledgeLab.flag}\`
- **Next Step:** Copy the flag and paste it into the **Flag Verification** box above to complete the lab!`;
      } else if (!lastCmd) {
        const firstStep = attackSteps[0];
        aiResponse = `👁️ **Live Terminal Observation: Ready for Step 1**
- **Current Directory:** \`${currentPath}\`
- **Session Status:** Kali Terminal Active (No commands executed yet).

👉 **Your Immediate Next Action (${firstStep?.title || 'Step 1'}):**
${firstStep?.explanation || 'Run your initial command to begin the attack sequence.'}`;
        suggestedCommand = firstStep?.command || null;
      } else {
        const step = progress.currentStep || attackSteps[0];
        aiResponse = `👁️ **Live Terminal Progress Report:**
- **Last Executed Command:** \`${lastCmd}\` in \`${currentPath}\`
- **Current Progress:** Step **${progress.currentStepIndex + 1} of ${progress.totalSteps}** — **${step?.title || 'Active Step'}**
- **Live Telemetry Assessment:** Your terminal environment is synchronized.

👉 **Your Next Action:**
${step?.explanation || 'Execute the following verified command in your Kali terminal:'}`;
        suggestedCommand = step?.command || null;
      }
    }

    // -------------------------------------------------------------
    // ERROR DIAGNOSIS & LIVE TELEMETRY
    // -------------------------------------------------------------
    else if (
      lowerPrompt.includes('diagnose') ||
      lowerPrompt.includes('error') ||
      lowerPrompt.includes('fail') ||
      lowerPrompt.includes('not working') ||
      lowerPrompt.includes('why') ||
      (lastOutput && (lastOutput.toLowerCase().includes('not found') || lastOutput.toLowerCase().includes('error') || lastOutput.toLowerCase().includes('syntax') || lastOutput.toLowerCase().includes('denied')))
    ) {
      if (!lastCmd) {
        aiResponse = `🔍 **Live Terminal Telemetry:** No commands recorded yet in your terminal buffer.

${isLabStarted 
  ? `Start with **Step 1** on the right or ask me *"What should I do next?"* to get your first command!` 
  : `You are in **Mission Briefing** mode. Click **Launch Kali Workspace** above to begin.`}`;
      } else if (lastOutput.includes('command not found') || lastOutput.includes('not found')) {
        aiResponse = `⚠️ **Live Terminal Error Detected (Typo / Unknown Command):**
- **Command Entered in Kali:** \`${lastCmd}\`
- **Error Output:** \`${lastOutput.slice(0, 120)}\`
- **Diagnosis:** The utility or syntax was not recognized by the bash interpreter.
- **Fix:** In this lab (${knowledgeLab.category}), use verified tools: \`${knowledgeLab.tools.join('`, `')}\`.

👉 **Recommended Fix Command:**`;
        suggestedCommand = progress.currentStep?.command || 'help';
      } else if (lastCmd.includes('curl') && (lastCmd.includes('UNION') || lastCmd.includes('select'))) {
        aiResponse = `🎯 **Live Terminal Telemetry: SQL Injection UNION Query Executed!**
- **Command Executed:** \`${lastCmd}\`
- **Inspection Result:** The remote server accepted the SQL payload and returned the database rows.
- **Observation:** Look inside the JSON body in your terminal screen. The \`"flag"\` field holds your secret key!
- **Action:** Copy \`${knowledgeLab.flag}\` and submit it in the Flag box above!`;
        suggestedCommand = `curl "http://10.100.1.10/api/search?q=' UNION SELECT 1,2,3,flag FROM secret_flag_vault--"`;
      } else {
        const step = progress.currentStep || attackSteps[0];
        aiResponse = `🔍 **Live Terminal Telemetry Analysis:**
- **Last Command:** \`${lastCmd}\` (Exit status: Normal)
- **Current Folder:** \`${currentPath}\`
- **Current Challenge Stage:** Step **${progress.currentStepIndex + 1} of ${progress.totalSteps}** (${step?.title || 'In Progress'})

${isRedTeamMode ? `⚔️ *Offensive Tip:* Make sure your payload correctly terminates quotes and comment delimiters.` : `💡 *Tutor Tip:* Everything in your terminal is running normally. Execute the next step below to advance!`}`;
        suggestedCommand = step?.command || null;
      }
    }

    // -------------------------------------------------------------
    // INTERACTIVE READINESS QUIZ
    // -------------------------------------------------------------
    else if (lowerPrompt.includes('quiz') || lowerPrompt.includes('test my knowledge') || lowerPrompt.includes('readiness')) {
      const q = knowledgeLab.quiz || [];
      aiResponse = `🎯 **Interactive Readiness Check for ${knowledgeLab.title}**

Here are key concept questions based on your current lab:

${q.map((item, idx) => `**Q${idx + 1}: ${item.question}**\n👉 *Answer:* ${item.answer}`).join('\n\n')}

💡 **Ready to test in practice?** ${isLabStarted ? `You are currently at **Step ${progress.currentStepIndex + 1}**. Click **Run** below to advance!` : 'Click **Launch Kali Workspace** above to start your live hands-on terminal!'}`;
      if (progress.currentStep?.command) {
        suggestedCommand = progress.currentStep.command;
      }
    }

    // -------------------------------------------------------------
    // RED TEAM MODE
    // -------------------------------------------------------------
    else if (isRedTeamMode || lowerPrompt.includes('red team') || lowerPrompt.includes('exploit') || lowerPrompt.includes('payload') || lowerPrompt.includes('bypass')) {
      aiResponse = `⚔️ **Red Team Offensive Analysis for ${knowledgeLab.title}:**

- **Live Terminal Context:** Currently in \`${currentPath}\` (Step ${progress.currentStepIndex + 1} of ${progress.totalSteps})
- **Adversary Technique:** MITRE ATT&CK [${knowledgeLab.mitreId}](${knowledgeLab.mitreUrl}) — *${knowledgeLab.mitreTactic}*
- **Exploitation Rationale:** ${knowledgeLab.redTeam}

🎯 **Current Offensive Objective:**
${progress.currentStep?.explanation || 'Execute the payload against target 10.100.1.10.'}`;
      if (progress.currentStep?.command) {
        suggestedCommand = progress.currentStep.command;
      }
    }

    // -------------------------------------------------------------
    // BLUE TEAM MODE
    // -------------------------------------------------------------
    else if (isBlueTeamMode || lowerPrompt.includes('blue team') || lowerPrompt.includes('defense') || lowerPrompt.includes('defend') || lowerPrompt.includes('mitigat') || lowerPrompt.includes('patch')) {
      aiResponse = `🛡️ **Blue Team Defensive Engineering for ${knowledgeLab.title}:**

- **Live Terminal Context:** Observing target at \`10.100.1.10\`
- **MITRE Standard:** [${knowledgeLab.mitreId}](${knowledgeLab.mitreUrl})
- **Detection Strategy:** ${knowledgeLab.blueTeam}

🛡️ **Hardening & Remediation Measures:**
1. **Input Validation:** Enforce strict type constraints and parameterized inputs.
2. **Principle of Least Privilege:** Drop unnecessary OS and database capabilities.
3. **Continuous Monitoring:** Stream high-fidelity security logs into SIEM / EDR with alert thresholds.
4. **Automated Testing:** Integrate SAST/DAST security scanning into CI/CD build pipelines.`;
    }

    // -------------------------------------------------------------
    // CONCEPT EXPLANATION & ANALOGY
    // -------------------------------------------------------------
    else if (lowerPrompt.includes('analogy') || lowerPrompt.includes('eli5') || lowerPrompt.includes('simple') || lowerPrompt.includes('explain') || lowerPrompt.includes('what is')) {
      aiResponse = `📖 **Concept Explained in Simple Words (${knowledgeLab.title}):**

${knowledgeLab.concept}

🎒 **Everyday Life Analogy:**
> ${knowledgeLab.analogy}

🔧 **Tools in this Challenge:**
${knowledgeLab.tools.map(t => `- \`${t}\``).join('\n')}

👁️ **Your Live Terminal Status:** You are currently at **Step ${progress.currentStepIndex + 1} of ${progress.totalSteps}** (${progress.currentStep?.title || 'Active'}).`;
      if (progress.currentStep?.command) {
        suggestedCommand = progress.currentStep.command;
      }
    }

    // -------------------------------------------------------------
    // DEFAULT PROGRESS-AWARE CONVERSATIONAL RESPONSE
    // -------------------------------------------------------------
    else {
      const step = progress.currentStep || attackSteps[0];
      aiResponse = `👋 **CyberCoE Live AI Lab Mentor (${mode.toUpperCase()} Mode)**

I am actively monitoring your live Kali Linux terminal for **${knowledgeLab.title}**.

👁️ **Live Telemetry State:**
- **Terminal Status:** ${isLabStarted ? '🟢 Connected & Live Tracking' : '⚪ Pre-Lab Mission Briefing'}
- **Current Step:** **Step ${progress.currentStepIndex + 1} of ${progress.totalSteps}** — *${step?.title || 'Start Challenge'}*
${lastCmd ? `- **Last Command Executed:** \`${lastCmd}\` in \`${currentPath}\`\n` : ''}
**How can I assist you right now?**
- 👁️ *"What should I run next in my terminal?"*
- 🔍 *"Diagnose my last terminal command and output"*
- 🎯 *"Quiz my readiness on this concept"*
- ⚔️ *"Explain the Red Team exploit mechanics"*
- 🛡️ *"Explain how Blue Teams defend against this in real life"*`;
      if (progress.currentStep?.command) {
        suggestedCommand = progress.currentStep.command;
      }
    }

    return NextResponse.json({
      success: true,
      response: aiResponse,
      suggestedCommand,
      progress: {
        currentStepIndex: progress.currentStepIndex,
        completedSteps: progress.completedSteps,
        totalSteps: progress.totalSteps,
        stepTitle: progress.currentStep?.title || 'In Progress',
        status: progress.status
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return handleApiError(error, 'I experienced a brief processing error. Please ask again in a moment.');
  }
}


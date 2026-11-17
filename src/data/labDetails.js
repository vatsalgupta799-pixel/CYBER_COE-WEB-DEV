export const labDetails = {
  // ==========================================
  // 1. Beginner Labs (1 Hour Time Limit)
  // ==========================================
  'intro-to-crypto': {
    title: 'Intro to Cryptography: Secret Codes & Ciphers',
    difficulty: 'Beginner',
    category: 'Cryptography & Ciphers',
    estimatedTime: '1 Hour (60 Mins)',
    concept: 'Cryptography is like writing in a secret language. You take normal readable words and scramble them into secret code so nobody else can read them. In this lab, you will decode a secret message by shifting the letters back to normal.',
    analogy: 'Imagine you and your friend have a secret code in school: every time you write "A", you replace it with "B", "B" becomes "C", and so on. If anyone intercepts your note, it looks like gibberish—but your friend knows to shift the letters backward to read your message!',
    example: {
      normal: 'Original Message: "HELLO"',
      payload: 'Secret Scrambled Code (ROT13): "URYYB"',
      explanation: 'Every letter is shifted forward by 13 spots in the alphabet. Shifting it 13 spots again reveals the original secret message!'
    },
    mitreAttack: {
      id: 'T1140',
      name: 'Deobfuscate/Decode Files or Information',
      tactic: 'Defense Evasion',
      url: 'https://attack.mitre.org/techniques/T1140/',
      defense: 'Implement Endpoint Detection and Response (EDR) memory scanning to detect in-memory decoding and enforce file integrity monitoring.'
    },
    tools: ['python3', 'CyberChef', 'bash', 'cat'],
    solutionFlag: 'FLAG{hello_cyber_coe_2026}',
    attackSteps: [
      {
        title: 'Step 1: Open Target Recon Notes',
        explanation: 'Read the notes file to find the scrambled secret message.',
        command: 'cat notes.txt',
        breakdown: [
          { part: 'cat', meaning: 'Short for "concatenate" — prints the full text of a file directly to your terminal screen.' },
          { part: 'notes.txt', meaning: 'The name of the text file containing our intercepted secret cipher notes.' }
        ]
      },
      {
        title: 'Step 2: Check Challenge Details',
        explanation: 'Look at the target info to confirm the challenge.',
        command: 'cat target_info.txt',
        breakdown: [
          { part: 'cat', meaning: 'Prints file content to terminal.' },
          { part: 'target_info.txt', meaning: 'The information file describing the target host and challenge rules.' }
        ]
      },
      {
        title: 'Step 3: Unscramble the Secret Flag',
        explanation: 'Run this 1-click Python command to automatically shift the letters and reveal the secret flag.',
        command: `python3 -c "import codecs; print(codecs.decode('SYNT{uryyb_plore_pbr_2026}', 'rot_13'))"`,
        breakdown: [
          { part: 'python3', meaning: 'Launches the Python 3 programming language runtime.' },
          { part: '-c', meaning: 'Tells Python to execute the following short code string directly without opening a file.' },
          { part: 'import codecs', meaning: 'Loads Python\'s built-in text encoding and decoding library.' },
          { part: 'codecs.decode(..., "rot_13")', meaning: 'Rotates each letter by 13 positions in the alphabet to unscramble the secret flag.' }
        ]
      },
      {
        title: 'Step 4: Copy & Submit Discovered Flag',
        explanation: 'Look at the terminal output from Step 3. Highlight and copy the revealed FLAG{...} string and paste it into the Flag Verification box above.'
      }
    ],
    flagHint: 'Look at the output printed by Python in Step 3. It starts with FLAG{...}.'
  },

  'basic-linux': {
    title: 'Linux Commands for Complete Beginners',
    difficulty: 'Beginner',
    category: 'Linux Essentials',
    estimatedTime: '1 Hour (60 Mins)',
    concept: 'On your phone or laptop, you tap icons with your finger or mouse. In Linux, you control the computer by typing simple, short words into a black screen called the terminal.',
    analogy: 'Think of the Linux terminal like texting instructions to a robot assistant: you type "pwd" to ask "Where am I?", you type "ls" to say "Show me what files are in this room", and you type "cd folder" to say "Walk inside that folder".',
    example: {
      normal: 'On Windows/Mac: Double-clicking a folder named "photos" with your mouse.',
      payload: 'In Linux Terminal: Typing "cd photos" and pressing Enter.',
      explanation: 'Typing commands is much faster than clicking and allows ethical hackers to automate complex tasks in seconds!'
    },
    mitreAttack: {
      id: 'T1059.004',
      name: 'Command and Scripting Interpreter: Unix Shell',
      tactic: 'Execution',
      url: 'https://attack.mitre.org/techniques/T1059/004/',
      defense: 'Restrict unnecessary shell access with sudoers least-privilege policies and monitor audit logs (auditd/syslog) for anomalous shell commands.'
    },
    tools: ['pwd', 'ls', 'cd', 'cat', 'mkdir', 'touch', 'rm'],
    solutionFlag: 'FLAG{hello_cyber_coe_2026}',
    attackSteps: [
      {
        title: 'Step 1: Find Out Where You Are (pwd)',
        explanation: 'Type "pwd" (Print Working Directory) to see what folder you are currently inside.',
        command: 'pwd',
        breakdown: [
          { part: 'pwd', meaning: 'Stands for "Print Working Directory" — tells the computer: "Show me the full folder path of where I am standing right now".' }
        ]
      },
      {
        title: 'Step 2: Look at Files in the Folder (ls)',
        explanation: 'Type "ls -la" (List) to see all the files and folders around you.',
        command: 'ls -la',
        breakdown: [
          { part: 'ls', meaning: 'Stands for "List" — displays all files and folders in your current directory.' },
          { part: '-l', meaning: 'Long format — shows detailed permissions, owners, and file sizes.' },
          { part: '-a', meaning: 'All — reveals secret/hidden files that start with a dot (.).' }
        ]
      },
      {
        title: 'Step 3: Walk Into a Subfolder (cd)',
        explanation: 'Type "cd recon" (Change Directory) to step inside the recon folder and read what is inside.',
        command: 'cd recon && ls -la && cat nmap_scan.txt',
        breakdown: [
          { part: 'cd recon', meaning: 'Change Directory — moves your terminal session into the folder named "recon".' },
          { part: '&&', meaning: 'And Then — chains multiple commands together in a single row.' },
          { part: 'ls -la', meaning: 'Lists all files inside the new recon folder.' },
          { part: 'cat nmap_scan.txt', meaning: 'Opens and reads the nmap scan log file.' }
        ]
      },
      {
        title: 'Step 4: Go Back Home and Read the Flag',
        explanation: 'Return to your home lab directory and read the notes file to get your secret flag.',
        command: 'cd ~/labs/basic-linux && cat notes.txt',
        breakdown: [
          { part: 'cd ~/labs/basic-linux', meaning: 'Navigates straight back to your base lab directory (~ is a shortcut for home).' },
          { part: 'cat notes.txt', meaning: 'Reads the notes file where your challenge flag is documented.' }
        ]
      }
    ],
    flagHint: 'Inspect the notes.txt file in your home lab folder to find the flag.'
  },

  'phishing-id': {
    title: 'Spotting Fake Phishing Emails & Scams',
    difficulty: 'Beginner',
    category: 'Social Engineering Defense',
    estimatedTime: '1 Hour (60 Mins)',
    concept: 'Phishing is when a scammer sends you a fake email pretending to be someone you trust (like PayPal, Google, or your bank) to trick you into typing your password into a fake copycat website.',
    analogy: 'Imagine someone knocks on your front door wearing a postal worker shirt and asks for your house keys. You look closely at their name badge and notice the company logo is misspelled! That is exactly what a phishing email looks like.',
    example: {
      normal: 'Real Legitimate Email: support@paypal.com (Links to https://www.paypal.com)',
      payload: 'Fake Phishing Email: support@paypaI-security.com (Uses a capital "I" instead of "l" to fool your eyes!)',
      explanation: 'Scammers use sneaky lookalike letters and fake links to fool people who are reading in a hurry.'
    },
    mitreAttack: {
      id: 'T1566.002',
      name: 'Phishing: Spearphishing Link',
      tactic: 'Initial Access',
      url: 'https://attack.mitre.org/techniques/T1566/002/',
      defense: 'Deploy email authentication (SPF, DKIM, DMARC), implement web gateway URL sandboxing, and enforce FIDO2 Multi-Factor Authentication (MFA).'
    },
    tools: ['curl', 'cat', 'grep', 'whois'],
    solutionFlag: 'FLAG{hello_cyber_coe_2026}',
    attackSteps: [
      {
        title: 'Step 1: Read the Intercepted Phishing Email',
        explanation: 'Inspect the suspicious email sender and links stored in your notes file.',
        command: 'cat notes.txt',
        breakdown: [
          { part: 'cat', meaning: 'Prints the entire file to the terminal screen.' },
          { part: 'notes.txt', meaning: 'Contains the intercepted phishing email headers, sender address, and fake link.' }
        ]
      },
      {
        title: 'Step 2: Check the Scammer Fake Link',
        explanation: 'Notice how the link uses an unencrypted raw IP address instead of a secure https website.',
        command: 'cat target_info.txt',
        breakdown: [
          { part: 'cat target_info.txt', meaning: 'Reads the target IP address and reveals that the scammer is hosting on unencrypted HTTP port 80.' }
        ]
      },
      {
        title: 'Step 3: Safely Inspect the Fake Server',
        explanation: 'Use the curl command to peek at the scam server without opening it in your personal browser.',
        command: 'curl -I http://10.100.1.10/',
        breakdown: [
          { part: 'curl', meaning: 'Client URL tool — sends a web network request right from the terminal.' },
          { part: '-I', meaning: 'Head only — fetches only the HTTP headers (server type, date, status) without downloading any malware payload.' },
          { part: 'http://10.100.1.10/', meaning: 'The URL address of the suspicious server we are inspecting.' }
        ]
      },
      {
        title: 'Step 4: Copy & Submit Quarantine Flag',
        explanation: 'Copy the quarantine verification flag from the notes file and submit it in the Flag Verification box.'
      }
    ],
    flagHint: 'The quarantine flag is located inside notes.txt.'
  },

  // ==========================================
  // 2. Intermediate Labs (1 Hour Time Limit)
  // ==========================================
  'sql-injection': {
    title: 'SQL Injection: Tricking a Website Database',
    difficulty: 'Intermediate',
    category: 'Web Security (OWASP Top 10)',
    estimatedTime: '1 Hour (60 Mins)',
    concept: 'Websites store user accounts and secret data in a big database (like a digital filing cabinet). When you type in a search box, the website asks the database: "Find info for user X". If the website does not check what you typed, you can type sneaky database commands that trick the filing cabinet into dumping all secret passwords and flags!',
    analogy: 'Imagine you go to a library and write on the request slip: "Give me the book Harry Potter... AND ALSO open the manager\'s locked safe in the back room!". If the librarian blindly follows your note without checking rules, they hand you the keys to the safe!',
    example: {
      normal: 'Normal Search: Searching for "alice" -> Shows Alice\'s profile.',
      payload: 'SQL Injection Search: Searching for " \' UNION SELECT 1,2,3,flag FROM secret_flag_vault-- " -> Dumps the hidden secret flag!',
      explanation: 'The single quote (\') closes the regular search, UNION glues on data from the secret vault, and the double dash (--) tells the computer to ignore the rest of the rules!'
    },
    mitreAttack: {
      id: 'T1190',
      name: 'Exploit Public-Facing Application (SQLi)',
      tactic: 'Initial Access',
      url: 'https://attack.mitre.org/techniques/T1190/',
      defense: 'Always use Parameterized Queries (Prepared Statements / ORMs), validate input against strict allow-lists, and deploy a Web Application Firewall (WAF).'
    },
    tools: ['nmap', 'curl', 'sqlmap', 'python3', 'nikto'],
    solutionFlag: 'FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}',
    attackSteps: [
      {
        title: 'Step 1: Discover the Target Website (Port Scan)',
        explanation: 'Scan the target computer to see if its website is open and listening.',
        command: 'nmap 10.100.1.10',
        breakdown: [
          { part: 'nmap', meaning: 'Network Mapper — port scanner tool used to discover open ports, web servers, and services on a remote machine.' },
          { part: '10.100.1.10', meaning: 'The IP address of the target server in our isolated cyber lab network.' }
        ]
      },
      {
        title: 'Step 2: Test the Normal Search Box',
        explanation: 'Send a normal search request for "admin" to see how the website normally answers.',
        command: 'curl http://10.100.1.10/api/search?q=admin',
        breakdown: [
          { part: 'curl', meaning: 'Sends an HTTP GET web request from the command line.' },
          { part: 'http://10.100.1.10/api/search', meaning: 'The search API endpoint on the vulnerable web application.' },
          { part: '?q=admin', meaning: 'The search parameter containing the search keyword "admin".' }
        ]
      },
      {
        title: 'Step 3: Inject the Magic SQL Payload to Dump Flag',
        explanation: 'Send the UNION payload to trick the database into handing over the secret challenge flag!',
        command: `curl "http://10.100.1.10/api/search?q=' UNION SELECT 1,2,3,flag FROM secret_flag_vault--"`,
        breakdown: [
          { part: 'curl "..."', meaning: 'Quotes keep the entire URL with spaces and symbols intact.' },
          { part: "' (single quote)", meaning: 'Closes the developer\'s original search query string early.' },
          { part: 'UNION SELECT', meaning: 'Glues the results from a second secret database table onto the first table.' },
          { part: '1,2,3,flag', meaning: 'Matches the 4 columns expected by the web page and extracts the flag column.' },
          { part: 'FROM secret_flag_vault', meaning: 'Specifies the hidden table containing our challenge flag.' },
          { part: '--', meaning: 'SQL comment symbol — tells the database to ignore the rest of the original query.' }
        ]
      },
      {
        title: 'Step 4: Copy & Submit Extracted Flag',
        explanation: 'Inspect the JSON response returned by Step 3 in your terminal. Highlight and copy the extracted secret string and paste it into the Flag Verification box above.'
      }
    ],
    flagHint: 'Look for the "secret" field inside the JSON response printed by Step 3 in your terminal.'
  },

  'network-sniffing': {
    title: 'Network Sniffing: Intercepting Plaintext Passwords',
    difficulty: 'Intermediate',
    category: 'Network Security',
    estimatedTime: '1 Hour (60 Mins)',
    concept: 'When you browse a website that uses unencrypted HTTP (without the lock icon HTTPS), your passwords and messages travel across the WiFi in plain readable English. Anyone connected to the same WiFi can listen in and read them.',
    analogy: 'HTTP is like shouting your secret password out loud across a crowded cafeteria—anyone sitting nearby can hear it. HTTPS is like whispering your password into a locked steel box that only the server has the key to open.',
    example: {
      normal: 'Secure HTTPS Traffic: Looks like scrambled nonsense: "a8#9k!2Lz$..." (Cannot be read by eavesdroppers).',
      payload: 'Unsecured HTTP Traffic: Plain readable text: "username=admin&password=Winter2026!" (Easily intercepted!).',
      explanation: 'Network packet sniffers listen to the raw WiFi airwaves and capture unencrypted login passwords.'
    },
    mitreAttack: {
      id: 'T1040',
      name: 'Network Sniffing & Eavesdropping',
      tactic: 'Credential Access / Discovery',
      url: 'https://attack.mitre.org/techniques/T1040/',
      defense: 'Enforce End-to-End TLS/HTTPS encryption (HTTP Strict Transport Security - HSTS), disable legacy plaintext protocols (HTTP/Telnet/FTP), and use network segmentation.'
    },
    tools: ['nmap', 'curl', 'tcpdump', 'wireshark', 'grep'],
    solutionFlag: 'FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}',
    attackSteps: [
      {
        title: 'Step 1: Scan the Target Network',
        explanation: 'Check what ports are open on the target server.',
        command: 'nmap 10.100.1.10',
        breakdown: [
          { part: 'nmap', meaning: 'Port scanner — checks if port 80 (HTTP) or 443 (HTTPS) is active.' },
          { part: '10.100.1.10', meaning: 'The IP address of the target server.' }
        ]
      },
      {
        title: 'Step 2: Read Intercepted Network Notes',
        explanation: 'Inspect your lab notes to see captured traffic details.',
        command: 'cat notes.txt',
        breakdown: [
          { part: 'cat', meaning: 'Outputs file contents to terminal.' },
          { part: 'notes.txt', meaning: 'Contains packet sniffer capture traces and IP packet logs.' }
        ]
      },
      {
        title: 'Step 3: Peek at Unencrypted HTTP Headers',
        explanation: 'Ask the server for its HTTP headers to verify it is running unencrypted.',
        command: 'curl -I http://10.100.1.10/',
        breakdown: [
          { part: 'curl -I', meaning: 'Fetches HTTP response headers only to verify unencrypted communication.' },
          { part: 'http://10.100.1.10/', meaning: 'The unencrypted HTTP web server URL.' }
        ]
      },
      {
        title: 'Step 4: Copy & Submit Captured Flag',
        explanation: 'Extract the captured flag from the target database stream and submit it in the Flag Verification box above.'
      }
    ],
    flagHint: 'Run the exploit query against the target database to extract the captured credentials flag.'
  },

  'privilege-escalation': {
    title: 'Privilege Escalation: Becoming the Super Admin',
    difficulty: 'Intermediate',
    category: 'System Hardening & PrivEsc',
    estimatedTime: '1 Hour (60 Mins)',
    concept: 'When you first hack into a computer, you are only a normal guest user with limited powers. Privilege Escalation means finding a misconfigured program that lets you upgrade yourself into the Super Admin ("root") who controls the entire computer.',
    analogy: 'Imagine you check into a hotel as a guest and only have a key for Room 101. While walking in the hallway, you find a Master Keycard dropped on the floor. Picking it up gives you the power to open every single door in the entire hotel!',
    example: {
      normal: 'Guest User (whoami -> "student"): Can only open their own homework files.',
      payload: 'Super Admin (whoami -> "root"): Can read every password, change any rule, and control the whole server.',
      explanation: 'Certain programs have a special "SUID" setting that accidentally grants root powers to whoever runs them.'
    },
    mitreAttack: {
      id: 'T1548.001',
      name: 'Abuse Elevation Control Mechanism: Setuid and Setgid',
      tactic: 'Privilege Escalation / Defense Evasion',
      url: 'https://attack.mitre.org/techniques/T1548/001/',
      defense: 'Audit SUID binaries regularly with automated scanners, mount sensitive partitions with the "nosuid" flag, and enforce AppArmor or SELinux profiles.'
    },
    tools: ['whoami', 'id', 'find', 'chmod', 'bash', 'cat'],
    solutionFlag: 'FLAG{sql_1nj3ct10n_m4st3r_cybercoe_2026}',
    attackSteps: [
      {
        title: 'Step 1: Check Who You Currently Are',
        explanation: 'Type "whoami" and "id" to see your current user permissions.',
        command: 'whoami && id',
        breakdown: [
          { part: 'whoami', meaning: 'Prints the username of the current user (e.g. root or student).' },
          { part: '&&', meaning: 'Runs the next command immediately afterward.' },
          { part: 'id', meaning: 'Displays user ID (UID), group ID (GID), and all permission groups you belong to.' }
        ]
      },
      {
        title: 'Step 2: Search for Misconfigured Admin Programs',
        explanation: 'Look for programs on the computer that have the special admin SUID bit turned on.',
        command: 'find / -perm -4000 -type f 2>/dev/null',
        breakdown: [
          { part: 'find /', meaning: 'Searches the entire computer starting from the root folder (/).' },
          { part: '-perm -4000', meaning: 'Filters for files that have the special SUID admin permission bit set.' },
          { part: '-type f', meaning: 'Restricts the search to files only (ignores folders).' },
          { part: '2>/dev/null', meaning: 'Mutes and hides "Permission Denied" errors so your screen stays clean.' }
        ]
      },
      {
        title: 'Step 3: Read Privilege Escalation Notes',
        explanation: 'Inspect your notes file to see how to trigger the root exploit.',
        command: 'cat notes.txt',
        breakdown: [
          { part: 'cat', meaning: 'Prints file content to the screen.' },
          { part: 'notes.txt', meaning: 'Contains privilege escalation instructions and exploit scripts.' }
        ]
      },
      {
        title: 'Step 4: Copy & Submit Root Flag',
        explanation: 'Extract the root challenge flag from the secure vault table and paste it into the Flag Verification box above.'
      }
    ],
    flagHint: 'Execute the extraction query in the terminal to dump the root flag.'
  },

  // ==========================================
  // 3. Advanced Labs (2 Hours Time Limit - Hardest CTF/PWK Grade)
  // ==========================================
  'buffer-overflow': {
    title: 'Advanced x86 Stack Smashing, ROP Gadgets & Shellcode Injection',
    difficulty: 'Advanced',
    category: 'Binary Exploitation & Memory Safety',
    estimatedTime: '2 Hours (120 Mins)',
    concept: 'Enterprise binary exploitation involves systematically fuzzing custom network services, calculating exact EIP instruction pointer overwrite offsets using cyclic De Bruijn sequences, auditing bad characters, finding static executable JMP ESP / ROP gadgets to defeat non-executable stack constraints, and crafting a multi-stage NOP sled shellcode payload to spawn an interactive root shell.',
    analogy: 'Think of this like precision mechanical lockpicking of an armored bank vault: You first stress-test the locking mechanism until it jams (fuzzing), use an electronic caliper to measure the exact millimetre where the shear line is reached (cyclic offset in GDB), eliminate pins that bind and break the pick (bad character filtering), find an unshielded release lever in the blueprint (JMP ESP gadget), and slide in a custom tension key to trigger the master vault door (shellcode execution).',
    example: {
      normal: 'Normal Buffer: Sending valid protocol string "AUTH admin\\r\\n" (12 bytes, stored securely in stack memory buffer [EBP-1024]).',
      payload: 'Crafted Exploit Buffer: Sending [1040 Bytes Padding] + [0x0804859a JMP ESP Pointer] + [32 Bytes NOP Sled \\x90] + [Encoded Reverse Shellcode \\x31\\xc0\\x50\\x68...]',
      explanation: 'Overwriting the saved Extended Instruction Pointer (EIP) redirects the CPU directly into the stack-injected shellcode, executing arbitrary commands in the context of the running service.'
    },
    mitreAttack: {
      id: 'T1068',
      name: 'Exploitation for Privilege Escalation (Memory Corruption: Stack Overflow)',
      tactic: 'Privilege Escalation',
      url: 'https://attack.mitre.org/techniques/T1068/',
      defense: 'Compile binaries with modern compiler mitigations: enable Address Space Layout Randomization (ASLR), Stack Canaries (-fstack-protector-all), Data Execution Prevention (DEP/NX enabled), Position Independent Executables (-fPIE), and migrate legacy codebases to memory-safe languages.'
    },
    tools: ['gdb', 'checksec', 'msf-pattern_create', 'msf-pattern_offset', 'ropper', 'python3', 'nc', 'nmap', 'cat'],
    solutionFlag: 'FLAG{b0f_st4ck_sm4sh_r0p_g4dg3t_pwn_2026}',
    attackSteps: [
      {
        title: 'Step 1: Network Service Fingerprinting & Port Audit',
        explanation: 'Perform service enumeration on the remote target to identify the listening binary daemon on port 9999.',
        command: 'nmap -p 9999 -sV 10.100.1.10',
        breakdown: [
          { part: 'nmap', meaning: 'Network exploration tool and security scanner.' },
          { part: '-p 9999', meaning: 'Targets the dedicated enterprise custom authentication daemon port.' },
          { part: '-sV', meaning: 'Probes open ports to determine service and version info (vuln_server x86).' }
        ]
      },
      {
        title: 'Step 2: Binary Security Protections Audit (Checksec)',
        explanation: 'Inspect compiled binary ELF headers for missing stack protections (Canary, NX, PIE).',
        command: 'checksec --file=vuln_server',
        breakdown: [
          { part: 'checksec', meaning: 'Audits memory corruption mitigation features on the binary executable.' },
          { part: '--file=vuln_server', meaning: 'Analyzes RELRO, Stack Canaries, NX (No-Execute), and PIE (Position Independent Executable).' }
        ]
      },
      {
        title: 'Step 3: Service Fuzzing & Crash Threshold Discovery',
        explanation: 'Run the Python socket fuzzer sending incremental cyclic buffer lengths to discover the exact crash threshold.',
        command: 'python3 fuzzer.py',
        breakdown: [
          { part: 'python3', meaning: 'Launches the Python 3 socket stress fuzzer.' },
          { part: 'fuzzer.py', meaning: 'Transmits buffers from 100 to 2,000 bytes until triggering a remote SIGSEGV crash at ~1,024 bytes.' }
        ]
      },
      {
        title: 'Step 4: Generate De Bruijn Cyclic Pattern (Pattern Create)',
        explanation: 'Generate a non-repeating 1,500-byte unique De Bruijn sequence to calculate the exact EIP overwrite distance.',
        command: 'msf-pattern_create -l 1500',
        breakdown: [
          { part: 'msf-pattern_create', meaning: 'Metasploit utility to generate unique mathematical cyclic string sequences.' },
          { part: '-l 1500', meaning: 'Specifies length of 1,500 characters to ensure full stack overwriting.' }
        ]
      },
      {
        title: 'Step 5: Calculate Exact EIP Offset in GDB',
        explanation: 'Query the offset of the 4-byte crash register value (0x386f4339) captured in the core dump.',
        command: 'msf-pattern_offset -q 0x386f4339',
        breakdown: [
          { part: 'msf-pattern_offset', meaning: 'Calculates the exact byte offset where EIP register control occurs.' },
          { part: '-q 0x386f4339', meaning: 'The hexadecimal representation of the 4-character ASCII sequence ("9Co8") in EIP.' }
        ]
      },
      {
        title: 'Step 6: Bad Characters Analysis & Memory Filtering',
        explanation: 'Send the byte array (\\x01 through \\xff) to detect memory truncation bytes that would break shellcode execution.',
        command: 'python3 check_badchars.py',
        breakdown: [
          { part: 'python3 check_badchars.py', meaning: 'Injects complete hex character set and compares memory in GDB (x/256bx $esp).' },
          { part: 'Badchars Found', meaning: '\\x00 (Null Byte), \\x0a (Line Feed), \\x0d (Carriage Return), \\x20 (Space).' }
        ]
      },
      {
        title: 'Step 7: Search for Stable JMP ESP / ROP Return Gadget',
        explanation: 'Find an executable gadget address in memory that avoids ASLR randomization and bad characters.',
        command: 'ropper --file vuln_server --search "jmp esp"',
        breakdown: [
          { part: 'ropper', meaning: 'Advanced Return-Oriented Programming (ROP) gadget search engine.' },
          { part: '--search "jmp esp"', meaning: 'Locates opcode \\xff\\xe4 (JMP ESP) instruction in static .text segment (0x0804859a).' }
        ]
      },
      {
        title: 'Step 8: Assemble Exploit Payload & Trigger Stack Overflow',
        explanation: 'Combine padding (1040 bytes) + JMP ESP gadget (0x0804859a) + 32-byte NOP sled + shellcode to spawn root shell.',
        command: 'python3 exploit.py 10.100.1.10 9999',
        breakdown: [
          { part: 'python3 exploit.py', meaning: 'Constructs structured payload: padding + pointer + NOP sled + shellcode.' },
          { part: '10.100.1.10 9999', meaning: 'Connects to remote daemon, smashes stack frame, and drops interactive root shell.' }
        ]
      },
      {
        title: 'Step 9: Extract & Submit Root Memory Flag',
        explanation: 'Read the protected flag from the root directory dumped by your shellcode and submit it in the Flag Verification box above.',
        command: 'cat /root/flag.txt',
        breakdown: [
          { part: 'cat /root/flag.txt', meaning: 'Outputs the captured flag: FLAG{b0f_st4ck_sm4sh_r0p_g4dg3t_pwn_2026}.' }
        ]
      }
    ],
    flagHint: 'Run the complete exploit script in Step 8 to smash the stack and dump the root flag.'
  },

  'apt-sim': {
    title: 'Enterprise Threat Hunting: Memory Volatility, C2 Extraction & YARA Rules',
    difficulty: 'Advanced',
    category: 'Threat Hunting & Blue Team Forensics',
    estimatedTime: '2 Hours (120 Mins)',
    concept: 'Advanced Persistent Threats (APTs) utilize living-off-the-land techniques, process hollowing, memory injection, and encrypted C2 beaconing to establish persistence. In this incident response simulation, you will triage SIEM security alerts, analyze PCAP network captures, inspect raw RAM memory dumps with Volatility 3, carve injected malicious payloads, and author YARA detection rules to expose the adversary.',
    analogy: 'Forensic investigation of a high-tech corporate intrusion: You first inspect the security camera logs (SIEM alert correlation), analyze the radio frequency transmissions (PCAP network packet inspection), take an atomic X-ray of the compromised machine memory at the exact millisecond of the attack (Volatility RAM analysis), spot the impostor process disguised in the crowd (svchost.exe process hollowing), and distribute a biometric fingerprint warrant (YARA signature rule) to neutralize the threat.',
    example: {
      normal: 'Legitimate System Process: svchost.exe running with parent process services.exe from %SystemRoot%\\System32\\.',
      payload: 'Hollowed Malicious Process: svchost.exe (PID 4892) running from C:\\Users\\Public\\ with unlinked thread and PAGE_EXECUTE_READWRITE permissions.',
      explanation: 'Threat actors hollow out legitimate system processes to hide malicious shellcode inside trusted process memory spaces.'
    },
    mitreAttack: {
      id: 'T1055.012',
      name: 'Process Injection: Process Hollowing & Web Protocol C2 Beaconing',
      tactic: 'Defense Evasion, Command and Control',
      url: 'https://attack.mitre.org/techniques/T1055/012/',
      defense: 'Deploy Endpoint Detection and Response (EDR) with kernel-level memory scanning, enforce strict Application Whitelisting (AppLocker/WDAC), monitor anomalous parent-child process relationships, and inspect outbound TLS metadata for regular beaconing intervals.'
    },
    tools: ['volatility3', 'tshark', 'tcpdump', 'yara', 'python3', 'grep', 'strings', 'cat'],
    solutionFlag: 'FLAG{4pt_m3m0ry_f0r3ns1cs_v0l4t1l1ty_hunt3r_2026}',
    attackSteps: [
      {
        title: 'Step 1: Centralized SIEM Threat Alert Triage',
        explanation: 'Filter enterprise Suricata / SIEM audit logs to locate suspicious lateral movement and anomalous parent-child executions.',
        command: 'cat /var/log/suricata/alerts.json | grep -i "lateral"',
        breakdown: [
          { part: 'cat /var/log/suricata/alerts.json', meaning: 'Reads centralized IDS/SIEM alert log event stream.' },
          { part: 'grep -i "lateral"', meaning: 'Isolates high-confidence lateral movement alerts involving unprivileged service accounts.' }
        ]
      },
      {
        title: 'Step 2: Network Packet PCAP Inspection & Beaconing Analysis',
        explanation: 'Analyze raw packet captures with tcpdump to detect periodic beaconing intervals (heartbeats) to suspicious external IPs.',
        command: "tcpdump -r traffic.pcap -nn -A 'tcp port 443' | head -n 30",
        breakdown: [
          { part: 'tcpdump -r traffic.pcap', meaning: 'Reads raw network packet capture file recorded during the breach.' },
          { part: '-nn -A', meaning: 'Disables DNS lookup and outputs packet payload in printable ASCII format.' }
        ]
      },
      {
        title: 'Step 3: Carve Obfuscated C2 HTTP Stream Queries',
        explanation: 'Use tshark to isolate HTTP request URIs and extract base64/XOR-encoded data exfiltration strings.',
        command: 'tshark -r traffic.pcap -Y "http.request" -T fields -e http.request.uri',
        breakdown: [
          { part: 'tshark -r traffic.pcap', meaning: 'Command-line network protocol analyzer.' },
          { part: '-Y "http.request"', meaning: 'Display filter restricting output strictly to HTTP request frames.' },
          { part: '-e http.request.uri', meaning: 'Extracts encoded telemetry query parameters containing staged C2 commands.' }
        ]
      },
      {
        title: 'Step 4: Memory Dump Process Tree Analysis (Volatility 3)',
        explanation: 'Inspect active process hierarchy in raw RAM image memory.vmem to discover unlinked and hollowed processes.',
        command: 'volatility3 -f memory.vmem windows.pstree',
        breakdown: [
          { part: 'volatility3 -f memory.vmem', meaning: 'Launches memory forensics framework against captured RAM snapshot.' },
          { part: 'windows.pstree', meaning: 'Enumerates running process tree and identifies orphaned svchost.exe PID 4892.' }
        ]
      },
      {
        title: 'Step 5: Detect Injected Memory Segments (Malfind)',
        explanation: 'Hunt for memory segments allocated with PAGE_EXECUTE_READWRITE (RWX) permissions harboring injected code.',
        command: 'volatility3 -f memory.vmem windows.malfind --pid 4892',
        breakdown: [
          { part: 'windows.malfind', meaning: 'Scans VAD memory tags for suspicious unmapped executable memory segments.' },
          { part: '--pid 4892', meaning: 'Targets the compromised svchost.exe process hosting injected shellcode.' }
        ]
      },
      {
        title: 'Step 6: Carve Injected Malware Binary from RAM to Disk',
        explanation: 'Extract the raw in-memory malicious PE payload to /tmp/evidence for deep static and signature analysis.',
        command: 'volatility3 -f memory.vmem windows.dumpfiles --pid 4892 --output-dir /tmp/evidence',
        breakdown: [
          { part: 'windows.dumpfiles', meaning: 'Carves out memory mapped executable sections to disk.' },
          { part: '--output-dir /tmp/evidence', meaning: 'Stores extracted memory artifacts in secure evidence staging directory.' }
        ]
      },
      {
        title: 'Step 7: Author & Test Enterprise YARA Detection Rule',
        explanation: 'Validate custom YARA signature rules against the carved malware artifacts to automate enterprise containment.',
        command: 'yara -r apt_lazarus_hunt.yara /tmp/evidence/',
        breakdown: [
          { part: 'yara -r', meaning: 'Pattern matching engine for malware researchers.' },
          { part: 'apt_lazarus_hunt.yara', meaning: 'Custom rule matching binary strings, mutex names, and XOR decryption loops.' }
        ]
      },
      {
        title: 'Step 8: Decrypt C2 Session Stream & Extract Forensic Flag',
        explanation: 'Run the forensic decoder script using the extracted AES key to decrypt the adversary vault and reveal the flag.',
        command: 'python3 decrypt_c2_vault.py /tmp/evidence/injected_4892.bin',
        breakdown: [
          { part: 'python3 decrypt_c2_vault.py', meaning: 'Applies recovered AES-256 session key to decrypt captured exfiltration stream.' },
          { part: 'Discovered Flag', meaning: 'FLAG{4pt_m3m0ry_f0r3ns1cs_v0l4t1l1ty_hunt3r_2026}' }
        ]
      }
    ],
    flagHint: 'Execute Step 8 to decrypt the C2 traffic stream and extract the master threat intelligence flag.'
  },

  'malware-re': {
    title: 'Advanced Malware Reverse Engineering, UPX Unpacking & Anti-Debug Bypass',
    difficulty: 'Advanced',
    category: 'Reverse Engineering & Binary Analysis',
    estimatedTime: '2 Hours (120 Mins)',
    concept: 'Sophisticated malware samples implement multi-layered protections including custom UPX packing, anti-debugging routines (ptrace traps, RDTSC timing checks), XOR-encrypted strings, and dynamic API resolving. In this lab, you will perform binary entropy analysis, unpack protected sections, patch anti-debugging branches in GDB, trace assembly control flow, and reverse custom decryption algorithms to recover the master flag.',
    analogy: 'Defusing an intricate digital puzzle box: The box is locked inside a compressed steel safe (UPX packing). When opened, it contains motion sensors that detonate if an analyst points an X-ray scanner at it (ptrace anti-debugging traps). You must solder a circuit bypass wire across the sensor (GDB opcode patching), decode the scrambled encrypted microchip table (XOR key extraction), and trigger the master unlock code (flag recovery).',
    example: {
      normal: 'Unprotected Binary: Clear ASCII strings and standard function symbols visible in strings and objdump.',
      payload: 'Protected Malware Binary: High entropy (> 7.95), UPX0/UPX1 section headers, encrypted .rodata payload, and ptrace(PTRACE_TRACEME) anti-analysis traps.',
      explanation: 'Static analysis fails on packed binaries until sections are unpacked and anti-debugging routines are dynamically neutralized in a debugger.'
    },
    mitreAttack: {
      id: 'T1027.002',
      name: 'Obfuscated Files or Information: Software Packing & Anti-Debugging (UPX/ptrace)',
      tactic: 'Defense Evasion, Discovery',
      url: 'https://attack.mitre.org/techniques/T1027/002/',
      defense: 'Deploy behavioral sandboxes with hypervisor-level CPU instruction tracing, implement static YARA unpacking rules, and monitor process memory for runtime unpack-and-execute anomalies.'
    },
    tools: ['gdb', 'upx', 'readelf', 'objdump', 'binwalk', 'sha256sum', 'strings', 'python3', 'cat'],
    solutionFlag: 'FLAG{m4lw4r3_r3v3rs1ng_upx_d3p4ck_ptf_2026}',
    attackSteps: [
      {
        title: 'Step 1: Cryptographic Triage & Binary Headers Identification',
        explanation: 'Compute SHA-256 integrity hash and inspect the 64-bit ELF binary architecture.',
        command: 'sha256sum suspicious_sample.bin && file suspicious_sample.bin',
        breakdown: [
          { part: 'sha256sum', meaning: 'Generates unique cryptographic fingerprint of the malware sample.' },
          { part: 'file', meaning: 'Identifies file format, architecture (x86_64), linking (dynamically linked), and stripping status.' }
        ]
      },
      {
        title: 'Step 2: Binary Section Entropy & Packing Detection (Binwalk)',
        explanation: 'Perform entropy graph analysis to identify high-density compressed and encrypted sections.',
        command: 'binwalk -E suspicious_sample.bin',
        breakdown: [
          { part: 'binwalk -E', meaning: 'Calculates block entropy across all binary sections.' },
          { part: 'Entropy Result', meaning: 'Spike to 7.98 indicates heavily packed payload data with UPX compressor.' }
        ]
      },
      {
        title: 'Step 3: Manual UPX Section Decompression & Rebuilding',
        explanation: 'Decompress the packed ELF sections and reconstruct the executable file headers.',
        command: 'upx -d -o unpacked_sample.bin suspicious_sample.bin',
        breakdown: [
          { part: 'upx -d', meaning: 'Decompresses the packed binary sections in place.' },
          { part: '-o unpacked_sample.bin', meaning: 'Outputs clean, fully readable ELF binary with restored symbol tables.' }
        ]
      },
      {
        title: 'Step 4: Verify Reconstructed ELF Section Headers (Readelf)',
        explanation: 'Inspect the rebuilt section header table (.text, .rodata, .data, .bss).',
        command: 'readelf -S unpacked_sample.bin',
        breakdown: [
          { part: 'readelf -S', meaning: 'Displays detailed section headers, memory offsets, and execution flags (AX = Alloc Exec).' }
        ]
      },
      {
        title: 'Step 5: Disassemble Core Entrypoint & Control Flow Graph',
        explanation: 'Disassemble the main() function using Intel syntax to trace logic flow and call destinations.',
        command: 'objdump -d -M intel unpacked_sample.bin | grep -A 35 "main:"',
        breakdown: [
          { part: 'objdump -d -M intel', meaning: 'Disassembles executable sections into clean Intel assembly mnemonics.' },
          { part: 'grep -A 35 "main:"', meaning: 'Displays the first 35 instructions of main, revealing the check_debugger() call.' }
        ]
      },
      {
        title: 'Step 6: Trace Anti-Debugging Traps in GDB',
        explanation: 'Examine the check_debugger subroutine to locate the ptrace(PTRACE_TRACEME) anti-analysis trap.',
        command: 'gdb -q ./unpacked_sample.bin -ex "disas check_debugger" -ex "quit"',
        breakdown: [
          { part: 'gdb -q', meaning: 'Launches GNU Debugger in quiet mode.' },
          { part: 'disas check_debugger', meaning: 'Disassembles anti-debugging routine showing TEST EAX, EAX followed by JNE abort.' }
        ]
      },
      {
        title: 'Step 7: Dynamic Binary Patching of Anti-Debug Branch in GDB',
        explanation: 'Patch the conditional jump (0x75 JNE) to NOP (0x90) in GDB to bypass the debugger detection check.',
        command: 'gdb -q ./unpacked_sample.bin -ex "break check_debugger" -ex "run" -ex "set *(unsigned char*)0x080486a4 = 0x90" -ex "continue" -ex "quit"',
        breakdown: [
          { part: 'break & run', meaning: 'Halts process execution right before anti-debug condition check.' },
          { part: 'set *(unsigned char*)0x080486a4 = 0x90', meaning: 'Overwrites conditional jump opcode with NOP instruction in memory.' }
        ]
      },
      {
        title: 'Step 8: Extract XOR Decryption Key Table from Memory',
        explanation: 'Inspect .rodata memory address to extract the 4-byte rolling XOR decryption key.',
        command: 'cat /root/labs/malware-re/key_table.hex',
        breakdown: [
          { part: 'cat key_table.hex', meaning: 'Outputs the extracted runtime memory key table: 0x5a4f3c89.' }
        ]
      },
      {
        title: 'Step 9: Execute Payload Decryption & Recover Master Flag',
        explanation: 'Run the custom payload decryptor script using the recovered XOR key table to disclose the flag.',
        command: 'python3 decrypt_payload.py 0x5a4f3c89',
        breakdown: [
          { part: 'python3 decrypt_payload.py', meaning: 'Executes the reversed multi-byte XOR decryption loop against the ciphertext buffer.' },
          { part: 'Master Flag', meaning: 'FLAG{m4lw4r3_r3v3rs1ng_upx_d3p4ck_ptf_2026}' }
        ]
      }
    ],
    flagHint: 'Execute Step 9 with the XOR key table to decrypt the hidden memory buffer and reveal the master flag.'
  }
};


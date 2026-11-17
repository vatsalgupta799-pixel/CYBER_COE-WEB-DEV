import { BookOpen, PlayCircle, FileText } from 'lucide-react';

export const studentResources = [
  { 
    id: 1, 
    title: 'Getting Started Roadmap', 
    desc: 'Prerequisites roadmap, technical skills, soft skills, certifications, and practice platforms for beginners.', 
    icon: BookOpen, 
    link: '/student-resources/getting-started',
    content: "### Getting Started with Cybersecurity\nFollow our comprehensive prerequisite roadmap covering Operating Systems, Networking, Programming, Virtualization, AI, Security Fundamentals, and Hands-on CTF Practice."
  },
  { 
    id: 2, 
    title: 'Security Tools', 
    desc: 'Top 25 Kali Linux tools reference guide — install instructions, step-by-step usage, live examples, and pro tips.', 
    icon: PlayCircle, 
    link: '/student-resources/security-tools',
    content: "### Top 25 Kali Linux Tools Reference Guide\nExplore comprehensive references, install commands, step-by-step usage, and terminal outputs for the top 25 essential Kali Linux security tools."
  },
  { 
    id: 3, 
    title: 'VAPT Documentation', 
    desc: 'Sample penetration testing report, methodology lifecycle, CVSS scoring, and technical findings guide in PDF and interactive format.', 
    icon: FileText, 
    link: '/student-resources/vapt-documentation',
    content: "### VAPT Reporting & Penetration Testing Templates\nExplore the complete industry-standard sample penetration testing report, CVSS vulnerability ratings, PoC demonstrations, and downloadable PDF."
  },
];

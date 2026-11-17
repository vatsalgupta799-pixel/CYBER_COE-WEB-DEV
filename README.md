# Centre for Cybersecurity (Cyber COE) Website

Official portal for the **Centre for Cybersecurity (Cyber COE)**, showcasing research initiatives, publications, cybersecurity laboratories, student learning resources, projects, and department activities.

---

## 🚀 Key Features

- **Next.js 16 App Router**: Server-rendered and client-rendered high-performance application with responsive UI.
- **Interactive Cyber Visuals**: Custom Canvas Data-Dust particles, Radar grid overlays, and Three.js 3D visualization.
- **Enterprise Security**:
  - **Local HTTPS**: Self-signed local SSL certificate generation for development.
  - **Strict Content Security Policy (CSP)**: Non-permissive directives protecting against XSS, clickjacking, and injection.
  - **Anti-CSRF Protection**: Cryptographic HMAC-signed tokens for state-changing endpoints.
  - **Rate Limiting**: Sliding-window IP-based protection on sensitive routes.
  - **Parameterized Queries**: Strict NoSQL injection sanitization.
- **Interactive Resources**: VAPT guides, downloadable research publications, OSINT manuals, and security tools showcase.

---

## 📁 Repository Structure

```
cyber-coe-website/
├── .env.example              # Template environment configuration (no secrets)
├── .gitignore                # Comprehensive Git ignore rules (secrets, SSL, build)
├── eslint.config.mjs         # ESLint 9 configuration
├── jsconfig.json             # Path alias mappings (@/* -> src/*)
├── next.config.mjs           # Next.js security headers, allowed origins & CSP
├── package.json              # Project scripts and dependencies
├── README.md                 # Project documentation
│
├── certificates/             # Local development SSL certificates (git-ignored)
│   ├── localhost.pem
│   └── localhost-key.pem
│
├── public/                   # Static public assets (images, icons, sample PDFs)
│   ├── images/
│   │   ├── partners/         # Academic & industry partner logos
│   │   └── hod-*.png
│   └── *.pdf                 # Research & learning guides
│
├── scripts/                  # Project maintenance and utility scripts
│   ├── generate-ssl.ps1      # PowerShell SSL certificate generator
│   ├── generate-vapt-pdf.py  # Sample VAPT report generator
│   └── seed.js               # Database seeding script
│
└── src/
    ├── app/                  # Next.js App Router pages and API routes
    │   ├── (auth)/           # Authentication pages (login, signup, reset)
    │   ├── about/            # About Cyber COE, vision, and team
    │   ├── admin/            # Secure administration dashboard
    │   ├── api/              # Secure backend REST API endpoints
    │   ├── hall-of-fame/     # Student achievements and awards
    │   ├── laboratories/     # Virtual and physical lab infrastructure
    │   ├── projects/         # Featured research and engineering projects
    │   ├── publications/     # Peer-reviewed journal papers and manuscripts
    │   ├── research/         # Research focus areas and thrust topics
    │   ├── student-resources/# Student tools, VAPT documentation, and guides
    │   ├── globals.css       # Core typography, themes, and CSS utilities
    │   ├── layout.js         # Root layout with ThemeProvider and Navbar/Footer
    │   └── page.js           # Interactive Cyber COE landing homepage
    │
    ├── components/           # Reusable UI components
    │   ├── DataDustBackground.js
    │   ├── DynamicHeroBackground.js
    │   ├── Footer.js
    │   ├── Navbar.js
    │   ├── RadarBackground.js
    │   └── ThemeProvider.js
    │
    ├── data/                 # Static data sources (labs, members, partners, projects)
    │   ├── hallOfFameData.js
    │   ├── labsData.js
    │   ├── membersData.js
    │   ├── partnersData.js
    │   ├── projectsData.js
    │   └── resourcesData.js
    │
    ├── hooks/                # Custom React hooks (useScrollReveal)
    ├── lib/                  # Shared utilities (auth, CSRF, DB, rate-limiting, sanitization)
    ├── models/               # Mongoose schemas (User, Manuscript, News, Project, etc.)
    └── proxy.js              # Next.js 16 request interceptor for CORS and security headers
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: v20+ recommended
- **MongoDB**: v6+ (optional for read-only pages, required for authentication and dynamic admin data)

### 2. Installation
```bash
git clone <your-repository-url>
cd cyber-coe-website
npm install
```

### 3. Environment Setup
Create a local environment file by copying the template:
```bash
cp .env.example .env.local
```
Update `.env.local` with your own local database URI and strong random 256-bit secrets for `JWT_SECRET` and `CSRF_SECRET`.

> [!WARNING]
> Never commit `.env` or `.env.local` to version control. They are strictly excluded in `.gitignore`.

### 4. Generate SSL Certificates (for HTTPS development)
```bash
npm run ssl:generate
```
This generates `certificates/localhost.pem` and `certificates/localhost-key.pem`.

---

## 💻 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server over **HTTPS** on `https://localhost:3000` |
| `npm run dev:http` | Starts the development server over standard HTTP |
| `npm run ssl:generate` | Generates self-signed SSL certificate and private key |
| `npm run seed` | Seeds initial admin user and sample data into MongoDB |
| `npm run build` | Compiles the production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint checks |

---

## 🔒 Security Best Practices

1. **No Sensitive Data in Git**:
   - Private keys (`*.pem`, `*.key`), certificates, database credentials, and `.env*` files are ignored by `.gitignore`.
2. **Environment Variable Enforced**:
   - Production secrets (`JWT_SECRET`, `CSRF_SECRET`, `MONGODB_URI`) are strictly loaded from environment variables without hardcoded fallbacks.
3. **Content Security Policy**:
   - Nonce-ready script/style limits, frame sandboxing (`frame-ancestors 'self'`), and strict transport security (HSTS) headers enabled.

---

## 📄 License
MIT License. All rights reserved by Centre for Cybersecurity (Cyber COE).

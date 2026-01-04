<div align="center">
  <img src="public/favicon.svg" alt="Supabase Keeper" width="120" height="120" />

  <h1>🚀 Supabase Keeper</h1>

  <p><strong>Keep your Supabase projects alive and healthy with automated monitoring</strong></p>

  <p>
    <a href="#-why-supabase-keeper"><img src="https://img.shields.io/badge/Status-Active-success.svg" alt="Status" /></a>
    <a href="https://github.com/AayushPaigwar/supabase-keeper/stargazers"><img src="https://img.shields.io/github/stars/AayushPaigwar/supabase-keeper" alt="GitHub Stars" /></a>
    <a href="https://github.com/AayushPaigwar/supabase-keeper/network/members"><img src="https://img.shields.io/github/forks/AayushPaigwar/supabase-keeper" alt="GitHub Forks" /></a>
    <a href="https://github.com/AayushPaigwar/supabase-keeper/issues"><img src="https://img.shields.io/github/issues/AayushPaigwar/supabase-keeper" alt="GitHub Issues" /></a>
    <a href="https://github.com/AayushPaigwar/supabase-keeper/pulls"><img src="https://img.shields.io/github/issues-pr/AayushPaigwar/supabase-keeper" alt="GitHub Pull Requests" /></a>
    <a href="https://github.com/AayushPaigwar/supabase-keeper/actions"><img src="https://img.shields.io/github/actions/workflow/status/AayushPaigwar/supabase-keeper/ci.yml" alt="CI Status" /></a>
    <a href="https://github.com/AayushPaigwar/supabase-keeper/blob/master/LICENSE"><img src="https://img.shields.io/github/license/AayushPaigwar/supabase-keeper" alt="License" /></a>
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-why-supabase-keeper">Why Supabase Keeper?</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-contributing">Contributing</a> •
    <a href="#-license">License</a>
  </p>
</div>

---

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based login/signup with email verification
- 📊 **Dashboard Management** - Add, monitor, and manage multiple Supabase projects
- ⏰ **Automated Monitoring** - Scheduled cron jobs to keep projects active
- 🔍 **Health Checks** - Real-time verification of Supabase connections
- 🎨 **Modern UI** - Clean, responsive interface with dark theme support
- 🚀 **Production Ready** - Optimized for deployment with proper error handling

## 🤔 Why Supabase Keeper?

Supabase projects on free tiers can go to sleep after periods of inactivity, causing:

- **Slow cold starts** when users access your app
- **API timeouts** and poor user experience
- **Unreliable services** during peak usage

**Supabase Keeper solves this by:**

- 🏃‍♂️ **Keeping projects warm** with regular automated pings
- 📈 **Monitoring health** of all your Supabase instances
- ⚡ **Ensuring fast response times** for your users
- 💰 **Maximizing free tier benefits** without manual intervention
- 🔧 **Centralized management** of multiple projects from one dashboard

## 🛠 Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 16, React, TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL (Neon), Supabase |
| **Authentication** | JWT, bcryptjs |
| **Deployment** | Vercel, GitHub Actions |
| **Monitoring** | Automated health checks |

</div>

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/AayushPaigwar/supabase-keeper.git
cd supabase-keeper

# Follow setup instructions
```

📖 **[Complete Setup Guide → CONTRIBUTING.md](CONTRIBUTING.md)**

## 📁 Project Structure

```
supabase-keeper/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard
│   ├── login/            # Authentication pages
│   └── globals.css       # Global styles
├── lib/                   # Utility functions
├── prisma/               # Database schema
├── public/               # Static assets
└── scripts/              # Utility scripts
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed setup instructions and contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for Developers by Developer**

<a href="https://github.com/AayushPaigwar">GitHub</a> •
<a href="https://twitter.com/AayushPaigwar">Twitter</a> •
<a href="https://linkedin.com/in/AayushPaigwar">LinkedIn</a>

</div>

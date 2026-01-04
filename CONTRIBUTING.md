# 🤝 Contributing to Supabase Keeper

Thank you for your interest in contributing to Supabase Keeper! This guide will help you get started with setting up the development environment and contributing to the project.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **PostgreSQL** database (we recommend [Neon](https://neon.tech) for cloud hosting)

## 🚀 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AayushPaigwar/supabase-keeper.git
cd supabase-keeper
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-here"

# Optional: For production seeding
NODE_ENV=development
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

### 5. Seed the Database (Optional)

For development, you can seed the database with test data:

```bash
# Verify existing Supabase connections
node scripts/seed.js
```

### 6. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🏗 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
supabase-keeper/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── supabase/     # Supabase management endpoints
│   │   └── cron/         # Cron job endpoints
│   ├── dashboard/        # Main dashboard page
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── lib/                  # Utility functions
├── prisma/              # Database schema and migrations
├── public/              # Static assets (favicon, etc.)
├── scripts/             # Utility scripts
│   └── seed.js         # Database seeding script
└── middleware.ts       # Next.js middleware
```

## 🔧 Development Guidelines

### Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Git Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m "Add: your feature description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

### Commit Messages

Follow conventional commit format:

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

### API Design

- Use RESTful conventions
- Include proper error handling
- Add input validation
- Document API endpoints

## 🐛 Reporting Issues

When reporting bugs, please include:

- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Environment** (OS, Node.js version, browser)
- **Screenshots** if applicable

## 💡 Feature Requests

We welcome feature requests! Please:

- Check if the feature already exists
- Describe the use case clearly
- Explain why it would be valuable
- Consider implementation complexity

## 📞 Support

If you need help:

- 📖 Check the [README.md](README.md) for general information
- 🐛 Create an [issue](https://github.com/AayushPaigwar/supabase-keeper/issues) for bugs

## 📜 License

By contributing to Supabase Keeper, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Happy coding! 🎉**

</div>

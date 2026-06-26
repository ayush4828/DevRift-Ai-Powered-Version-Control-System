<p align="center">
  <img src="https://img.shields.io/badge/DevRift-AI%20Powered%20VCS-7c3aed?style=for-the-badge&logo=git&logoColor=white" alt="DevRift Badge" />
  <img src="https://img.shields.io/npm/v/devrift?style=for-the-badge&color=22c55e&logo=npm" alt="npm version" />
  <img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-18+-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React" />
</p>

<h1 align="center">🚀 DevRift — AI-Powered Version Control System</h1>

<p align="center">
  <strong>A full-stack developer collaboration platform with a custom CLI, real-time sync, and AI-powered insights.</strong>
</p>

<p align="center">
  <a href="https://www.devrift.in">🌐 Live Demo</a> •
  <a href="https://www.npmjs.com/package/devrift">📦 npm Package</a> •
  <a href="#-getting-started">🚀 Getting Started</a> •
  <a href="#-api-reference">📡 API Reference</a>
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [CLI Usage](#-cli-usage)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**DevRift** is a production-grade, AI-powered version control and developer collaboration platform built from scratch. It provides a **GitHub-like experience** with a custom CLI tool, real-time WebSocket-powered updates, and AI-driven features powered by Google's Gemini 2.5 Flash model.

Unlike traditional VCS tools, DevRift integrates artificial intelligence directly into the version control workflow — enabling developers to auto-generate READMEs, analyze repository health, explain codebases in plain English, and generate professional resumes from their coding activity.

### ✨ What Makes DevRift Different?

| Feature | GitHub | GitLab | DevRift |
|---------|--------|--------|---------|
| Custom CLI | ❌ | ❌ | ✅ `npm i -g devrift` |
| AI Code Explainer | ❌ | ❌ | ✅ Gemini AI |
| AI Health Analyzer | ❌ | ❌ | ✅ Score 0–100 |
| AI Resume Generator | ❌ | ❌ | ✅ From activity |
| AI README Generator | ❌ | ❌ | ✅ One-click |
| Real-time Push Alerts | Limited | Limited | ✅ WebSocket |
| OAuth (GitHub + Google) | ✅ | ✅ | ✅ |

---

## 🏗 Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│                                                                     │
│  ┌──────────────────┐          ┌──────────────────────────────┐     │
│  │   DevRift CLI    │          │     React SPA (Vite)         │     │
│  │  (npm package)   │          │    https://devrift.in        │     │
│  │                  │          │                              │     │
│  │  • devrift init  │          │  • Dashboard    • Profile    │     │
│  │  • devrift add   │          │  • Repo Viewer  • AI Tools   │     │
│  │  • devrift commit│          │  • Issue Tracker • Explorer  │     │
│  │  • devrift push  │          │  • File Browser  • Settings  │     │
│  │  • devrift pull  │          │  • Notifications • Heatmap   │     │
│  │  • devrift revert│          │                              │     │
│  └────────┬─────────┘          └──────────────┬───────────────┘     │
│           │ HTTP/REST                         │ HTTP + WebSocket    │
└───────────┼───────────────────────────────────┼─────────────────────┘
            │                                   │
            ▼                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       API / SERVER LAYER                            │
│                    Node.js + Express (EC2)                          │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ Auth Module  │  │  Repo Module │  │    AI Module             │  │
│  │              │  │              │  │                          │  │
│  │ • JWT Auth   │  │ • CRUD Repos │  │ • Repo Explainer        │  │
│  │ • GitHub     │  │ • Push/Pull  │  │ • Health Analyzer       │  │
│  │   OAuth 2.0  │  │ • Commits    │  │ • Resume Generator      │  │
│  │ • Google     │  │ • Stars      │  │ • README Generator      │  │
│  │   OAuth 2.0  │  │ • Visibility │  │                          │  │
│  │ • Email      │  │ • File Serve │  │ Powered by Gemini 2.5   │  │
│  │   Verify     │  │              │  │ Flash                   │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ User Module  │  │ Issue Module │  │  Real-time Module        │  │
│  │              │  │              │  │                          │  │
│  │ • Profiles   │  │ • Create     │  │ • Socket.IO Server      │  │
│  │ • Follow     │  │ • Update     │  │ • Push Notifications    │  │
│  │ • Unfollow   │  │ • Close      │  │ • Room-based Events     │  │
│  │ • Avatar     │  │ • Delete     │  │ • Live Commit Alerts    │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────┐                          │
│  │         Middleware Layer             │                          │
│  │  • JWT Authentication               │                          │
│  │  • Authorization Guards             │                          │
│  │  • Multer (File Upload)             │                          │
│  │  • CORS Policy                      │                          │
│  └──────────────────────────────────────┘                          │
└──────────┬────────────────────────────┬─────────────────────────────┘
           │                            │
           ▼                            ▼
┌─────────────────────┐    ┌──────────────────────────┐
│   MongoDB Atlas      │    │     AWS S3 Bucket         │
│                      │    │    (eu-north-1)           │
│  Collections:        │    │                          │
│  • users             │    │  commits/                │
│  • repositories      │    │  └── {repoId}/           │
│  • issues            │    │      └── {commitId}/     │
│  • notifications     │    │          ├── file1.js    │
│                      │    │          ├── file2.jsx   │
│                      │    │          └── commit.json │
└─────────────────────┘    └──────────────────────────┘
```

### CLI Push/Pull Workflow

```
Developer Machine                    DevRift Server                   AWS S3
      │                                   │                              │
      │  devrift init <repoId>            │                              │
      │──────────────────────────────────►│                              │
      │  Creates .devRift/ directory      │                              │
      │                                   │                              │
      │  devrift add .                    │                              │
      │  (stages files locally)           │                              │
      │                                   │                              │
      │  devrift commit "message"         │                              │
      │  (creates commit snapshot)        │                              │
      │                                   │                              │
      │  devrift push                     │                              │
      │──────────────────────────────────►│                              │
      │  POST /repo/push/:repoId         │  Upload files to S3          │
      │  (multipart form data)           │─────────────────────────────►│
      │                                   │                              │
      │                                   │  Emit "repoUpdated" via      │
      │                                   │  Socket.IO to all clients    │
      │                                   │                              │
      │  devrift pull                     │                              │
      │──────────────────────────────────►│                              │
      │  GET /repo/:repoId               │  Download files from S3      │
      │                                   │◄─────────────────────────────│
      │  Sync commits + files locally     │                              │
      │◄──────────────────────────────────│                              │
      │                                   │                              │
      │  devrift revert <commitId>        │                              │
      │  (restore local files)            │                              │
```

### Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────────┐     ┌──────────┐
│  Client  │     │  Server  │     │ GitHub/Google │     │ MongoDB  │
└────┬─────┘     └────┬─────┘     └──────┬───────┘     └────┬─────┘
     │                │                   │                   │
     │ ── Email/Password Login ──────────►│                   │
     │                │  Verify bcrypt    │                   │
     │                │──────────────────────────────────────►│
     │                │  Find/Create User │                   │
     │◄───────────────│  Return JWT Token │                   │
     │                │                   │                   │
     │ ── OR ──       │                   │                   │
     │                │                   │                   │
     │ ── OAuth Redirect ───────────────►│                   │
     │                │                   │                   │
     │                │◄─── Auth Code ────│                   │
     │                │                   │                   │
     │                │── Exchange Token ►│                   │
     │                │◄── Access Token ──│                   │
     │                │                   │                   │
     │                │── Fetch Profile ─►│                   │
     │                │◄── User Info ─────│                   │
     │                │                   │                   │
     │                │── Upsert User ──────────────────────►│
     │                │                   │                   │
     │◄── Redirect ───│                   │                   │
     │    with JWT    │                   │                   │
```

### AI Pipeline Architecture

```
┌────────────┐     ┌──────────────────┐     ┌───────────────────┐
│  Frontend  │     │   AI Controller  │     │  Google Gemini    │
│  Request   │────►│                  │────►│  2.5 Flash API    │
│            │     │  • Fetch repo    │     │                   │
│            │     │  • Build context │     │  • Analyze code   │
│            │     │  • Construct     │     │  • Generate text  │
│            │     │    prompt        │     │  • Score health   │
│            │     │                  │     │                   │
│  Response  │◄────│  • Parse result  │◄────│  • Return MD      │
│  (Markdown)│     │  • Return JSON   │     │    formatted      │
└────────────┘     └──────────────────┘     └───────────────────┘

AI Features:
┌──────────────────┬──────────────────────────────────────────────┐
│ Repo Explainer   │ Analyzes commits, files, issues → plain     │
│                  │ English explanation of the project           │
├──────────────────┼──────────────────────────────────────────────┤
│ Health Analyzer  │ Scores 0-100 based on commit frequency,     │
│                  │ issue resolution rate, activity patterns     │
├──────────────────┼──────────────────────────────────────────────┤
│ Resume Generator │ Aggregates all repos, commits, tech stack   │
│                  │ → professional developer resume (Markdown)  │
├──────────────────┼──────────────────────────────────────────────┤
│ README Generator │ Detects tech stack from file extensions,    │
│                  │ generates comprehensive README.md           │
└──────────────────┴──────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI framework |
| **Vite** | Lightning-fast build tool & dev server |
| **React Router v6** | Client-side routing & navigation |
| **Socket.IO Client** | Real-time WebSocket communication |
| **Axios** | HTTP client for API requests |
| **React Hot Toast** | Toast notification system |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express 5** | Web framework for REST APIs |
| **Mongoose** | MongoDB ODM for data modeling |
| **Socket.IO** | Real-time bidirectional communication |
| **JWT** | Token-based authentication |
| **bcryptjs** | Password hashing & verification |
| **Multer** | Multipart file upload handling |
| **Nodemailer** | Email verification system |
| **Yargs** | CLI argument parsing & command handling |

### Cloud & Infrastructure
| Technology | Purpose |
|------------|---------|
| **AWS EC2** | Backend server hosting |
| **AWS S3** | Source code file storage |
| **MongoDB Atlas** | Managed database cluster |
| **Google Gemini 2.5 Flash** | AI-powered analysis & generation |
| **GitHub OAuth 2.0** | Social authentication |
| **Google OAuth 2.0** | Social authentication |

---

## ✨ Features

### 🖥 Custom CLI Tool (`npm i -g devrift`)

A fully-featured command-line interface published on npm for managing repositories directly from the terminal.

```bash
devrift init <repoId>          # Initialize and link to a DevRift repository
devrift login --email --password  # Authenticate with your DevRift account
devrift add <file|.>           # Stage files for commit
devrift commit "message"       # Create a commit snapshot
devrift push                   # Push commits to DevRift cloud
devrift pull                   # Pull latest changes from remote
devrift revert <commitId>      # Revert to a specific commit
```

**Key behaviors:**
- Conflict detection — warns if remote has unpushed commits before allowing push
- Incremental push — only pushes unpushed commits, not the entire history
- Local `.devRift/` directory stores config, staging area, and commit history

### 🤖 AI-Powered Insights (Gemini 2.5 Flash)

| Feature | Description |
|---------|-------------|
| **Repo Explainer** | Analyzes your codebase and explains what the project does in plain English |
| **Health Analyzer** | Provides a health score (0–100) with grades (A/B/C/D/F) based on commit frequency, issue resolution, and activity |
| **Resume Generator** | Auto-generates a professional developer resume from your DevRift activity, repos, and tech stack |
| **README Generator** | One-click professional `README.md` generation based on files, commits, and project context |

### ⚡ Real-time Collaboration

- **WebSocket-powered live updates** via Socket.IO
- Instant push notifications when new commits arrive
- Room-based architecture — each user joins their own room for targeted events
- Visual "LIVE" indicator and animated commit alerts on the repo page

### 🔐 Authentication & Security

- **Email/Password** with bcrypt hashing
- **GitHub OAuth 2.0** integration
- **Google OAuth 2.0** integration
- **Email verification** with OTP codes via Nodemailer
- **JWT tokens** with 7-day expiration
- Protected routes with auth middleware
- Owner-based authorization for repo/issue management

### 📁 Repository Management

- Create, update, delete repositories
- Public/Private visibility toggle
- ⭐ Star system with animated burst particle effects
- File tree explorer with syntax-highlighted code viewer
- Commit history with expandable file diffs
- S3-backed file storage for all pushed code

### 🐛 Issue Tracker

- Create, edit, close, and delete issues
- Open/Closed status management
- Owner-only authorization for modifications
- Cross-user notifications when issues are opened on your repos

### 👤 User Profiles

- Customizable username and avatar
- Follow/Unfollow system with follower counts
- Contribution heatmap (GitHub-style)
- Recent activity timeline (commits, issues, repo creation)
- Account deletion with full cascade cleanup

### 🔔 Notification System

- Real-time push notifications via Socket.IO
- Types: `follow`, `star`, `issue`, `system`
- Read/Unread state management
- Notification bell with badge counter

---

## 📂 Project Structure

```
DevRift/
├── backend/                        # Node.js + Express server & CLI
│   ├── index.js                    # Entry point — CLI commands + Express server
│   ├── package.json                # npm package config (published as 'devrift')
│   │
│   ├── config/
│   │   └── aws-config.js           # AWS S3 client configuration
│   │
│   ├── controllers/
│   │   ├── authController.js       # GitHub & Google OAuth handlers
│   │   ├── userController.js       # User CRUD, follow, email verify
│   │   ├── repoController.js       # Repository CRUD, stars, visibility
│   │   ├── pushController.js       # Server-side push handler (S3 upload)
│   │   ├── issueController.js      # Issue CRUD with notifications
│   │   ├── aiController.js         # AI features (Gemini integration)
│   │   ├── notificationController.js # Notification management
│   │   ├── init.js                 # CLI: devrift init
│   │   ├── add.js                  # CLI: devrift add
│   │   ├── commit.js               # CLI: devrift commit
│   │   ├── push.js                 # CLI: devrift push
│   │   ├── pull.js                 # CLI: devrift pull
│   │   ├── revert.js               # CLI: devrift revert
│   │   └── loginCLI.js             # CLI: devrift login
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification middleware
│   │   └── authorizeMiddleware.js  # Role-based authorization
│   │
│   ├── model/
│   │   ├── userModel.js            # User schema with cascade delete
│   │   ├── repoModel.js            # Repository + Commit + File schemas
│   │   ├── issueModel.js           # Issue schema with repo reference
│   │   └── notificationModel.js    # Notification schema
│   │
│   └── routes/
│       ├── main.router.js          # Root router (aggregates all routes)
│       ├── auth.router.js          # OAuth routes
│       ├── user.router.js          # User management routes
│       ├── repo.router.js          # Repository + push + file routes
│       ├── issue.router.js         # Issue management routes
│       ├── ai.router.js            # AI feature routes
│       └── notification.router.js  # Notification routes
│
└── frontend/                       # React SPA (Vite)
    └── src/
        ├── main.jsx                # App entry point
        ├── App.jsx                 # Root component
        ├── Routes.jsx              # Route definitions
        ├── authContext.jsx         # Authentication context provider
        ├── index.css               # Global styles & design system
        ├── App.css                 # App-level styles
        │
        └── components/
            ├── auth/
            │   ├── Login.jsx       # Login page (Email + OAuth)
            │   ├── Signup.jsx      # Registration page
            │   ├── VerifyEmail.jsx  # OTP email verification
            │   ├── ChangePassword.jsx # Password change flow
            │   └── AuthSuccess.jsx # OAuth callback handler
            │
            ├── dashboard/
            │   ├── Dashboard.jsx   # Main dashboard (public repos feed)
            │   └── MyRepositories.jsx # User's own repos list
            │
            ├── repo/
            │   ├── RepoPage.jsx    # Full repository view (1000+ lines)
            │   ├── CreateRepoModal.jsx # Repository creation modal
            │   ├── FileViewer.jsx  # Syntax-highlighted code viewer
            │   └── *.css           # Repository-specific styles
            │
            ├── ai/
            │   ├── ResumePage.jsx   # AI resume generator page
            │   └── MarkdownRenderer.jsx # Markdown-to-HTML renderer
            │
            ├── user/
            │   ├── Profile.jsx     # User profile page
            │   ├── ExploreUsers.jsx # Discover other developers
            │   └── HeatMapProfile.jsx # Contribution heatmap
            │
            └── layout/
                ├── Layout.jsx      # Shared layout wrapper
                ├── Navbar.jsx      # Navigation bar
                ├── NotificationBell.jsx # Real-time notification bell
                ├── ConfirmModal.jsx # Reusable confirmation dialog
                ├── PageTransition.jsx # Route transition animations
                ├── NotFound.jsx    # 404 page
                ├── Status.jsx      # System status page
                ├── Privacy.jsx     # Privacy policy
                └── Terms.jsx       # Terms of service
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (Atlas recommended)
- **AWS Account** (S3 bucket configured)
- **Google Gemini API Key**
- **GitHub OAuth App** (optional, for OAuth login)
- **Google OAuth App** (optional, for OAuth login)

### 1. Clone the Repository

```bash
git clone https://github.com/ayush4828/DevRift-Ai-Powered-Version-Control-System.git
cd DevRift-Ai-Powered-Version-Control-System
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=3000
API_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devrift

# Authentication
JWT_SECRET_KEY=your_jwt_secret_key_here

# AWS S3
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
S3_BUCKET=your-s3-bucket-name

# AI
GEMINI_API_KEY=your_gemini_api_key

# OAuth (Optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Verification
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. CLI Setup (For Development)

```bash
cd backend
npm link
```

Now you can use `devrift` commands globally on your machine.

---

## 💻 CLI Usage

### Install Globally

```bash
npm install -g devrift
```

### Quick Start

```bash
# 1. Initialize in your project directory (creates .devRift/ config)
devrift init <repoId>

# 2. Authenticate (saves token to .devRift/config.json)
devrift login --email your@email.com --password yourpassword

# 3. Stage files
devrift add .

# 4. Create a commit
devrift commit "Initial commit"

# 5. Push to DevRift
devrift push

# 6. Pull latest changes
devrift pull

# 7. Revert to a specific commit
devrift revert <commitId>
```

> **Note:** `devrift init` must be run before `devrift login`, as login saves credentials to the `.devRift/config.json` file created by init.

### How It Works Locally

When you run `devrift init`, it creates a `.devRift/` directory:

```
your-project/
├── .devRift/
│   ├── config.json       # repoId, token, serverUrl, pushedCommits
│   ├── staging/          # Files staged via `devrift add`
│   └── commits/          # Local commit snapshots
│       ├── <commitId1>/
│       │   ├── commit.json
│       │   └── ...files
│       └── <commitId2>/
│           └── ...
└── your-project-files...
```

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/signup` | ❌ | Register new user |
| `POST` | `/login` | ❌ | Login with email/password |
| `POST` | `/verify-email` | ❌ | Verify email with OTP |
| `POST` | `/resend-verification` | ❌ | Resend verification code |
| `POST` | `/change-password` | ❌ | Change user password |
| `GET` | `/auth/github` | ❌ | Initiate GitHub OAuth |
| `GET` | `/auth/github/callback` | ❌ | GitHub OAuth callback |
| `GET` | `/auth/google` | ❌ | Initiate Google OAuth |
| `GET` | `/auth/google/callback` | ❌ | Google OAuth callback |

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/allusers` | ❌ | List all users |
| `GET` | `/userprofile/:id` | ❌ | Get user profile |
| `PUT` | `/updateprofile/:id` | ✅ | Update user profile |
| `DELETE` | `/deleteprofile/:id` | ✅ | Delete user account |
| `POST` | `/follow` | ✅ | Follow a user |
| `POST` | `/unfollow` | ✅ | Unfollow a user |

### Repositories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/repo/create` | ✅ | Create repository |
| `GET` | `/repo/all` | ❌ | List all public repos |
| `GET` | `/repo/:id` | ✅ | Get repository by ID |
| `GET` | `/repo/user/:userId` | ✅ | Get user's repositories |
| `GET` | `/repo/name/:name` | ✅ | Find repo by name |
| `PUT` | `/repo/update/:id` | ✅ | Update repository |
| `PATCH` | `/repo/toggle/:id` | ✅ | Toggle visibility |
| `DELETE` | `/repo/delete/:id` | ✅ | Delete repository |
| `POST` | `/repo/push/:repoId` | ✅ | Push code (multipart) |
| `POST` | `/repo/toggle-star/:id` | ✅ | Star/Unstar repo |
| `GET` | `/repo/file?key=` | ✅ | Get file from S3 |

### Issues

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/issue/create/:repoId` | ✅ | Create issue |
| `GET` | `/issue/all/:repoId` | ❌ | List repo issues |
| `GET` | `/issue/:id` | ❌ | Get issue by ID |
| `PUT` | `/issue/update/:id` | ✅ | Update issue |
| `DELETE` | `/issue/delete/:id` | ✅ | Delete issue |

### AI Features

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/ai/explain/:repoId` | ❌ | AI repo explainer |
| `GET` | `/ai/health/:repoId` | ❌ | AI health analysis |
| `GET` | `/ai/resume/:userId` | ❌ | AI resume generator |
| `GET` | `/ai/readme/:repoId` | ❌ | AI README generator |

### Notifications

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/notifications/:userId` | ✅ | Get user notifications |
| `PUT` | `/notifications/read/:id` | ✅ | Mark as read |

### WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `joinRoom` | Client → Server | User joins their notification room |
| `repoUpdated` | Server → Client | New commit pushed to a repository |
| `newNotification` | Server → Client | New notification (follow, star, issue) |

---

## 🗄 Database Schema

### User

```javascript
{
  username:       String (unique, required),
  email:          String (unique, required),
  password:       String (bcrypt hashed),
  avatar:         String (URL),
  bio:            String,
  isEmailVerified: Boolean,
  verificationCode: String,
  verificationCodeExpires: Date,
  repositories:   [ObjectId → Repository],
  followedUser:   [ObjectId → User],
  followers:      [ObjectId → User],
  starRepos:      [ObjectId → Repository],
  timestamps:     { createdAt, updatedAt }
}
```

### Repository

```javascript
{
  name:         String (required),
  description:  String,
  visibility:   Boolean (default: true → public),
  owner:        ObjectId → User (required),
  commits:      [{
    commitId:   String (UUID),
    message:    String,
    timestamp:  Date,
    files:      [{ s3Key: String, filename: String }]
  }],
  issues:       [ObjectId → Issue],
  stars:        [ObjectId → User],
  lastPushedAt: Date,
  timestamps:   { createdAt, updatedAt }
}
```

### Issue

```javascript
{
  title:       String (required),
  description: String (required),
  status:      String (enum: "open" | "closed"),
  repository:  ObjectId → Repository (required),
  timestamps:  { createdAt, updatedAt }
}
```

### Notification

```javascript
{
  recipient:  ObjectId → User (required),
  sender:     ObjectId → User (required),
  type:       String (enum: "follow" | "star" | "issue" | "system"),
  message:    String (required),
  link:       String (e.g., "/repo/123"),
  isRead:     Boolean (default: false),
  timestamps: { createdAt, updatedAt }
}
```

---

## ☁ Deployment

### Production Architecture

```
                    ┌────────────────────┐
                    │   Cloudflare DNS   │
                    │   devrift.in       │
                    └─────────┬──────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
    ┌──────────────────┐           ┌──────────────────┐
    │  Frontend (CDN)  │           │  Backend (EC2)   │
    │  AWS Amplify     │           │  api.devrift.in  │
    │                  │           │                  │
    │  React + Vite    │──────────►│  Node.js Express │
    │  Static Build    │  API      │  + Socket.IO     │
    └──────────────────┘           └────────┬─────────┘
                                            │
                                   ┌────────┴────────┐
                                   │                 │
                                   ▼                 ▼
                          ┌──────────────┐  ┌──────────────┐
                          │ MongoDB Atlas│  │   AWS S3     │
                          │  (Cluster)   │  │ (eu-north-1) │
                          └──────────────┘  └──────────────┘
```

### Deploy Backend to EC2

```bash
# SSH into EC2
ssh -i ec2-devrift-user.pem ec2-user@<your-ec2-ip>

# Clone and setup
git clone https://github.com/ayush4828/DevRift-Ai-Powered-Version-Control-System.git
cd DevRift-Ai-Powered-Version-Control-System/backend
npm install

# Set environment variables
nano .env   # Add all required env vars

# Run with PM2 (recommended for production)
npm install -g pm2
pm2 start index.js --name devrift-server -- start
pm2 save
pm2 startup
```

### Deploy Frontend (AWS Amplify)

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **"New app"** → **"Host web app"**
3. Connect your GitHub repository
4. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Base directory:** `frontend`
5. Add environment variable:
   - `VITE_API_URL` = `https://api.devrift.in`
6. Deploy — Amplify auto-builds on every push to `main`

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | ✅ | Server port (default: 3000) |
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET_KEY` | ✅ | Secret for JWT signing |
| `AWS_ACCESS_KEY` | ✅ | AWS IAM access key |
| `AWS_SECRET_KEY` | ✅ | AWS IAM secret key |
| `S3_BUCKET` | ✅ | S3 bucket name for file storage |
| `GEMINI_API_KEY` | ✅ | Google Gemini API key |
| `CLIENT_URL` | ✅ | Frontend URL for CORS |
| `API_URL` | ✅ | Backend URL for OAuth callbacks |
| `GITHUB_CLIENT_ID` | ⬜ | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | ⬜ | GitHub OAuth app secret |
| `GOOGLE_CLIENT_ID` | ⬜ | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | ⬜ | Google OAuth app secret |
| `EMAIL_USER` | ⬜ | Email for verification (Gmail) |
| `EMAIL_PASS` | ⬜ | App password for email |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add error handling for all async operations
- Keep controllers focused — one responsibility per function
- Use meaningful commit messages

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ayush Patel**

- 🌐 Website: [devrift.in](https://www.devrift.in)
- 💻 GitHub: [@ayush4828](https://github.com/ayush4828)
- 📦 npm: [devrift](https://www.npmjs.com/package/devrift)

---

<p align="center">
  Built with ❤️ by <strong>Ayush Patel</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-Node.js-339933?style=flat-square&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Made%20with-React-61dafb?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Powered%20by-Gemini%20AI-4285f4?style=flat-square&logo=google" alt="Gemini" />
  <img src="https://img.shields.io/badge/Deployed%20on-AWS-ff9900?style=flat-square&logo=amazon-aws" alt="AWS" />
</p>

# 🐦 NestJS Comprehensive (Twitter Backend Clone)

A beginner-friendly REST API built with [NestJS](https://nestjs.com/) that serves as the backend for a social media application similar to Twitter. It handles users, authentication, tweets, hashtags, and user profiles.

## 🛠 Tech Stack

- **Framework**: Node.js & NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: `class-validator` & `class-transformer`
- **Environment**: `@nestjs/config` for `.env` management

## 📦 Core Modules

The application is structured into clearly defined modules (found in `src/`):

- 👤 **Users Module** (`src/users/`): Manages user accounts and details.
- 🔐 **Auth Module** (`src/auth/`): Handles user registration, login, and security tasks.
- 📝 **Tweet Module** (`src/tweet/`): Logic for creating, viewing, and managing tweets.
- #️⃣ **Hashtag Module** (`src/hashtag/`): Manages hashtags to categorize tweets.
- 🖼️ **Profile Module** (`src/profile/`): Handles user profile information.

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) running locally
- Git

### 2. Installation

Clone the repository and install the required dependencies:

```bash
git clone <your-repository-url>
cd nestjs_comprehensive
npm install
```

### 3. Environment Setup

Create a `.env` file in the root of your project based on the configuration fields the app expects. For example:

```env
# Server Details
PORT=3000
NODE_ENV=development

# Database Details
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=nestjs_comprehensive_db
ENV_MODE=DEVELOPMENT
```

Make sure your PostgreSQL database (`nestjs_comprehensive_db`) is created before running the app.

### Running the App

```bash
# development mode (auto-restarts on save)
npm run start:dev

# standard start
npm run start

# production mode
npm run start:prod
```

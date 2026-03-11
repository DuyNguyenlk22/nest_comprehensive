## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) running locally
- Git

### 2. Installation

Clone the repository and install the required dependencies:

```bash
git clone https://github.com/DuyNguyenlk22/nest_comprehensive.git
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

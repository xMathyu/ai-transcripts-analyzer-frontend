@echo off
REM AI Transcripts Analyzer Frontend - Development Setup

echo 🚀 Starting AI Transcripts Analyzer Frontend
echo ============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo 📝 Creating .env.local from .env.example...
    copy .env.example .env.local
    echo ✏️  Please edit .env.local to configure your API URL
)

echo ✅ Setup complete!
echo 🌐 Backend API configured for: http://localhost:3000
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo To build for production, run:
echo npm run build
echo.
echo 📚 Visit http://localhost:3000 once the dev server is running
pause

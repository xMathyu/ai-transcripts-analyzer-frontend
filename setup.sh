#!/bin/bash

# AI Transcripts Analyzer Frontend - Development Setup

echo "🚀 Starting AI Transcripts Analyzer Frontend"
echo "============================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✏️  Please edit .env.local to configure your API URL"
fi

echo "✅ Setup complete!"
echo "🌐 Backend API configured for: $(grep NEXT_PUBLIC_API_URL .env.local | cut -d '=' -f2)"
echo ""
echo "To start the development server, run:"
echo "npm run dev"
echo ""
echo "To build for production, run:"
echo "npm run build"
echo ""
echo "📚 Visit http://localhost:3000 once the dev server is running"

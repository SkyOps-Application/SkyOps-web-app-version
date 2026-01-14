# ATC Radar Simulation Training System

A comprehensive Air Traffic Control radar simulation system for training purposes.

## Features

- Real-time radar display with aircraft tracking
- Voice recognition for ATC commands
- Separation monitoring and conflict detection
- Session replay and training history
- Command parsing (D120, C90, IS250, RM0.78, etc.)
- Audio feedback system
- Multi-user support with authentication
- Training performance analytics

## Tech Stack

### Frontend
- Next.js 14+ with TypeScript
- React 18
- Tailwind CSS
- Konva.js for canvas rendering
- Zustand for state management
- Web Speech API for voice recognition

### Backend
- Node.js with Express
- TypeScript
- Socket.io for real-time updates
- Prisma ORM
- PostgreSQL database
- JWT authentication

## Project Structure

```
atc-radar-sim/
├── frontend/          # Next.js application
├── backend/           # Express API server
├── shared/            # Shared types and utilities
├── database/          # Database schemas and migrations
└── package.json       # Root workspace config
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm 9+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build shared package:
```bash
cd shared
npm run build
cd ..
```

3. Run the development servers:
```bash
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:4000

## Quick Start

See QUICKSTART.md for a 5-minute setup guide.

## Documentation

- START_HERE.md - Quick overview and first steps
- QUICKSTART.md - 5-minute setup guide
- SETUP.md - Detailed setup instructions
- FEATURES.md - Complete feature list
- ARCHITECTURE.md - System architecture
- COMMANDS_REFERENCE.md - Command reference guide

## License

MIT

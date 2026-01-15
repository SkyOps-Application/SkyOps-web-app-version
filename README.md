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
- **Core Simulator**: Node.js with Express, Socket.io (Real-time simulation)
- **User Service**: Python Flask (Authentication, User Management)
- **Notification Service**: (Planned) System notifications and alerts
- PostgreSQL & Redis (Message Queue & Caching)

## Microservices Architecture

The backend is composed of three main microservices:

1. **User Service**: 
   - Built with **Python (Flask)**.
   - Responsibilities: User registration, authentication (JWT), profile management, and training history tracking.
   - Enforces security policies (password complexity, email uniqueness).

2. **Simulator Service**: 
   - Built with **Node.js (Express)**.
   - Responsibilities: Core ATC simulation logic, real-time aircraft tracking, command parsing, and Socket.io communication.
   - Handles the state of the airspace and collision detection.

3. **Notification Service**:
   - Responsibilities: Handling asynchronous events, sending alerts, emails, and system notifications.
   - Decoupled via Redis message queue.

## Project Structure

```
atc-radar-sim/
├── frontend/               # Next.js application
├── backend/                
│   ├── simulator_service/  # Node.js: Radar logic & Socket.io
│   ├── user_service/       # Python: Auth & Users
│   ├── notification_service/ # Notifications
├── shared/                 # Shared types and utilities
└── package.json            # Root workspace config
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

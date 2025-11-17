# 🚀 Deployment Guide - ATC Radar Simulator

## Architecture

- **Backend**: Node.js + Socket.IO server (WebSocket) - Port 4000
- **Frontend**: Next.js application - Port 3000
- **Shared**: Common types/utilities (dependency for both)

**Deploy separately:** Backend and Frontend need different hosting solutions.

---

## 📦 Pre-Deployment Checklist

### 1. Build Everything Locally (Test First)

```bash
# From project root
cd atc-radar-sim

# Build shared package
cd shared
npm install
npm run build

# Build backend
cd ../backend
npm install
npm run build

# Build frontend
cd ../frontend
npm install
npm run build
```

If all builds succeed ✅, you're ready to deploy!

---

## 🔧 Option 1: Render.com (Backend) + Vercel (Frontend)

### **Backend Deployment on Render.com** (Free tier available)

1. **Sign up at [render.com](https://render.com)**

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `https://github.com/tienquocbui/double-quebec`

3. **Configure Service:**
   ```
   Name: atc-radar-backend
   Region: Choose closest to your users
   Branch: main
   Root Directory: atc-radar-sim/backend
   Runtime: Node
   Build Command: cd ../shared && npm install && npm run build && cd ../backend && npm install && npm run build
   Start Command: npm start
   ```

4. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=4000
   CORS_ORIGIN=https://your-frontend-app.vercel.app
   ```

5. **Click "Create Web Service"**

6. **After deployment, copy your backend URL:**
   ```
   https://atc-radar-backend.onrender.com
   ```

### **Frontend Deployment on Vercel** (Free tier, best for Next.js)

1. **Sign up at [vercel.com](https://vercel.com)**

2. **Import your GitHub repository:**
   - Click "Add New" → "Project"
   - Import: `https://github.com/tienquocbui/double-quebec`

3. **Configure Build Settings:**
   ```
   Framework Preset: Next.js
   Root Directory: atc-radar-sim/frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: cd ../shared && npm install && npm run build && cd ../frontend && npm install
   ```

4. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_BACKEND_URL=https://atc-radar-backend.onrender.com
   ```

5. **Click "Deploy"**

6. **Update Backend CORS:**
   - Go back to Render.com
   - Update `CORS_ORIGIN` environment variable with your Vercel URL:
     ```
     CORS_ORIGIN=https://your-app-name.vercel.app
     ```

---

## 🔧 Option 2: Railway.app (Both Backend & Frontend)

Railway can host both in one place ($5/month after free trial).

1. **Sign up at [railway.app](https://railway.app)**

2. **Create New Project:**
   - "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Add Backend Service:**
   ```
   Name: backend
   Root Directory: atc-radar-sim/backend
   Build Command: cd ../shared && npm install && npm run build && cd ../backend && npm install && npm run build
   Start Command: npm start
   Environment Variables:
     NODE_ENV=production
     PORT=${{PORT}}
     CORS_ORIGIN=${{RAILWAY_PUBLIC_DOMAIN}}
   ```

4. **Add Frontend Service:**
   ```
   Name: frontend
   Root Directory: atc-radar-sim/frontend
   Build Command: cd ../shared && npm install && npm run build && cd ../frontend && npm install && npm run build
   Start Command: npm start
   Environment Variables:
     NEXT_PUBLIC_BACKEND_URL=https://backend-production.up.railway.app
   ```

5. **Generate domains** for both services in Railway dashboard

---

## 🔧 Option 3: Docker Deployment (Advanced)

### Backend Dockerfile

Create `atc-radar-sim/backend/Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy shared package
COPY shared /app/shared
WORKDIR /app/shared
RUN npm install && npm run build

# Copy and build backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend ./
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
```

### Frontend Dockerfile

Create `atc-radar-sim/frontend/Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy shared package
COPY shared /app/shared
WORKDIR /app/shared
RUN npm install && npm run build

# Copy and build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./atc-radar-sim
      dockerfile: backend/Dockerfile
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
      - CORS_ORIGIN=http://localhost:3000
    restart: unless-stopped

  frontend:
    build:
      context: ./atc-radar-sim
      dockerfile: frontend/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
    depends_on:
      - backend
    restart: unless-stopped
```

**Deploy with:**
```bash
docker-compose up -d
```

---

## ⚙️ Environment Variables Reference

### Backend `.env`
```bash
NODE_ENV=production
PORT=4000
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend `.env.local`
```bash
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

---

## 🔍 Update Frontend Socket Connection

Update `atc-radar-sim/frontend/lib/socket.ts` to use environment variable:

```typescript
const SOCKET_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });
  }
  return socket;
}
```

---

## ✅ Testing After Deployment

1. **Backend Health Check:**
   ```
   https://your-backend.onrender.com/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Frontend:**
   - Open `https://your-app.vercel.app`
   - Open browser console (F12)
   - Look for WebSocket connection: `WebSocket server ready`
   - Start an exercise and test commands

3. **Check for errors:**
   - CORS errors → Update backend `CORS_ORIGIN`
   - Connection refused → Check backend URL in frontend env vars
   - 404 errors → Check build commands and root directories

---

## 🎯 Recommended Setup (Free Tier)

- **Backend**: Render.com (Free - sleeps after 15 min inactivity)
- **Frontend**: Vercel (Free - always active)
- **Total Cost**: $0/month (with limitations)

### Note on Render Free Tier:
- Backend will "sleep" after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Upgrade to paid tier ($7/month) for always-on service

---

## 📝 Post-Deployment Tasks

1. ✅ Test all 21 commands
2. ✅ Test Exercise 1 & 2 playback
3. ✅ Test separation detection
4. ✅ Test distance measurements
5. ✅ Test replay and speed controls
6. ✅ Test on mobile devices

---

## 🐛 Common Issues

### Issue: "WebSocket connection failed"
**Solution:** Update backend CORS_ORIGIN to match frontend URL

### Issue: "Backend not responding"
**Solution:** Check Render logs, backend might be sleeping (free tier)

### Issue: "Build failed - Cannot find module '@atc-radar-sim/shared'"
**Solution:** Ensure shared package builds first in build command

### Issue: "Aircraft not spawning"
**Solution:** Check backend logs for errors in exercise runner

---

## 📞 Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Check backend logs in Render/Railway dashboard
3. Verify all environment variables are set correctly

---

**Last Updated:** November 2025


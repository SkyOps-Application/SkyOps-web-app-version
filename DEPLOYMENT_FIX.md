# 🔧 Deployment Fix - Module Not Found Error

## Problem

Both Netlify (Frontend) and Render (Backend) can't find `@atc-radar-sim/shared` because:
1. It's a monorepo with workspaces
2. The shared package needs to be built BEFORE backend/frontend
3. The platforms don't automatically handle workspace dependencies

## ✅ Solutions

### **Option A: Deploy with Updated Build Commands** (Recommended)

I've created configuration files that build shared first:

#### **For Netlify (Frontend):**

1. **Use the `netlify.toml` file I created:**
   - Location: `atc-radar-sim/frontend/netlify.toml`
   - It builds shared, then frontend

2. **In Netlify Dashboard:**
   ```
   Base directory: atc-radar-sim/frontend
   Build command: (leave empty - it will use netlify.toml)
   Publish directory: .next
   ```

3. **OR manually set:**
   ```
   Build command: cd ../shared && npm install && npm run build && cd ../frontend && npm install && npm run build
   ```

#### **For Render (Backend):**

1. **In Render Dashboard, set Root Directory to:** `atc-radar-sim/backend`

2. **Update Build Command to:**
   ```bash
   cd ../shared && npm install && npm run build && cd ../backend && npm install && npm run build
   ```

3. **Keep Start Command as:**
   ```bash
   npm start
   ```

---

### **Option B: Use Root-Level Deployment** (Alternative)

Deploy from the ROOT of the monorepo instead of subdirectories:

#### **For Netlify (Frontend):**
```
Base directory: (empty or root)
Build command: npm install && npm run build:frontend
Publish directory: atc-radar-sim/frontend/.next
```

#### **For Render (Backend):**
```
Root Directory: (empty or root)
Build Command: npm install && npm run build:backend
Start Command: npm start --workspace=backend
```

---

### **Option C: Simplify - Single Package** (If A & B fail)

If workspace issues persist, we can combine shared into backend/frontend:

1. Copy shared files into backend and frontend
2. Remove workspace dependency
3. Deploy as standalone apps

(I can do this if needed - let me know!)

---

## 🚀 Quick Fix Steps

### **1. Update Netlify:**

In Netlify dashboard for your frontend deployment:

**Build Settings:**
- Base directory: `atc-radar-sim/frontend`
- Build command: `cd ../shared && npm install && npm run build && cd ../frontend && npm install && npm run build`
- Publish directory: `.next`

**Environment Variables:**
- `NEXT_PUBLIC_WS_URL`: Your Render backend URL
- `NODE_VERSION`: `20`

### **2. Update Render:**

In Render dashboard for your backend deployment:

**Settings:**
- Root Directory: `atc-radar-sim/backend`
- Build Command:
  ```bash
  cd ../shared && npm install && npm run build && cd ../backend && npm install && npm run build
  ```
- Start Command: `npm start`

**Environment Variables:**
- `NODE_ENV`: `production`
- `PORT`: `4000`
- `CORS_ORIGIN`: Your Netlify URL
- `NODE_VERSION`: `20`

---

## 📋 Verification Steps

### **Test Locally First:**

```bash
# From project root
cd atc-radar-sim

# Test backend build
cd shared && npm install && npm run build
cd ../backend && npm install && npm run build
npm start
# Backend should start on port 4000

# In another terminal, test frontend build
cd shared && npm install && npm run build
cd ../frontend && npm install && npm run build
npm start
# Frontend should start on port 3000
```

If this works locally, it will work on the platforms with the updated commands.

---

## 🔍 Common Issues

### Issue: "MODULE_NOT_FOUND" still appearing

**Solution 1:** Make sure Root Directory/Base Directory is set correctly
- Netlify: `atc-radar-sim/frontend`
- Render: `atc-radar-sim/backend`

**Solution 2:** Check that build command includes `cd ../shared` part

**Solution 3:** Clear build cache
- Netlify: "Deploys" → "Trigger deploy" → "Clear cache and deploy"
- Render: "Manual Deploy" → "Clear build cache"

### Issue: "npm install" fails

**Solution:** Use Node 20:
- Add environment variable: `NODE_VERSION=20`

### Issue: Build timeout

**Solution:** Netlify free tier has 5-minute limit
- If it times out, try Option C (single package)

---

## 🎯 If Still Failing

Let me know and I can:

1. **Create a standalone version** (no monorepo)
2. **Create Docker images** (pre-built, just deploy)
3. **Try different platforms** (Railway, Fly.io)

Just tell me which option you prefer!


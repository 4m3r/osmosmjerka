# Deployment Guide for Osmosmjerka

## Deploying to Vercel (Recommended - Easiest!)

Vercel is the platform made by the creators of Next.js and provides the best experience.

### Option 1: Deploy via GitHub (Recommended)

1. **Create a GitHub account** (if you don't have one)

   - Go to https://github.com/signup

2. **Create a new repository**

   - Go to https://github.com/new
   - Name it "osmosmjerka"
   - Make it public or private
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push your code to GitHub**

   ```bash
   cd osmosmjerka
   git init
   git add .
   git commit -m "Initial commit - Bosnian word search game"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/osmosmjerka.git
   git push -u origin main
   ```

4. **Deploy to Vercel**

   - Go to https://vercel.com/signup
   - Sign up with your GitHub account
   - Click "New Project"
   - Import your "osmosmjerka" repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Wait 1-2 minutes... Done! 🎉

5. **Share your game!**
   - You'll get a URL like: `https://osmosmjerka.vercel.app`
   - Share it with your daughter and friends!

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd osmosmjerka
vercel

# Follow the prompts, then deploy to production
vercel --prod
```

## Other Deployment Options

### Netlify

1. Sign up at https://netlify.com
2. Drag and drop your project folder OR connect via GitHub
3. Build command: `npm run build`
4. Publish directory: `.next`

### Railway

1. Sign up at https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect and deploy

## Environment Setup

This project doesn't require any environment variables for basic functionality.

## Post-Deployment

After deployment:

- Test all features (word selection, difficulty levels, categories)
- Share the URL with your daughter
- Consider adding more word categories in `data/words.ts`
- Customize colors in the components for her preferences

## Updating Your Deployed App

Whenever you make changes:

**If using GitHub + Vercel:**

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically redeploy!

**If using Vercel CLI:**

```bash
vercel --prod
```

## Need Help?

- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
- Create an issue on GitHub if you encounter problems

Enjoy the game! 🎮🇧🇦

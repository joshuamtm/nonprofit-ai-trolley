# Deployment Guide - Nonprofit AI Trolley

## Quick Deploy to Netlify

### Option 1: Netlify Dashboard (Easiest)

1. **Push to GitHub** (already done ✅)
   ```bash
   git push origin 9-29-2025
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select `joshuamtm/nonprofit-ai-trolley` repository
   - Choose branch: `9-29-2025` (or `main`)

3. **Build Settings** (Auto-detected)
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: 18

4. **Deploy!**
   - Click "Deploy site"
   - Wait 2-3 minutes
   - Get your URL: `https://your-site-name.netlify.app`

### Option 2: Netlify CLI (Advanced)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site (one-time setup)
netlify init

# Deploy to production
netlify deploy --prod
```

---

## Netlify Configuration

A `netlify.toml` file has been prepared with:
- ✅ SPA routing (handles React Router)
- ✅ Security headers (XSS, frame protection)
- ✅ Cache optimization for static assets
- ✅ Compression for JS/CSS
- ✅ Performance optimizations

---

## ⚠️ IMPORTANT: Video Optimization Before Deploy

**CRITICAL**: The `cat-trolley.mp4` file is 207MB - too large for free Netlify!

### Netlify Free Tier Limits
- **Build size limit**: 100MB
- **Bandwidth**: 100GB/month
- **Current video**: 207MB (EXCEEDS LIMIT)

### Two Options:

#### Option A: Compress Video (Recommended)
```bash
# Use FFmpeg to compress to ~5MB
ffmpeg -i "public/cat-trolley.mp4" \
  -vcodec libx264 -crf 28 -preset slow \
  -vf "scale=1280:720" -movflags +faststart \
  -c:a aac -b:a 128k \
  public/cat-trolley-optimized.mp4

# Update WelcomeSection.tsx
# Change: src="/cat-trolley.mp4"
# To: src="/cat-trolley-optimized.mp4"

# Remove large file
rm public/cat-trolley.mp4
```

See `VIDEO_OPTIMIZATION_GUIDE.md` for detailed instructions.

#### Option B: Host on YouTube
1. Upload video to YouTube (unlisted)
2. Get embed code
3. Replace video element with iframe in WelcomeSection.tsx
4. Remove `public/cat-trolley.mp4`

**Cost savings**: $40-80/month in bandwidth costs

---

## Pre-Deployment Checklist

- [ ] **Compress or remove large video** (CRITICAL - deployment will fail otherwise)
- [ ] Test build locally: `npm run build`
- [ ] Verify no console errors: `npm start`
- [ ] Test on mobile viewport (responsive design)
- [ ] Review security headers in `netlify.toml`
- [ ] Set environment variables (if any) in Netlify dashboard
- [ ] Enable form notifications (if using Netlify Forms)
- [ ] Configure custom domain (optional)

---

## Post-Deployment Steps

1. **Test the Live Site**
   - Complete full assessment flow
   - Generate and download PDF
   - Test on mobile devices
   - Verify video playback
   - Check all links (especially methodology page)

2. **Set Up Monitoring**
   - Enable Netlify Analytics (optional, paid)
   - Add Plausible Analytics (privacy-friendly, see IMPROVEMENTS_ROADMAP.md)
   - Set up error tracking (e.g., Sentry)

3. **Performance Audit**
   ```bash
   # Run Lighthouse audit
   npx lighthouse https://your-site.netlify.app --view
   ```
   - Target scores: 90+ for all categories
   - Fix any issues flagged

4. **Custom Domain (Optional)**
   - Buy domain or use existing
   - Add to Netlify: Settings → Domain management
   - Configure DNS (Netlify provides instructions)
   - Enable HTTPS (automatic with Netlify)

---

## Continuous Deployment

Once connected to GitHub, Netlify auto-deploys on every push to your chosen branch.

**Workflow**:
```bash
# Make changes locally
git add .
git commit -m "feat: add new feature"
git push origin 9-29-2025

# Netlify automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys to production
# 4. Sends notification
```

---

## Environment Variables (If Needed)

If you add API keys or secrets later:

1. Go to Netlify Dashboard
2. Site settings → Environment variables
3. Add key-value pairs
4. Redeploy for changes to take effect

**Never commit secrets to Git!**

---

## Troubleshooting

### Build Fails
```
Error: ENOSPC: no space left on device
```
**Solution**: Video file too large. Compress or remove it.

### 404 on Routes
```
Cannot GET /methodology
```
**Solution**: `_redirects` file missing. Add to `public/` directory:
```
/*    /index.html   200
```

### Slow Load Times
**Check**:
- Video compression (should be < 10MB)
- Lazy loading enabled (✅ already done)
- Image optimization
- Bundle size (target: < 200KB main chunk)

---

## Cost Estimates

### Free Tier (Netlify)
- ✅ Unlimited sites
- ✅ 100GB bandwidth/month
- ✅ Continuous deployment
- ✅ HTTPS included
- ✅ Custom domains

**Estimated traffic**: ~5,000 visitors/month (with optimized video)

### Paid Tier ($19/month) - Only if needed
- 400GB bandwidth
- Background functions
- Analytics
- Advanced forms

---

## Recommended Next Steps

1. ✅ **Immediately**: Compress video before deploying
2. ✅ **Today**: Deploy to Netlify and test
3. ✅ **This Week**: Set up custom domain (optional)
4. ✅ **Week 2**: Add analytics (Plausible)
5. ✅ **Ongoing**: Monitor performance and user feedback

---

## Support Resources

- [Netlify Docs](https://docs.netlify.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Netlify Community Forum](https://answers.netlify.com/)

---

*For questions or issues, see IMPROVEMENTS_ROADMAP.md or contact the development team.*

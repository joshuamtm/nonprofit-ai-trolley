# Video File Placeholder

## Missing: cat-trolley.mp4

The Cat Trolley video is intentionally excluded from Git due to its large size (207MB).

### To Add Video for Deployment:

**Option 1: Compress and Add** (Recommended)
```bash
# Compress original video to ~5-10MB
ffmpeg -i "/Users/joshua/Downloads/Cat Trolley.mp4" \
  -vcodec libx264 -crf 28 -preset slow \
  -vf "scale=1280:720" -movflags +faststart \
  -c:a aac -b:a 128k \
  public/cat-trolley.mp4

# Verify size
ls -lh public/cat-trolley.mp4
# Should be < 10MB

# Now it's safe to deploy!
```

**Option 2: Use YouTube Embed**
1. Upload video to YouTube (unlisted)
2. Update `src/components/WelcomeSection.tsx` with iframe embed
3. No local file needed

### Current Status
- ✅ Video embed code is in WelcomeSection.tsx
- ⚠️ Video file needs compression before deploy
- 📝 See VIDEO_OPTIMIZATION_GUIDE.md for detailed instructions

### Deployment Impact
Without video compression:
- GitHub push will fail (exceeds 100MB)
- Netlify build may fail
- High bandwidth costs ($40-80/month)
- Slow page load times

With compressed video:
- GitHub push succeeds
- Netlify free tier sufficient
- Fast page loads
- Better user experience

---
*This is a normal part of the workflow - all video files should be optimized before deployment.*

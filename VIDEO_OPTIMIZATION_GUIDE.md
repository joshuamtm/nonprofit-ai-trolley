# Video Optimization Guide

## ✅ SOLUTION IMPLEMENTED: YouTube Embed

**Status**: Using YouTube embed - NO local file needed!
- **YouTube URL**: https://youtu.be/x9SyL_B_xbY
- **Embed**: Implemented in WelcomeSection.tsx ✅
- **Benefits**: Zero bandwidth cost, adaptive streaming, works everywhere

## Problem
207MB is far too large for web delivery:
- Slow page load times (30+ seconds on average connection)
- High bandwidth costs for hosting
- Poor mobile experience
- Users may abandon before video loads

## Target Size
**Goal**: Reduce to **< 5-10MB** (95% reduction)

## How to Compress (Choose One Method)

### Method 1: FFmpeg (Recommended - Best Quality)

```bash
# Install FFmpeg (if not already installed)
brew install ffmpeg

# Compress video (high quality, ~5-10MB output)
ffmpeg -i "/Users/joshua/Downloads/Cat Trolley.mp4" \
  -vcodec libx264 \
  -crf 28 \
  -preset slow \
  -vf "scale=1280:720" \
  -movflags +faststart \
  -c:a aac -b:a 128k \
  public/cat-trolley-optimized.mp4

# For even smaller size (~3-5MB)
ffmpeg -i "/Users/joshua/Downloads/Cat Trolley.mp4" \
  -vcodec libx264 \
  -crf 32 \
  -preset slow \
  -vf "scale=960:540" \
  -movflags +faststart \
  -c:a aac -b:a 96k \
  public/cat-trolley-optimized.mp4
```

**Explanation:**
- `-crf 28-32`: Compression level (28 = high quality, 32 = smaller file)
- `-vf "scale=1280:720"`: Reduce resolution to 720p (or 540p)
- `-movflags +faststart`: Enable streaming (video starts before full download)
- `-preset slow`: Better compression (worth the wait)

### Method 2: Online Tools (No Installation Needed)

**Option A: CloudConvert**
1. Go to https://cloudconvert.com/mp4-converter
2. Upload `Cat Trolley.mp4`
3. Settings:
   - Format: MP4
   - Video Codec: H.264
   - Resolution: 1280x720 or 960x540
   - Quality: Medium-High
   - Audio Bitrate: 128kbps
4. Download and replace `public/cat-trolley.mp4`

**Option B: HandBrake** (Free Desktop App)
1. Download: https://handbrake.fr/
2. Import video
3. Preset: "Web > Gmail Large 3 Minutes 720p30"
4. Export to `public/cat-trolley-optimized.mp4`

### Method 3: Host Externally (Alternative Approach)

Instead of self-hosting, upload to:
- **YouTube** (unlisted) - Embed with iframe
- **Vimeo** - Better player, no ads
- **Cloudflare Stream** - CDN delivery, pay per view

**Pros**: No hosting costs, faster delivery, adaptive streaming
**Cons**: Dependency on external service, less control

## Update Code After Compression

If you create `cat-trolley-optimized.mp4`, update `WelcomeSection.tsx`:

```tsx
<source src="/cat-trolley-optimized.mp4" type="video/mp4" />
```

## Verification Checklist

After compression:
- [ ] File size < 10MB
- [ ] Video plays smoothly in browser
- [ ] Audio quality acceptable
- [ ] Resolution adequate for viewing (720p minimum)
- [ ] First frame loads quickly (poster/thumbnail)
- [ ] Works on mobile devices

## Performance Best Practices (Already Implemented)

✅ `preload="metadata"` - Only loads metadata, not full video
✅ `controls` - User decides when to play
✅ Fallback text for unsupported browsers
✅ Video is below the fold (not blocking initial render)

## Next Steps

1. **Compress video** using Method 1 or 2
2. **Replace** `public/cat-trolley.mp4` with optimized version
3. **Test** locally: `npm start` and check load time
4. **Deploy** to Netlify and verify performance
5. **Optional**: Create poster image (first frame) for faster perceived load

## Cost Comparison

| Scenario | File Size | Bandwidth per 1000 views | Netlify Cost |
|----------|-----------|--------------------------|--------------|
| Current | 207MB | ~207GB | ~$40-80/month |
| Optimized | 8MB | ~8GB | Free tier or $2-5/month |
| YouTube | 0MB | 0GB (free) | $0 |

**Recommendation**: Compress to 5-8MB for self-hosting, or use YouTube embed for zero cost.

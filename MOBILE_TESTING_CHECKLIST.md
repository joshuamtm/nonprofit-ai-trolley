# Mobile Testing Checklist

## Testing Viewports

### iPhone SE (375x667 - Smallest)
- [ ] Welcome section readable without horizontal scroll
- [ ] Video player responsive and playable
- [ ] Hero heading fits on screen
- [ ] "Start Assessment" button clearly visible
- [ ] Progress bar visible and functional
- [ ] Form fields have adequate tap targets (44px minimum)

### iPhone 12/13/14 (390x844 - Common)
- [ ] Layout looks balanced
- [ ] Text sizes appropriate
- [ ] Images/icons scale properly
- [ ] Navigation accessible
- [ ] Methodology button doesn't overlap

### iPad (768x1024 - Tablet)
- [ ] Uses available space effectively
- [ ] Doesn't look stretched or cramped
- [ ] Two-column layouts where appropriate
- [ ] Video maintains aspect ratio

### Large Desktop (1920x1080)
- [ ] Content doesn't stretch too wide (max-width working)
- [ ] Margins/padding look good
- [ ] No weird text line lengths

## Key Components to Test

### WelcomeSection
**Current breakpoints to verify:**
```tsx
className="flex flex-col sm:flex-row gap-4"  // Stacks on mobile, row on tablet+
className="grid grid-cols-1 md:grid-cols-2"  // Single col mobile, 2 cols desktop
className="max-w-4xl mx-auto"                // Max width container
```

**Potential issues:**
- Video might overflow on very small screens
- Hero heading might need smaller font on mobile
- Two CTAs side-by-side might crowd on small phones

**Quick fixes if needed:**
```tsx
// Make hero more responsive
<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">

// Ensure video never overflows
<div className="aspect-video w-full overflow-hidden">

// Stack buttons on smallest screens
<div className="flex flex-col min-[480px]:flex-row gap-4">
```

### AssessmentFlow Header
**Check at line 101-118:**
```tsx
<div className="flex justify-between items-center max-w-3xl mx-auto">
```

**Potential issue**: Long title + "Methodology" button might wrap awkwardly

**Quick fix if needed:**
```tsx
<div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-3xl mx-auto">
```

### ProgressBar
**Should test:**
- Step circles are tappable (44px minimum)
- Progress bar scrolls horizontally if needed on small screens
- Active step clearly visible
- Labels don't overlap

### Form Fields (StepOne-StepFour)
**Critical for mobile:**
- Input fields have adequate height (48-56px)
- Labels clearly visible
- Error messages don't get cut off
- Dropdowns work properly on mobile
- Next/Previous buttons easily tappable

## Testing Tools

### Browser DevTools (Easiest)
```
1. Open in Chrome/Edge/Firefox
2. Press F12 to open DevTools
3. Click device toolbar icon (Ctrl+Shift+M)
4. Select device from dropdown or enter custom dimensions
5. Test interactions with mouse (simulates touch)
```

**Recommended devices in DevTools:**
- iPhone SE (small)
- iPhone 12 Pro (medium)
- iPad (tablet)
- Responsive mode with manual width adjustment

### Real Device Testing (Best)
If you have access:
- Test on actual iPhone
- Test on actual Android device
- Test on actual iPad

**How to access local dev server from phone:**
1. Ensure phone and computer on same WiFi
2. Find computer's local IP: `ipconfig getifaddr en0` (Mac) or `ipconfig` (Windows)
3. On phone browser, go to: `http://[YOUR_IP]:3000`

### Lighthouse Mobile Audit
```bash
# After deploying to Netlify
npx lighthouse https://your-site.netlify.app \
  --only-categories=performance,accessibility \
  --form-factor=mobile \
  --view
```

## Common Mobile Issues Found in React Apps

### 1. Touch Target Size
**Problem**: Buttons/links too small to tap accurately
**Solution**: Minimum 44x44px tap targets

```tsx
// Bad
<button className="text-sm px-2 py-1">

// Good
<button className="text-sm px-4 py-3 min-h-[44px]">
```

### 2. Viewport Meta Tag
**Check** in `public/index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```
Should already be there with Create React App.

### 3. Text Legibility
**Problem**: Text too small on mobile
**Current**: Base font 16px (good!)
**Action**: Verify no text below 14px

### 4. Overflow Issues
**Problem**: Content wider than viewport
**Solution**:
```tsx
className="w-full overflow-x-hidden"
```
Already applied to main containers.

### 5. Fixed Position Elements
**Check**: Make sure nothing blocks mobile navigation
**Current**: No fixed headers/footers (good!)

## Testing Checklist by Step

### Step 0: Welcome
- [ ] Video loads and plays
- [ ] All collapsible sections work
- [ ] CTAs visible without scroll
- [ ] Page doesn't feel cramped

### Step 1: Context
- [ ] Dropdown selector works
- [ ] Textarea expands properly
- [ ] Keyboard appears for text input
- [ ] Next button clearly visible

### Step 2: AI Initiative
- [ ] Multi-select checkboxes tappable
- [ ] Textarea comfortable to type in
- [ ] Expected outcomes selectable
- [ ] No horizontal scroll

### Step 3: Concerns (Sliders)
- [ ] Sliders draggable with finger
- [ ] Numbers update as slider moves
- [ ] Labels readable
- [ ] Can reach all values (1-5)

### Step 4: Readiness
- [ ] Radio buttons easy to select
- [ ] Text readable
- [ ] Submit button prominent

### Step 5: Review
- [ ] Trolley animation visible
- [ ] PDF download button works
- [ ] Results readable
- [ ] Can scroll through recommendations

## Performance Targets (Mobile)

- **First Contentful Paint**: < 2 seconds
- **Largest Contentful Paint**: < 3 seconds
- **Time to Interactive**: < 4 seconds
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: 90+ (Performance, Accessibility)

## Quick Fixes Reference

### If text too small:
```css
/* Add to index.css */
@media (max-width: 640px) {
  body {
    font-size: 16px; /* Prevent zoom on input focus */
  }
}
```

### If buttons too crowded:
```tsx
<div className="flex flex-col sm:flex-row gap-3">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

### If content too wide:
```tsx
<div className="px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### If video doesn't fit:
```tsx
<div className="w-full max-w-full overflow-hidden">
  <video className="w-full h-auto" />
</div>
```

## Accessibility on Mobile

- [ ] Can navigate entire form with keyboard (Bluetooth keyboard)
- [ ] Screen reader announces all fields (VoiceOver on iOS, TalkBack on Android)
- [ ] Color contrast sufficient in bright sunlight
- [ ] No auto-playing video/audio (✅ already handled)
- [ ] Pinch-to-zoom works (not disabled)

## Browser Testing

Test in multiple mobile browsers:
- [ ] Safari (iOS)
- [ ] Chrome (iOS)
- [ ] Chrome (Android)
- [ ] Samsung Internet (Android)
- [ ] Firefox (iOS/Android)

Different browsers handle CSS/JS differently on mobile!

## Issues to Watch For

**Video element**:
- Large file may not load on cellular data
- iOS Safari has strict autoplay policies
- Controls might look different on each browser

**Framer Motion animations**:
- May be slower on older phones
- Consider reduced motion preference:
  ```tsx
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ```

**PDF Generation**:
- May take longer on mobile devices
- Consider loading indicator during generation

## Documentation

After testing, document any issues found:
```markdown
## Mobile Issues Found [Date]

### Critical
- [ ] Issue description
- [ ] Steps to reproduce
- [ ] Proposed fix

### Minor
- [ ] Issue description
- [ ] Proposed fix
```

---

**Status**: Ready for testing
**Last Updated**: 2025-10-25
**Tested By**: [Your name]
**Tested On**: [Device list]

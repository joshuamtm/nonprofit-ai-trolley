# Nonprofit AI Trolley - Improvements Roadmap
*Generated from Vibe Coding Review - October 2025*

## ✅ Completed

### Video Enhancement
- ✅ Cat Trolley video embedded in WelcomeSection
- ✅ Responsive video player with controls
- ✅ Fallback text for unsupported browsers
- ✅ Metadata preloading (performance optimization)
- ✅ VIDEO_OPTIMIZATION_GUIDE.md created

**Next Step**: Compress video from 207MB → 5-10MB (see VIDEO_OPTIMIZATION_GUIDE.md)

---

## 🚨 Priority 1: Critical Issues (Do First)

### 1.1 Video Compression (Immediate)
**Impact**: High | **Effort**: Low | **Timeline**: 30 minutes

**Problem**: 207MB video will cause:
- Slow page loads (30+ seconds)
- High bandwidth costs (~$40-80/month for 1000 views)
- Poor mobile experience
- Bounce rate increase

**Solution**:
```bash
# Quick compression with FFmpeg
ffmpeg -i "/Users/joshua/Downloads/Cat Trolley.mp4" \
  -vcodec libx264 -crf 28 -preset slow \
  -vf "scale=1280:720" -movflags +faststart \
  -c:a aac -b:a 128k \
  public/cat-trolley-optimized.mp4
```

**Alternative**: Upload to YouTube (unlisted) and embed iframe

### 1.2 Security Vulnerabilities
**Impact**: High | **Effort**: Medium | **Timeline**: 2-3 hours

**Issues Found**:
- 9 npm vulnerabilities (3 moderate, 6 high)
- No input sanitization in form components
- Missing rate limiting on submissions

**Solutions**:
```bash
# Address dependency vulnerabilities
npm audit fix

# For breaking changes (test thoroughly)
npm audit fix --force
```

**Code changes needed**:
- Add input validation with React Hook Form validators
- Implement sanitization for free-text fields (organizationMission, initiativeDescription)
- Add rate limiting for PDF generation (prevent abuse)

### 1.3 Build Warnings
**Impact**: Low | **Effort**: Low | **Timeline**: 10 minutes

Fix unused variables in `ProgressBar.tsx:30-31`:
```typescript
// Remove or use these variables
const isCompleted = ...
const isCurrent = ...
```

---

## 📈 Priority 2: Quick Wins (High ROI)

### 2.1 Progress Persistence
**Impact**: High | **Effort**: Low | **Timeline**: 1 hour

**User Pain Point**: Losing progress on accidental refresh

**Implementation**:
```typescript
// In AssessmentFlow.tsx
useEffect(() => {
  // Save to localStorage on data change
  localStorage.setItem('ai-trolley-progress', JSON.stringify({
    currentStep,
    sessionData,
    timestamp: Date.now()
  }));
}, [currentStep, sessionData]);

// On mount, restore if < 24 hours old
useEffect(() => {
  const saved = localStorage.getItem('ai-trolley-progress');
  if (saved) {
    const { currentStep, sessionData, timestamp } = JSON.parse(saved);
    if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
      // Prompt user: "Resume where you left off?"
      setCurrentStep(currentStep);
      setSessionData(sessionData);
    }
  }
}, []);
```

### 2.2 Loading States & Lazy Loading
**Impact**: Medium | **Effort**: Low | **Timeline**: 1 hour

**Current Issue**: All components load upfront (321KB main bundle)

**Solution**:
```typescript
// In AssessmentFlow.tsx
import { lazy, Suspense } from 'react';

const StepOne = lazy(() => import('./QuestionFlow/StepOne'));
const StepTwo = lazy(() => import('./QuestionFlow/EnhancedStepTwo'));
// ... etc

// In render:
<Suspense fallback={<LoadingSpinner />}>
  {renderStep()}
</Suspense>
```

**Expected improvement**: 30-40% faster initial load

### 2.3 Accessibility Quick Fixes
**Impact**: Medium | **Effort**: Low | **Timeline**: 2 hours

**Missing**:
- ARIA labels on interactive elements
- Keyboard navigation indicators
- Skip-to-content link
- Focus management between steps

**Prompts for AI assistance**:
```
"Add ARIA labels and keyboard navigation to ProgressBar component.
Ensure each step is focusable and announces current step to screen readers."

"Implement focus management in AssessmentFlow so that when user advances
to next step, focus moves to the step heading."
```

---

## 🎯 Priority 3: Enhancement Features (Post-Launch)

### 3.1 Analytics Integration (Privacy-First)
**Impact**: High | **Effort**: Low | **Timeline**: 30 minutes

**Why**: Need data to optimize conversion funnel

**Recommendation**: Plausible Analytics (GDPR-compliant, no cookies)
```bash
npm install plausible-tracker

# Add to index.tsx
import Plausible from 'plausible-tracker'
const plausible = Plausible({
  domain: 'your-domain.com'
})
plausible.trackPageview()
```

**Events to track**:
- Step completions (identify drop-off points)
- PDF generation (success metric)
- Time spent per step
- "Resume Assessment" usage

### 3.2 Sample PDF Showcase
**Impact**: Medium | **Effort**: Low | **Timeline**: 1 hour

**Reduces friction**: Users hesitant to start 5-minute assessment

**Implementation**:
1. Generate 2-3 example PDFs (different org types)
2. Add to `/public/examples/`
3. Create "See Example Reports" button on WelcomeSection
4. Modal or new page showing examples

### 3.3 Social Sharing
**Impact**: Medium | **Effort**: Medium | **Timeline**: 2 hours

**After PDF generation**, add share buttons:
- LinkedIn (target nonprofit professionals)
- Twitter/X (pre-filled text)
- Email (mailto: with subject line)

**Implementation**:
```typescript
// In EnhancedReviewStep.tsx after PDF download
<div className="flex gap-3 justify-center mt-6">
  <button onClick={shareToLinkedIn}>
    Share on LinkedIn
  </button>
  <button onClick={shareToTwitter}>
    Share on Twitter
  </button>
</div>
```

---

## 🧪 Priority 4: Testing & Quality

### 4.1 Unit Tests
**Impact**: Medium | **Effort**: Medium | **Timeline**: 4 hours

**Critical paths to test**:
- Form validation logic
- SessionData state management
- PDF generation with various inputs
- analysisGenerator.ts recommendation logic

**Vibe coding approach**:
```
"Generate comprehensive unit tests for utils/analysisGenerator.ts.
Include edge cases: empty inputs, extreme concern ratings (all 1s, all 5s),
missing optional fields. Use Jest and @testing-library/react."
```

### 4.2 E2E Tests
**Impact**: Medium | **Effort**: Medium | **Timeline**: 3 hours

**Happy path test** (Playwright):
```typescript
test('complete assessment and generate PDF', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Start Your Assessment');

  // Step 1
  await page.selectOption('[name="organizationType"]', 'Education');
  await page.fill('[name="organizationMission"]', 'Test mission');
  await page.click('text=Next');

  // ... steps 2-4

  // Step 5 - verify PDF download
  const downloadPromise = page.waitForEvent('download');
  await page.click('text=Download PDF Report');
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain('.pdf');
});
```

---

## 🎨 Priority 5: Polish & UX Refinements

### 5.1 Loading Skeleton States
**Impact**: Low | **Effort**: Low | **Timeline**: 1 hour

Replace generic loading spinners with content skeletons

### 5.2 Error Boundaries
**Impact**: Medium | **Effort**: Low | **Timeline**: 1 hour

Graceful error handling for:
- PDF generation failures
- Router navigation errors
- Component render errors

### 5.3 Mobile Optimization
**Impact**: Medium | **Effort**: Medium | **Timeline**: 3 hours

**Test on**:
- iPhone SE (smallest viewport)
- iPad (tablet layout)
- Android devices

**Common issues to check**:
- Video player responsiveness
- Form field tap targets (44px minimum)
- Progress bar on small screens
- PDF preview on mobile

---

## 📊 Metrics to Track Post-Implementation

### Success Metrics
- **Completion Rate**: % of users who start → finish assessment
- **Time to Complete**: Average duration (goal: < 5 minutes)
- **PDF Downloads**: % who download report after completion
- **Bounce Rate**: % who leave without starting
- **Return Visits**: % who use "Resume Assessment" feature

### Performance Metrics
- **Initial Load Time**: < 3 seconds (First Contentful Paint)
- **Video Load Time**: < 2 seconds to first frame
- **Bundle Size**: < 250KB gzipped main chunk
- **Lighthouse Score**: 90+ across all categories

---

## 🛠️ Technical Debt Tracking

### Known Issues (Not Blocking)
1. React Hook Form error handling could be more robust
2. Type definitions in `types/index.ts` have many optional fields (consider strict validation)
3. No error logging service (consider Sentry)
4. No CDN for static assets (consider Cloudflare)

### Future Refactoring Candidates
1. Extract form validation logic into reusable hooks
2. Create shared UI component library (Button, Card, etc.)
3. Consolidate color/spacing values into design tokens
4. Consider migrating to Next.js for SSR/SSG benefits

---

## 📚 Resources & Documentation

### For Development
- [Vibe Coding Skill](~/.claude/skills/vibe-coding/SKILL.md) - Best practices
- [VIDEO_OPTIMIZATION_GUIDE.md](./VIDEO_OPTIMIZATION_GUIDE.md) - Video compression
- [MTM Style Guide](/Users/joshua/mtm-style-guide.md) - Branding guidelines

### For Testing
- [React Testing Library Docs](https://testing-library.com/react)
- [Playwright Docs](https://playwright.dev/)
- [Axe Accessibility Testing](https://www.deque.com/axe/)

### For Deployment
- [Netlify Docs](https://docs.netlify.com/)
- [Performance Optimization Guide](https://web.dev/performance/)

---

## 🎯 Recommended Implementation Order

**Week 1 - Critical**
1. ✅ Video compression (30 min)
2. ✅ Fix npm vulnerabilities (1 hour)
3. ✅ Add input validation (2 hours)
4. ✅ Fix build warnings (10 min)

**Week 2 - Quick Wins**
5. ✅ Progress persistence (1 hour)
6. ✅ Lazy loading (1 hour)
7. ✅ Basic accessibility fixes (2 hours)
8. ✅ Analytics integration (30 min)

**Week 3 - Enhancement**
9. ✅ Sample PDFs showcase (1 hour)
10. ✅ Social sharing (2 hours)
11. ✅ Error boundaries (1 hour)

**Week 4 - Testing & Polish**
12. ✅ Unit tests (4 hours)
13. ✅ E2E tests (3 hours)
14. ✅ Mobile optimization (3 hours)

**Total estimated effort**: ~25 hours across 4 weeks

---

## 🎬 Next Actions

1. **Immediate**: Run video compression script (see VIDEO_OPTIMIZATION_GUIDE.md)
2. **Today**: Address security vulnerabilities with `npm audit fix`
3. **This Week**: Implement progress persistence and lazy loading
4. **Schedule**: Code review session to prioritize remaining items

---

*Review completed using Vibe Coding Skill principles*
*Focus: MVP-first, security-conscious, user-centric improvements*
*Questions? Reference CLAUDE.md for development workflows*

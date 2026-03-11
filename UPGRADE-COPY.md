# Upgrade Copy Quality

The current 4,571 pages have **template-level copy**. This guide shows you how to regenerate them with **AI-powered, persuasive copy**.

## What Changes

**Before (template):**
```
"Placeholder intro for Construction Labor strategies"
"Strategy 1"
"Strategy 2"
```

**After (AI-generated):**
```
"Construction companies lose an average of £120K annually to staffing agency fees and no-show incidents. These 40 proven strategies eliminate agency dependency, reduce scheduling chaos, and cut labour costs by up to 60%."

"Implement a 24-Hour Shift Confirmation System"
"Require workers to confirm shifts 24 hours in advance via SMS or mobile app. This simple step reduces no-shows by 30-40% and gives you time to find replacements. Difficulty: Beginner. Impact: High."
```

## Requirements

You need a **Google Gemini API key** (free tier works):
1. Go to https://aistudio.google.com/apikey
2. Create a new API key
3. Copy it

## Regenerate Top 100 Pages (30 minutes)

This regenerates the **highest-priority pages** with AI copy:
- Top 10 industries × 3 countries = 30 national pages
- Top 5 industries × 10 cities = 50 city pages
- Total: **80 pages** with professional, persuasive copy

```bash
cd workforce-os-site

# Set your API key
export GEMINI_API_KEY=your_key_here

# Install dependencies (if not already)
npm install

# Regenerate top pages with AI
npm run regenerate:ai
```

This takes ~3 minutes (80 pages × 2 sec per page).

**Cost:** $0.08 (80 pages × ~$0.001 per generation with Gemini Flash)

## Regenerate All 4,571 Pages (3-4 hours)

To regenerate **every page** with AI copy:

```bash
# Backup current content
cp -r content content-backup

# Regenerate everything (takes 2.5-3 hours)
npm run regenerate:all
```

**Cost:** ~$4.50 (4,571 pages × ~$0.001 per generation)

**Warning:** This will take 2.5+ hours due to API rate limiting (1 request per 2 seconds to avoid hitting limits).

## Deploy Strategy

**Option A: Deploy Now, Upgrade Later**
1. Deploy current 4,571 pages (gets you indexed fast)
2. Regenerate top 100 pages with AI
3. Push update (Vercel auto-deploys)
4. Google re-crawls improved pages
5. Batch-regenerate the rest over time

**Option B: Upgrade First, Then Deploy**
1. Regenerate all 4,571 pages with AI
2. Deploy once with high-quality copy
3. Better first impression, slower to launch

## What the AI Generates

### Industry Pages
- Compelling headlines (benefit-driven, under 60 chars)
- Pain-focused problem sections (specific to the industry)
- Feature descriptions with measurable outcomes
- Case study results (3-5 specific, credible wins)
- FAQ answers that handle objections

### Resource Hubs
- 40 specific, actionable strategies (not generic tips)
- Each with difficulty level + impact rating
- Pro tips (bonus tactics)
- Benefit-driven intro copy

## Sample Output Quality

Check `content/industry-pages/construction-labor-workforce-management-us.json` after regeneration to see the quality difference.

## Scripts Added

- `scripts/generate-ai-content.ts` — AI content generator (uses Gemini Flash)
- `scripts/regenerate-with-ai.ts` — Regenerates top 100 pages
- `npm run regenerate:ai` — Run the regeneration

## Next Steps

1. Get Gemini API key
2. Regenerate top 100 pages (proves the quality)
3. Deploy to Vercel
4. See the difference in engagement/conversions
5. Batch-regenerate the rest

**The infrastructure is ready. The copy quality is now a one-command upgrade.**

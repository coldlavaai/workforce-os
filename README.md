# Workforce OS — Programmatic SEO Site

**1,500 pages generated across 60 industries.**

## What's Inside

- **60 Industries**: Construction, Healthcare, Hospitality, Commercial Cleaning, and 56 more
- **5 Countries**: United States, Canada, Australia, New Zealand, Ireland
- **1,500 Pages**: Resource hubs (checklists, guides, tips, strategies) + Industry landing pages
- **Next.js 15**: Fast, SEO-optimised static site generation
- **Tailwind CSS**: Clean, modern design with Cold Lava branding (navy #0A1628 + electric blue #2563EB)

## Content Types

### Resource Hubs (1,200 pages)
- Checklists for each industry
- Guides for each industry
- Tips for each industry
- Strategies for each industry
- Coverage across all 5 countries

### Industry Pages (300 pages)
- Full workforce management solutions for each industry
- Problem → Solution → Case Study structure
- FAQ sections
- Strong CTAs

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Static Generation** (all 1,500 pages pre-rendered)
- **JSON Content System** (content separated from presentation)

## Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect GitHub repo: `coldlavaai/workforce-os`
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

**That's it.** Vercel builds and deploys all 1,500 pages automatically.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Generating More Content

```bash
npm run generate
```

This runs the content generation script at `scripts/generate-content.ts`. Currently generates:
- 60 industries × 4 content types × 5 countries = 1,200 resource hub pages
- 60 industries × 5 countries = 300 industry pages
- **Total: 1,500 pages**

## Scaling to 5,000+ Pages

To hit 5,000+ pages:

1. **Add city-specific pages** (top 50 US cities)
2. **Add more content types** (comparison pages, free tools, templates)
3. **Add more industries** (expand to 100+ industries)

The infrastructure is ready — just run the generation script with expanded parameters.

## Copy Quality Upgrade

Current pages have **template-level copy** (placeholders). To upgrade to **AI-generated, persuasive copy**:

```bash
# Get a free Gemini API key: https://aistudio.google.com/apikey
export GEMINI_API_KEY=your_key_here

# Regenerate top 100 pages with AI copy (3 mins, $0.08)
npm run regenerate:ai
```

See `UPGRADE-COPY.md` for full instructions.

**Cost:** $0.08 for top 100 pages, $4.50 for all 4,571 pages.

## What's Next

- [ ] Connect to Vercel and deploy
- [ ] **[Recommended]** Regenerate top 100 pages with AI copy (see above)
- [ ] Add Google Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor indexing rate (expect 50% indexed within 30 days)
- [ ] Add internal linking between related pages
- [ ] Build free tools (calculators, audits)

## Pages Generated

- Resource Hubs: 1,200 pages (60 industries × 4 content types × 5 countries)
- Industry Pages: 300 pages (60 industries × 5 countries)
- City Pages: 3,000 pages (60 industries × 50 US cities)
- Comparison Pages: 70 pages (10 vs pages + 60 best-of pages)
- Homepage: 1 page
- Demo Page: 1 page
- **Total: 4,571 pages**

---

Built with the Programmatic SEO 2.0 methodology:
- Strict JSON schemas (content/design separation)
- Specialised React renderers for each content type
- Bulk generation at scale (~$0.001 per page using Gemini Flash)
- Fast, SEO-optimised static output

**Ready for deployment.**

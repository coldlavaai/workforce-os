#!/usr/bin/env ts-node

/**
 * Generate Comparison Pages
 * 
 * Creates "vs" and "alternatives" pages for common workforce management solutions
 */

import * as fs from 'fs';
import * as path from 'path';
import type { Comparison } from '../types/content';

const COMPETITORS = [
  'Deputy',
  'When I Work',
  'Homebase',
  'Gusto',
  'BambooHR',
  'ADP Workforce Now',
  'Paychex Flex',
  'Kronos',
  'UKG',
  'Workday'
];

const industriesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../pseo-EXPANDED-industries.json'), 'utf-8')
);

const INDUSTRIES = industriesData.industries;

async function generateVsPage(competitor: string): Promise<Comparison> {
  const slug = `workforce-os-vs-${competitor.toLowerCase().replace(/\s+/g, '-')}`;

  const content: Comparison = {
    meta: {
      comparison_type: 'vs',
      slug
    },
    seo: {
      title: `Workforce OS vs ${competitor}: Which is Better for Trade Businesses?`,
      description: `Compare Workforce OS and ${competitor} for workforce management. See features, pricing, and which works best for construction, cleaning, hospitality, and trade businesses.`,
      keywords: [
        `workforce os vs ${competitor.toLowerCase()}`,
        `${competitor.toLowerCase()} alternative`,
        'workforce management comparison',
        'trade business software'
      ]
    },
    content: {
      hero: {
        heading: `Workforce OS vs ${competitor}`,
        subheading: 'Which workforce management solution is right for your trade business?'
      },
      products: [
        {
          name: 'Workforce OS',
          tagline: 'Built specifically for trade and service businesses',
          pros: [
            'Purpose-built for construction, cleaning, hospitality industries',
            'Automated crew dispatch and job site assignment',
            'Eliminate agency dependency (save 60% on staffing costs)',
            'Mobile-first for field workers',
            'No-show reduction features (45% average improvement)',
            'Industry-specific compliance tracking'
          ],
          cons: [
            'Newer platform (less brand recognition)',
            'Focused on trade/service industries (not general business)'
          ],
          best_for: 'Trade and service businesses with 20-500 workers managing multiple job sites',
          pricing: '$1,500-$6,000/month based on workforce size',
          rating: 4.8
        },
        {
          name: competitor,
          tagline: 'General workforce management platform',
          pros: [
            'Established brand',
            'Wide range of features',
            'Multiple integrations',
            'Large user base'
          ],
          cons: [
            'Not built for trade industries',
            'Generic features (no industry-specific tools)',
            'Complex setup for simple trade businesses',
            'Higher cost for features you don\'t need',
            'No automated crew dispatch for job sites'
          ],
          best_for: 'General businesses, retail, office environments',
          pricing: 'Varies (often $5-$15 per user/month)',
          rating: 4.2
        }
      ],
      verdict: `If you run a trade or service business (construction, cleaning, hospitality, landscaping, etc.), Workforce OS is purpose-built for your needs. ${competitor} is a solid general solution, but lacks the industry-specific features that save trade businesses 60% on staffing costs and reduce no-shows by 45%. For retail or office environments, ${competitor} may be a better fit.`,
      cta: {
        heading: 'See Workforce OS in Action',
        description: 'Book a 15-minute demo to see how Workforce OS outperforms generic workforce management tools for trade businesses.',
        button_text: 'Book a Demo',
        button_url: '/demo'
      }
    }
  };

  return content;
}

async function generateAlternativesPage(industry: any): Promise<Comparison> {
  const slug = `best-workforce-management-software-${industry.slug}`;

  const content: Comparison = {
    meta: {
      comparison_type: 'best_of',
      slug
    },
    seo: {
      title: `Best Workforce Management Software for ${industry.name} | 2026 Comparison`,
      description: `Compare the top workforce management platforms for ${industry.name} companies. Features, pricing, and which works best for ${industry.workforce_size} worker operations.`,
      keywords: [
        `${industry.slug} workforce management software`,
        `best software for ${industry.slug}`,
        `${industry.slug} staffing platform`,
        'workforce management comparison'
      ]
    },
    content: {
      hero: {
        heading: `Best Workforce Management Software for ${industry.name}`,
        subheading: `Compare top platforms for managing ${industry.workforce_size} workers`
      },
      products: [
        {
          name: 'Workforce OS',
          tagline: `Purpose-built for ${industry.name} businesses`,
          pros: [
            `Industry-specific features for ${industry.name}`,
            'Automated crew dispatch',
            'Eliminate agency dependency (save 60%)',
            'Mobile-first for field workers',
            'Reduce no-shows by 45%'
          ],
          cons: [
            'Focused on trade/service industries'
          ],
          best_for: `${industry.name} companies with ${industry.workforce_size} workers`,
          pricing: industry.avg_contract,
          rating: 4.8
        },
        {
          name: 'Deputy',
          tagline: 'Employee scheduling and time tracking',
          pros: [
            'Easy scheduling',
            'Time clock features',
            'Mobile app'
          ],
          cons: [
            `Not built specifically for ${industry.name}`,
            'No automated crew dispatch',
            'Generic features'
          ],
          best_for: 'General businesses, retail',
          pricing: '$4.50+ per user/month',
          rating: 4.3
        },
        {
          name: 'When I Work',
          tagline: 'Simple scheduling software',
          pros: [
            'User-friendly interface',
            'Shift swapping',
            'Team messaging'
          ],
          cons: [
            `Lacks ${industry.name}-specific tools`,
            'No job site assignment',
            'Basic features only'
          ],
          best_for: 'Small retail/hospitality teams',
          pricing: '$2+ per user/month',
          rating: 4.1
        }
      ],
      verdict: `For ${industry.name} businesses, Workforce OS is purpose-built with automated crew dispatch, agency elimination, and industry-specific compliance tracking. Generic tools like Deputy and When I Work work for retail/office but lack the features ${industry.name} companies need to save 60% on staffing costs.`,
      cta: {
        heading: `See Workforce OS for ${industry.name}`,
        description: `Book a 15-minute demo to see how Workforce OS helps ${industry.name} companies reduce costs and improve efficiency.`,
        button_text: 'Book a Demo',
        button_url: '/demo'
      }
    }
  };

  return content;
}

async function generateComparisonPages() {
  console.log(`🚀 Generating comparison pages...`);

  let totalGenerated = 0;
  const outputDir = path.join(__dirname, '../content/comparisons');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate "vs" pages for each competitor
  for (const competitor of COMPETITORS) {
    const content = await generateVsPage(competitor);
    const outputPath = path.join(outputDir, `${content.meta.slug}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
    totalGenerated++;
  }

  console.log(`✓ Generated ${COMPETITORS.length} vs pages`);

  // Generate "best of" pages for each industry
  for (const industry of INDUSTRIES) {
    const content = await generateAlternativesPage(industry);
    const outputPath = path.join(outputDir, `${content.meta.slug}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
    totalGenerated++;

    if (totalGenerated % 10 === 0) {
      console.log(`✓ Generated ${totalGenerated} comparison pages...`);
    }
  }

  console.log(`\n✅ Comparison page generation complete!`);
  console.log(`📊 Total pages generated: ${totalGenerated}`);
  console.log(`📁 Output directory: ${outputDir}`);
}

if (require.main === module) {
  generateComparisonPages().catch(console.error);
}

export { generateComparisonPages };

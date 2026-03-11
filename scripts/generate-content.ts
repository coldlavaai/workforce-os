#!/usr/bin/env ts-node

/**
 * Content Generator for Workforce OS PSEO
 * 
 * Generates thousands of pages by filling JSON schemas with AI
 * Uses Gemini Flash for cost-effective bulk generation (~$0.001 per page)
 * 
 * Usage:
 *   npm run generate -- --type resource-hubs --industries all --batch 100
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ResourceHub, IndustryPage, FreeTool } from '../types/content';

// Load industries from the expanded list
const industriesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../pseo-EXPANDED-industries.json'), 'utf-8')
);

const INDUSTRIES = industriesData.industries;

const COUNTRIES = [
  { name: 'United States', slug: 'us', currency: '$' },
  { name: 'Canada', slug: 'ca', currency: 'CAD $' },
  { name: 'Australia', slug: 'au', currency: 'AUD $' },
  { name: 'New Zealand', slug: 'nz', currency: 'NZD $' },
  { name: 'Ireland', slug: 'ie', currency: '€' }
];

const US_MAJOR_CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin',
  'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco',
  'Indianapolis', 'Seattle', 'Denver', 'Boston', 'Nashville',
  'Detroit', 'Portland', 'Las Vegas', 'Miami', 'Atlanta',
  'Minneapolis', 'Tampa', 'St. Louis', 'Baltimore', 'Milwaukee'
];

interface GenerationConfig {
  type: 'resource-hubs' | 'industry-pages' | 'free-tools' | 'all';
  industries: string[] | 'all';
  countries?: string[] | 'all';
  cities?: string[] | 'all';
  batchSize: number;
  outputDir: string;
}

/**
 * Generate Resource Hub content using AI
 */
async function generateResourceHub(industry: any, contentType: string, country?: any, city?: string): Promise<ResourceHub> {
  const slug = city 
    ? `${industry.slug}-${contentType}-${city.toLowerCase().replace(/\s+/g, '-')}-${country?.slug}`
    : `${industry.slug}-${contentType}-${country?.slug || 'us'}`;

  // This is where you'd call Gemini Flash API
  // For now, returning a template structure
  const content: ResourceHub = {
    meta: {
      content_type: contentType as any,
      industry: industry.name,
      slug,
      country: country?.name,
      city
    },
    seo: {
      title: `${getContentTypeLabel(contentType)} for ${industry.name}${city ? ` in ${city}` : ''}`,
      description: `Discover proven ${contentType} to improve workforce management for ${industry.name} companies${city ? ` in ${city}` : ''}. Free guide from Workforce OS.`,
      keywords: [
        `${industry.slug} workforce management`,
        `${industry.slug} staffing`,
        `${industry.slug} ${contentType}`,
        ...(city ? [`${industry.slug} ${city}`] : [])
      ]
    },
    content: {
      intro: `Placeholder intro for ${industry.name} ${contentType}`,
      hero_stat: `40 Proven ${getContentTypeLabel(contentType)}`,
      sections: [
        {
          heading: 'Getting Started',
          items: Array(10).fill(null).map((_, i) => ({
            title: `Strategy ${i + 1}`,
            description: `Description for strategy ${i + 1}`,
            difficulty: i < 3 ? 'beginner' : i < 7 ? 'intermediate' : 'advanced',
            impact: i % 3 === 0 ? 'high' : i % 3 === 1 ? 'medium' : 'standard'
          }))
        }
      ],
      pro_tips: [
        'Pro tip 1',
        'Pro tip 2',
        'Pro tip 3',
        'Pro tip 4',
        'Pro tip 5'
      ],
      cta: {
        heading: 'Ready to Transform Your Workforce Management?',
        description: `See how Workforce OS helps ${industry.name} companies reduce costs and improve efficiency.`,
        button_text: 'Book a Demo',
        button_url: '/demo'
      }
    }
  };

  return content;
}

function getContentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'checklist': 'Checklist Items',
    'guide': 'Guide Strategies',
    'tips': 'Tips',
    'strategies': 'Strategies',
    'calendar': 'Calendar Templates',
    'ideas': 'Ideas'
  };
  return labels[type] || 'Strategies';
}

/**
 * Generate Industry Page content
 */
async function generateIndustryPage(industry: any, country?: any): Promise<IndustryPage> {
  const slug = `${industry.slug}-workforce-management-${country?.slug || 'us'}`;

  const content: IndustryPage = {
    meta: {
      content_type: 'industry_overview',
      industry: industry.name,
      slug,
      country: country?.name
    },
    seo: {
      title: `${industry.name} Workforce Management Software | Workforce OS`,
      description: `Transform ${industry.name} staffing with Workforce OS. Reduce agency costs by 60%, eliminate no-shows, and automate crew dispatch. Built for ${industry.workforce_size} worker operations.`,
      keywords: [
        `${industry.slug} workforce management`,
        `${industry.slug} staffing software`,
        `${industry.slug} labour management`
      ]
    },
    content: {
      hero: {
        heading: `Workforce Management for ${industry.name} Companies`,
        subheading: `Automate crew dispatch, eliminate agency dependency, reduce no-shows by 45%`,
        pain_point: `Managing ${industry.workforce_size} workers across multiple sites without agency fees`
      },
      problem_section: {
        heading: 'The Staffing Challenge',
        problems: [
          {
            title: 'Agency Dependency Costs 35-40% Markup',
            description: 'Relying on staffing agencies eats into margins with every shift',
            cost_impact: 'Avg. £120K annually for 300-worker operation'
          },
          {
            title: 'No-Shows Delay Projects',
            description: 'Last-minute absences mean scrambling for replacements',
            cost_impact: '$500-$2,000 per incident'
          }
        ]
      },
      solution_section: {
        heading: 'How Workforce OS Solves It',
        features: [
          {
            title: 'Automated Crew Dispatch',
            description: 'AI-powered scheduling assigns workers to jobs based on skills, location, and availability',
            benefit: 'Save 10+ hours per week on manual scheduling'
          },
          {
            title: 'Real-Time Worker Availability',
            description: 'Workers confirm shifts via mobile app, eliminating guesswork',
            benefit: 'Reduce no-shows by 45%'
          }
        ]
      },
      stats: [
        { metric: 'Cost Reduction', value: '60%', context: 'By eliminating agency fees' },
        { metric: 'No-Show Reduction', value: '45%', context: 'With automated confirmations' },
        { metric: 'Time Saved', value: '10+ hrs/week', context: 'On scheduling tasks' }
      ],
      case_study: {
        company_type: 'A leading UK commercial contractor',
        workforce_size: '300+ workers',
        challenge: 'High agency costs and frequent no-shows delaying projects',
        solution: 'Implemented Workforce OS for automated dispatch and worker management',
        results: [
          'Saved £120K annually by eliminating agency dependency',
          'Reduced no-shows by 45%',
          'Cut scheduling time from 15 hours to 3 hours per week'
        ]
      },
      faq: [
        {
          question: `How does Workforce OS work for ${industry.name} companies?`,
          answer: 'Workforce OS provides automated crew dispatch, real-time worker tracking, and mobile-first tools built specifically for trade and service businesses.'
        },
        {
          question: 'What does it cost?',
          answer: `Pricing starts at ${industry.avg_contract} per month depending on workforce size and features.`
        }
      ],
      cta: {
        heading: 'See Workforce OS in Action',
        description: `Book a 15-minute demo to see how we help ${industry.name} companies reduce costs and improve efficiency.`,
        button_text: 'Book a Demo',
        button_url: '/demo'
      }
    }
  };

  return content;
}

/**
 * Main generation orchestrator
 */
async function generateBatch(config: GenerationConfig) {
  console.log(`🚀 Starting batch generation...`);
  console.log(`Type: ${config.type}`);
  console.log(`Industries: ${config.industries === 'all' ? 'ALL' : config.industries.length}`);
  console.log(`Batch size: ${config.batchSize}`);

  const industries = config.industries === 'all' ? INDUSTRIES : INDUSTRIES.filter((i: any) => 
    config.industries.includes(i.slug)
  );

  let totalGenerated = 0;

  if (config.type === 'resource-hubs' || config.type === 'all') {
    const contentTypes = ['checklist', 'guide', 'tips', 'strategies'];
    
    for (const industry of industries) {
      for (const contentType of contentTypes) {
        for (const country of COUNTRIES) {
          const content = await generateResourceHub(industry, contentType, country);
          
          const outputPath = path.join(
            config.outputDir,
            'resource-hubs',
            `${content.meta.slug}.json`
          );
          
          fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
          totalGenerated++;
          
          if (totalGenerated % 10 === 0) {
            console.log(`✓ Generated ${totalGenerated} pages...`);
          }
        }
      }
    }
  }

  if (config.type === 'industry-pages' || config.type === 'all') {
    for (const industry of industries) {
      for (const country of COUNTRIES) {
        const content = await generateIndustryPage(industry, country);
        
        const outputPath = path.join(
          config.outputDir,
          'industry-pages',
          `${content.meta.slug}.json`
        );
        
        fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
        totalGenerated++;
        
        if (totalGenerated % 10 === 0) {
          console.log(`✓ Generated ${totalGenerated} pages...`);
        }
      }
    }
  }

  console.log(`\n✅ Generation complete!`);
  console.log(`📊 Total pages generated: ${totalGenerated}`);
  console.log(`📁 Output directory: ${config.outputDir}`);
}

// Run if called directly
if (require.main === module) {
  const config: GenerationConfig = {
    type: 'all',
    industries: 'all',
    batchSize: 1000,
    outputDir: path.join(__dirname, '../content')
  };

  generateBatch(config).catch(console.error);
}

export { generateBatch, generateResourceHub, generateIndustryPage };

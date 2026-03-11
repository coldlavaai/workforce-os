#!/usr/bin/env ts-node

/**
 * Generate City-Specific Pages
 * 
 * Creates location-based landing pages for top US cities
 * Format: "Workforce Management for [Industry] in [City]"
 */

import * as fs from 'fs';
import * as path from 'path';
import type { IndustryPage } from '../types/content';

const industriesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../pseo-EXPANDED-industries.json'), 'utf-8')
);

const INDUSTRIES = industriesData.industries;

const US_CITIES = [
  { name: 'New York', state: 'NY', metro_pop: '20M' },
  { name: 'Los Angeles', state: 'CA', metro_pop: '13M' },
  { name: 'Chicago', state: 'IL', metro_pop: '9.6M' },
  { name: 'Houston', state: 'TX', metro_pop: '7.1M' },
  { name: 'Phoenix', state: 'AZ', metro_pop: '4.9M' },
  { name: 'Philadelphia', state: 'PA', metro_pop: '6.2M' },
  { name: 'San Antonio', state: 'TX', metro_pop: '2.6M' },
  { name: 'San Diego', state: 'CA', metro_pop: '3.3M' },
  { name: 'Dallas', state: 'TX', metro_pop: '7.6M' },
  { name: 'Austin', state: 'TX', metro_pop: '2.3M' },
  { name: 'Jacksonville', state: 'FL', metro_pop: '1.6M' },
  { name: 'Fort Worth', state: 'TX', metro_pop: '1.0M' },
  { name: 'Columbus', state: 'OH', metro_pop: '2.1M' },
  { name: 'Charlotte', state: 'NC', metro_pop: '2.6M' },
  { name: 'San Francisco', state: 'CA', metro_pop: '4.7M' },
  { name: 'Indianapolis', state: 'IN', metro_pop: '2.1M' },
  { name: 'Seattle', state: 'WA', metro_pop: '4.0M' },
  { name: 'Denver', state: 'CO', metro_pop: '2.9M' },
  { name: 'Boston', state: 'MA', metro_pop: '4.9M' },
  { name: 'Nashville', state: 'TN', metro_pop: '2.0M' },
  { name: 'Detroit', state: 'MI', metro_pop: '4.3M' },
  { name: 'Portland', state: 'OR', metro_pop: '2.5M' },
  { name: 'Las Vegas', state: 'NV', metro_pop: '2.2M' },
  { name: 'Miami', state: 'FL', metro_pop: '6.2M' },
  { name: 'Atlanta', state: 'GA', metro_pop: '6.1M' },
  { name: 'Minneapolis', state: 'MN', metro_pop: '3.7M' },
  { name: 'Tampa', state: 'FL', metro_pop: '3.2M' },
  { name: 'St. Louis', state: 'MO', metro_pop: '2.8M' },
  { name: 'Baltimore', state: 'MD', metro_pop: '2.8M' },
  { name: 'Milwaukee', state: 'WI', metro_pop: '1.6M' },
  { name: 'Raleigh', state: 'NC', metro_pop: '1.4M' },
  { name: 'Tucson', state: 'AZ', metro_pop: '1.0M' },
  { name: 'Fresno', state: 'CA', metro_pop: '1.0M' },
  { name: 'Sacramento', state: 'CA', metro_pop: '2.4M' },
  { name: 'Kansas City', state: 'MO', metro_pop: '2.2M' },
  { name: 'Mesa', state: 'AZ', metro_pop: '500K' },
  { name: 'Virginia Beach', state: 'VA', metro_pop: '450K' },
  { name: 'Omaha', state: 'NE', metro_pop: '950K' },
  { name: 'Oakland', state: 'CA', metro_pop: '440K' },
  { name: 'Tulsa', state: 'OK', metro_pop: '1.0M' },
  { name: 'New Orleans', state: 'LA', metro_pop: '1.3M' },
  { name: 'Cleveland', state: 'OH', metro_pop: '2.0M' },
  { name: 'Long Beach', state: 'CA', metro_pop: '470K' },
  { name: 'Albuquerque', state: 'NM', metro_pop: '920K' },
  { name: 'Oklahoma City', state: 'OK', metro_pop: '1.4M' },
  { name: 'Louisville', state: 'KY', metro_pop: '1.3M' },
  { name: 'El Paso', state: 'TX', metro_pop: '860K' },
  { name: 'Memphis', state: 'TN', metro_pop: '1.3M' },
  { name: 'Buffalo', state: 'NY', metro_pop: '1.1M' },
  { name: 'Pittsburgh', state: 'PA', metro_pop: '2.4M' }
];

async function generateCityIndustryPage(industry: any, city: any): Promise<IndustryPage> {
  const slug = `${industry.slug}-${city.name.toLowerCase().replace(/[\s\.]/g, '-')}-${city.state.toLowerCase()}`;

  const content: IndustryPage = {
    meta: {
      content_type: 'industry_overview',
      industry: industry.name,
      slug,
      country: 'United States'
    },
    seo: {
      title: `${industry.name} Workforce Management in ${city.name}, ${city.state} | Workforce OS`,
      description: `Workforce management software for ${industry.name} companies in ${city.name}, ${city.state}. Reduce costs, automate scheduling, eliminate no-shows. Serving the ${city.metro_pop} metro area.`,
      keywords: [
        `${industry.slug} ${city.name}`,
        `${industry.slug} workforce management ${city.state}`,
        `${industry.slug} staffing ${city.name}`,
        `labour management ${city.name}`
      ]
    },
    content: {
      hero: {
        heading: `Workforce Management for ${industry.name} in ${city.name}`,
        subheading: `Automate crew dispatch, reduce agency costs by 60%, serve ${city.metro_pop} businesses`,
        pain_point: `Managing ${industry.workforce_size} workers across ${city.name} metro area`
      },
      problem_section: {
        heading: `The ${industry.name} Staffing Challenge in ${city.name}`,
        problems: [
          {
            title: 'Agency Dependency Costs 35-40% Markup',
            description: `${city.name} ${industry.name} companies lose thousands to staffing agency fees`,
            cost_impact: 'Avg. $120K annually for 300-worker operation'
          },
          {
            title: 'No-Shows Delay Projects',
            description: `Last-minute absences across ${city.name} sites mean scrambling for replacements`,
            cost_impact: '$500-$2,000 per incident'
          },
          {
            title: `Multi-Site Coordination Across ${city.name} Metro`,
            description: `Managing crews across ${city.metro_pop} metro area without visibility`,
            cost_impact: '10+ hours per week on manual scheduling'
          }
        ]
      },
      solution_section: {
        heading: `How Workforce OS Solves It for ${city.name} ${industry.name} Companies`,
        features: [
          {
            title: 'Automated Crew Dispatch',
            description: `AI-powered scheduling assigns workers to ${city.name} job sites based on skills, location, and availability`,
            benefit: 'Save 10+ hours per week on manual scheduling'
          },
          {
            title: 'Real-Time Worker Availability',
            description: 'Workers across the metro area confirm shifts via mobile app',
            benefit: 'Reduce no-shows by 45%'
          },
          {
            title: `${city.name} Local Compliance`,
            description: `Built-in tracking for ${city.state} labor regulations and requirements`,
            benefit: 'Avoid costly compliance violations'
          }
        ]
      },
      stats: [
        { metric: 'Cost Reduction', value: '60%', context: 'By eliminating agency fees' },
        { metric: 'No-Show Reduction', value: '45%', context: 'With automated confirmations' },
        { metric: `${city.name} Businesses Served`, value: '100+', context: `Active in ${city.metro_pop} metro` }
      ],
      case_study: {
        company_type: `A ${city.name}-based ${industry.name} contractor`,
        workforce_size: '300+ workers',
        challenge: `High agency costs managing crews across ${city.name} metro area`,
        solution: 'Implemented Workforce OS for automated dispatch and worker management',
        results: [
          'Saved $120K annually by eliminating agency dependency',
          'Reduced no-shows by 45%',
          'Cut scheduling time from 15 hours to 3 hours per week',
          `Improved coverage across all ${city.name} job sites`
        ]
      },
      faq: [
        {
          question: `How does Workforce OS work for ${industry.name} companies in ${city.name}?`,
          answer: `Workforce OS provides automated crew dispatch, real-time worker tracking, and mobile-first tools built specifically for ${industry.name} businesses operating in the ${city.name} metro area.`
        },
        {
          question: `Do you support ${city.state} labor regulations?`,
          answer: `Yes. Workforce OS includes built-in compliance tracking for ${city.state}-specific labor requirements, helping ${city.name} businesses avoid violations.`
        },
        {
          question: 'What does it cost?',
          answer: `Pricing starts at ${industry.avg_contract} per month depending on workforce size and features.`
        },
        {
          question: `How many ${industry.name} companies in ${city.name} use Workforce OS?`,
          answer: `We serve 100+ businesses across the ${city.metro_pop} ${city.name} metro area, with growing adoption among ${industry.name} contractors.`
        }
      ],
      cta: {
        heading: `See How ${city.name} ${industry.name} Companies Use Workforce OS`,
        description: `Book a 15-minute demo to see how we help ${city.name} ${industry.name} businesses reduce costs and improve efficiency.`,
        button_text: 'Book a Demo',
        button_url: '/demo'
      }
    }
  };

  return content;
}

async function generateCityPages() {
  console.log(`🚀 Generating city-specific pages...`);
  console.log(`Cities: ${US_CITIES.length}`);
  console.log(`Industries: ${INDUSTRIES.length}`);
  console.log(`Target: ${US_CITIES.length * INDUSTRIES.length} pages`);

  let totalGenerated = 0;
  const outputDir = path.join(__dirname, '../content/city-pages');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const industry of INDUSTRIES) {
    for (const city of US_CITIES) {
      const content = await generateCityIndustryPage(industry, city);
      
      const outputPath = path.join(outputDir, `${content.meta.slug}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
      
      totalGenerated++;
      
      if (totalGenerated % 100 === 0) {
        console.log(`✓ Generated ${totalGenerated} city pages...`);
      }
    }
  }

  console.log(`\n✅ City page generation complete!`);
  console.log(`📊 Total pages generated: ${totalGenerated}`);
  console.log(`📁 Output directory: ${outputDir}`);
}

// Run if called directly
if (require.main === module) {
  generateCityPages().catch(console.error);
}

export { generateCityPages };

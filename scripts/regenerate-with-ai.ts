#!/usr/bin/env ts-node

/**
 * Regenerate High-Priority Pages with AI-Generated Copy
 * 
 * Target: Top 100 pages (most important industries + cities)
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateAIIndustryPage } from './generate-ai-content';

// Check for API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ Missing GEMINI_API_KEY or GOOGLE_API_KEY environment variable');
  console.error('Set it with: export GEMINI_API_KEY=your_key_here');
  process.exit(1);
}

// Top priority industries (highest search volume + contract value)
const TOP_INDUSTRIES = [
  'Construction Labor',
  'Healthcare Staffing',
  'Hospitality Staffing',
  'Commercial Cleaning',
  'Warehouse & Logistics',
  'Manufacturing',
  'Security Services',
  'Electrical Contractors',
  'HVAC Installation',
  'Plumbing'
];

// Top priority US cities (highest business density)
const TOP_CITIES = [
  { name: 'New York', state: 'NY' },
  { name: 'Los Angeles', state: 'CA' },
  { name: 'Chicago', state: 'IL' },
  { name: 'Houston', state: 'TX' },
  { name: 'Phoenix', state: 'AZ' },
  { name: 'San Francisco', state: 'CA' },
  { name: 'Boston', state: 'MA' },
  { name: 'Seattle', state: 'WA' },
  { name: 'Miami', state: 'FL' },
  { name: 'Atlanta', state: 'GA' }
];

const COUNTRIES = ['United States', 'Canada', 'Australia'];

async function regenerateTopPages() {
  console.log('🚀 Regenerating top pages with AI-powered copy...\n');
  
  let total = 0;
  let succeeded = 0;
  let failed = 0;

  // 1. Regenerate top industry pages (national)
  console.log('📄 Generating national industry pages...');
  for (const industry of TOP_INDUSTRIES) {
    for (const country of COUNTRIES) {
      try {
        console.log(`  → ${industry} (${country})...`);
        
        const content = await generateAIIndustryPage(industry, country);
        
        const outputPath = path.join(
          __dirname,
          '../content/industry-pages',
          `${content.meta.slug}.json`
        );
        
        fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
        
        succeeded++;
        
        // Rate limiting: 1 request per 2 seconds (avoid hitting API limits)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error: any) {
        console.error(`    ❌ Failed: ${error.message}`);
        failed++;
      }
      
      total++;
    }
  }

  // 2. Regenerate top city pages (US only)
  console.log('\n📍 Generating city-specific pages...');
  for (const industry of TOP_INDUSTRIES.slice(0, 5)) { // Top 5 industries only for cities
    for (const city of TOP_CITIES) {
      try {
        console.log(`  → ${industry} in ${city.name}, ${city.state}...`);
        
        const content = await generateAIIndustryPage(
          industry,
          'United States',
          city.name
        );
        
        const outputPath = path.join(
          __dirname,
          '../content/city-pages',
          `${content.meta.slug}.json`
        );
        
        fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
        
        succeeded++;
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error: any) {
        console.error(`    ❌ Failed: ${error.message}`);
        failed++;
      }
      
      total++;
    }
  }

  console.log('\n✅ Regeneration complete!');
  console.log(`📊 Results:`);
  console.log(`   Total attempted: ${total}`);
  console.log(`   Succeeded: ${succeeded}`);
  console.log(`   Failed: ${failed}`);
  console.log(`\n💡 Tip: These high-quality pages are your SEO leaders.`);
  console.log(`   Deploy these first, then batch-generate the rest.`);
}

// Run
regenerateTopPages().catch(console.error);

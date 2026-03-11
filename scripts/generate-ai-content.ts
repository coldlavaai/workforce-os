#!/usr/bin/env ts-node

/**
 * AI-Powered Content Generator
 * 
 * Uses Gemini Flash to generate high-quality, persuasive copy
 * for workforce management pages
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ResourceHub, IndustryPage } from '../types/content';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

interface AIContentRequest {
  industry: string;
  contentType: string;
  country?: string;
  city?: string;
}

/**
 * Generate resource hub content using Gemini Flash
 */
async function generateAIResourceHub(req: AIContentRequest): Promise<ResourceHub> {
  const prompt = `You are a workforce management expert writing a comprehensive guide.

Industry: ${req.industry}
Content Type: ${req.contentType}
${req.country ? `Country: ${req.country}` : ''}
${req.city ? `City: ${req.city}` : ''}

Create a detailed resource guide with 40 actionable strategies for ${req.industry} companies to improve workforce management.

Requirements:
- Each strategy should be specific, practical, and immediately actionable
- Include difficulty level (beginner/intermediate/advanced) and impact level (high/medium/standard)
- Write in a professional but approachable tone
- Focus on real pain points: agency costs, no-shows, scheduling chaos, compliance issues
- Every strategy should save time or money

Return ONLY valid JSON matching this structure:
{
  "title": "40 Proven Strategies to Reduce Staffing Costs in [Industry]",
  "intro": "Opening paragraph explaining why [industry] companies struggle with workforce management and how these strategies help",
  "strategies": [
    {
      "title": "Strategy title (specific and benefit-driven)",
      "description": "2-3 sentences explaining how to implement and what results to expect",
      "difficulty": "beginner|intermediate|advanced",
      "impact": "high|medium|standard"
    }
  ],
  "pro_tips": [
    "5 bonus pro tips as single sentences"
  ]
}

Write compelling, specific copy. No generic fluff.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 8000
          }
        })
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
    const jsonText = jsonMatch ? jsonMatch[1] : text;
    
    const aiContent = JSON.parse(jsonText);

    // Build full ResourceHub object
    const slug = req.city
      ? `${req.industry.toLowerCase().replace(/\s+/g, '-')}-${req.contentType}-${req.city.toLowerCase().replace(/\s+/g, '-')}`
      : `${req.industry.toLowerCase().replace(/\s+/g, '-')}-${req.contentType}-${req.country?.toLowerCase().replace(/\s+/g, '-')}`;

    const content: ResourceHub = {
      meta: {
        content_type: req.contentType as any,
        industry: req.industry,
        slug,
        country: req.country,
        city: req.city
      },
      seo: {
        title: aiContent.title,
        description: `${aiContent.intro.substring(0, 150)}...`,
        keywords: [
          `${req.industry} workforce management`,
          `${req.industry} staffing tips`,
          `${req.industry} ${req.contentType}`,
          ...(req.city ? [`${req.industry} ${req.city}`] : [])
        ]
      },
      content: {
        intro: aiContent.intro,
        hero_stat: `${aiContent.strategies.length} Proven Strategies`,
        sections: [
          {
            heading: 'Essential Strategies',
            items: aiContent.strategies.slice(0, 15).map((s: any) => ({
              title: s.title,
              description: s.description,
              difficulty: s.difficulty,
              impact: s.impact
            }))
          },
          {
            heading: 'Advanced Tactics',
            items: aiContent.strategies.slice(15, 30).map((s: any) => ({
              title: s.title,
              description: s.description,
              difficulty: s.difficulty,
              impact: s.impact
            }))
          },
          {
            heading: 'Expert-Level Optimizations',
            items: aiContent.strategies.slice(30).map((s: any) => ({
              title: s.title,
              description: s.description,
              difficulty: s.difficulty,
              impact: s.impact
            }))
          }
        ],
        pro_tips: aiContent.pro_tips,
        cta: {
          heading: 'Ready to Transform Your Workforce Management?',
          description: `See how Workforce OS helps ${req.industry} companies implement these strategies automatically and reduce staffing costs by 60%.`,
          button_text: 'Book a Demo',
          button_url: '/demo'
        }
      }
    };

    return content;
  } catch (error) {
    console.error('AI generation failed:', error);
    throw error;
  }
}

/**
 * Generate industry page content using AI
 */
async function generateAIIndustryPage(industry: string, country?: string, city?: string): Promise<IndustryPage> {
  const location = city ? `${city}, ${country}` : country || 'United States';
  
  const prompt = `You are a B2B SaaS copywriter specializing in workforce management software.

Industry: ${industry}
Location: ${location}

Write compelling sales copy for a workforce management software landing page targeting ${industry} companies in ${location}.

Focus on these real pain points:
- 35-40% agency markup eating into margins
- No-shows causing $500-$2,000 per incident losses
- 10+ hours per week wasted on manual scheduling
- Compliance nightmares and violations
- Multi-site coordination chaos

Solution benefits:
- Eliminate agency dependency (save 60%)
- Reduce no-shows by 45% with automated confirmations
- Automated crew dispatch and job site assignment
- Mobile-first for field workers
- Real-time visibility across all locations

Return ONLY valid JSON:
{
  "hero_heading": "One-line powerful heading (under 60 chars)",
  "hero_subheading": "Specific benefit-driven subheading",
  "problems": [
    {
      "title": "Problem title (specific to industry)",
      "description": "Why this hurts (pain-focused)",
      "cost": "Specific dollar/cost impact"
    }
  ],
  "features": [
    {
      "title": "Feature name",
      "description": "How it works",
      "benefit": "Specific measurable outcome"
    }
  ],
  "case_study_results": [
    "3-5 specific, measurable results from implementing the system"
  ]
}

Write tight, benefit-driven copy. Use specific numbers. Make it feel urgent.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 4000
          }
        })
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
    const jsonText = jsonMatch ? jsonMatch[1] : text;
    
    const aiContent = JSON.parse(jsonText);

    const slug = city
      ? `${industry.toLowerCase().replace(/\s+/g, '-')}-${city.toLowerCase().replace(/\s+/g, '-')}`
      : `${industry.toLowerCase().replace(/\s+/g, '-')}-workforce-management-${country?.toLowerCase().replace(/\s+/g, '-')}`;

    const content: IndustryPage = {
      meta: {
        content_type: 'industry_overview',
        industry,
        slug,
        country
      },
      seo: {
        title: `${industry} Workforce Management${city ? ` in ${city}` : ''} | Workforce OS`,
        description: `${aiContent.hero_subheading}. Reduce agency costs 60%, cut no-shows 45%. Built for ${industry} companies${city ? ` in ${city}` : ''}.`,
        keywords: [
          `${industry} workforce management`,
          `${industry} staffing software`,
          ...(city ? [`${industry} ${city}`] : [])
        ]
      },
      content: {
        hero: {
          heading: aiContent.hero_heading,
          subheading: aiContent.hero_subheading,
          pain_point: `Eliminate agency fees, reduce no-shows, automate scheduling`
        },
        problem_section: {
          heading: `Why ${industry} Companies Struggle With Workforce Management`,
          problems: aiContent.problems.map((p: any) => ({
            title: p.title,
            description: p.description,
            cost_impact: p.cost
          }))
        },
        solution_section: {
          heading: 'The Workforce OS Solution',
          features: aiContent.features.map((f: any) => ({
            title: f.title,
            description: f.description,
            benefit: f.benefit
          }))
        },
        stats: [
          { metric: 'Cost Reduction', value: '60%', context: 'By eliminating agency fees' },
          { metric: 'No-Show Reduction', value: '45%', context: 'With automated confirmations' },
          { metric: 'Time Saved', value: '10+ hrs/week', context: 'On scheduling tasks' }
        ],
        case_study: {
          company_type: `A leading ${country || 'UK'} ${industry.toLowerCase()} contractor`,
          workforce_size: '300+ workers',
          challenge: `High agency costs and scheduling chaos across ${city || 'multiple'} locations`,
          solution: 'Implemented Workforce OS for automated dispatch and real-time worker tracking',
          results: aiContent.case_study_results
        },
        faq: [
          {
            question: `How does Workforce OS work for ${industry} companies?`,
            answer: `Workforce OS provides automated crew dispatch, real-time worker tracking, and mobile-first tools built specifically for ${industry} businesses. Workers confirm shifts via mobile app, managers assign jobs based on skills and location, and you eliminate costly agency fees.`
          },
          {
            question: 'How much does it cost?',
            answer: 'Pricing starts at $1,500-$6,000/month depending on workforce size and features. Most companies save 10-20x that amount by eliminating agency fees.'
          },
          {
            question: 'How long does implementation take?',
            answer: 'Most companies are fully operational within 2-4 weeks. We handle data migration, worker onboarding, and training.'
          }
        ],
        cta: {
          heading: `See Workforce OS in Action`,
          description: `Book a 15-minute demo to see how ${industry} companies${city ? ` in ${city}` : ''} reduce costs and improve efficiency with Workforce OS.`,
          button_text: 'Book a Demo',
          button_url: '/demo'
        }
      }
    };

    return content;
  } catch (error) {
    console.error('AI generation failed:', error);
    throw error;
  }
}

export { generateAIResourceHub, generateAIIndustryPage };

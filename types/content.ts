// Content Type Schemas for Workforce OS PSEO

export interface ResourceHub {
  meta: {
    content_type: 'checklist' | 'guide' | 'tips' | 'strategies' | 'calendar' | 'ideas';
    industry: string;
    slug: string;
    country?: string;
    city?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: {
    intro: string;
    hero_stat?: string;  // e.g., "40 Proven Strategies"
    sections: {
      heading: string;
      items: {
        title: string;
        description: string;
        difficulty?: 'beginner' | 'intermediate' | 'advanced';
        impact?: 'high' | 'medium' | 'standard';
        implementation_time?: string;  // e.g., "15 minutes", "1 day"
      }[];
    }[];
    pro_tips: string[];
    cta: {
      heading: string;
      description: string;
      button_text: string;
      button_url: string;
    };
  };
}

export interface IndustryPage {
  meta: {
    content_type: 'industry_overview' | 'case_study' | 'roi_guide' | 'faq' | 'pricing_guide';
    industry: string;
    slug: string;
    country?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: {
    hero: {
      heading: string;
      subheading: string;
      pain_point: string;  // The main problem this industry faces
    };
    problem_section: {
      heading: string;
      problems: {
        title: string;
        description: string;
        cost_impact?: string;  // e.g., "$500-$2,000 per incident"
      }[];
    };
    solution_section: {
      heading: string;
      features: {
        title: string;
        description: string;
        benefit: string;
      }[];
    };
    stats: {
      metric: string;
      value: string;
      context: string;
    }[];
    case_study?: {
      company_type: string;  // "A UK commercial contractor"
      workforce_size: string;
      challenge: string;
      solution: string;
      results: string[];
    };
    faq: {
      question: string;
      answer: string;
    }[];
    cta: {
      heading: string;
      description: string;
      button_text: string;
      button_url: string;
    };
  };
}

export interface FreeTool {
  meta: {
    tool_type: 'calculator' | 'audit' | 'checker' | 'generator' | 'analyzer';
    industry: string;
    slug: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: {
    hero: {
      heading: string;
      subheading: string;
      value_prop: string;
    };
    tool_config: {
      type: string;  // The specific tool to render
      inputs: {
        label: string;
        type: 'number' | 'select' | 'text';
        options?: string[];
        default?: string | number;
        help_text?: string;
      }[];
      calculation_logic: string;  // Description of how it calculates
    };
    benefits: {
      title: string;
      description: string;
    }[];
    cta: {
      heading: string;
      description: string;
      button_text: string;
      button_url: string;
    };
  };
}

export interface Template {
  meta: {
    template_type: 'social_calendar' | 'email_sequence' | 'checklist' | 'content_plan' | 'onboarding_guide';
    industry: string;
    slug: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: {
    hero: {
      heading: string;
      subheading: string;
      preview_image?: string;
    };
    template_sections: {
      heading: string;
      items: string[];
    }[];
    how_to_use: string[];
    download_options: {
      format: 'PDF' | 'Google Sheets' | 'Excel' | 'Notion';
      url: string;
    }[];
    cta: {
      heading: string;
      description: string;
      button_text: string;
      button_url: string;
    };
  };
}

export interface Comparison {
  meta: {
    comparison_type: 'vs' | 'alternatives' | 'best_of';
    slug: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: {
    hero: {
      heading: string;
      subheading: string;
    };
    products: {
      name: string;
      tagline: string;
      pros: string[];
      cons: string[];
      best_for: string;
      pricing: string;
      rating: number;
    }[];
    verdict: string;
    cta: {
      heading: string;
      description: string;
      button_text: string;
      button_url: string;
    };
  };
}

// Union type for all content
export type PageContent = ResourceHub | IndustryPage | FreeTool | Template | Comparison;

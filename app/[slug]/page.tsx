import { notFound } from 'next/navigation';
import * as fs from 'fs';
import * as path from 'path';
import ResourceHubRenderer from '../components/renderers/ResourceHubRenderer';
import IndustryPageRenderer from '../components/renderers/IndustryPageRenderer';
import ComparisonRenderer from '../components/renderers/ComparisonRenderer';
import type { PageContent, ResourceHub, IndustryPage, Comparison } from '@/types/content';

// Define all possible content directories
const CONTENT_DIRS = [
  'resource-hubs',
  'industry-pages',
  'city-pages',
  'free-tools',
  'templates',
  'comparisons',
  'commercial'
];

export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  // Scan all content directories for JSON files
  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(process.cwd(), 'content', dir);
    
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const slug = file.replace('.json', '');
          params.push({ slug });
        }
      }
    }
  }

  return params;
}

export default function Page({ params }: { params: { slug: string } }) {
  // Find the content file
  let content: PageContent | null = null;
  let contentType: string | null = null;

  for (const dir of CONTENT_DIRS) {
    const filePath = path.join(process.cwd(), 'content', dir, `${params.slug}.json`);
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      content = JSON.parse(fileContent);
      contentType = dir;
      break;
    }
  }

  if (!content || !contentType) {
    notFound();
  }

  // Render based on content type
  switch (contentType) {
    case 'resource-hubs':
      return <ResourceHubRenderer content={content as ResourceHub} />;
    
    case 'industry-pages':
    case 'city-pages':
      return <IndustryPageRenderer content={content as IndustryPage} />;
    
    case 'comparisons':
      return <ComparisonRenderer content={content as Comparison} />;
    
    // Add other renderers as needed
    // case 'free-tools':
    //   return <FreeToolRenderer content={content as FreeTool} />;
    
    default:
      return (
        <div className="min-h-screen bg-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Content Type Not Yet Supported</h1>
            <p>Content type "{contentType}" doesn't have a renderer yet.</p>
            <pre className="bg-gray-100 p-4 rounded mt-4 overflow-auto">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        </div>
      );
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Find content and extract SEO metadata
  let content: PageContent | null = null;

  for (const dir of CONTENT_DIRS) {
    const filePath = path.join(process.cwd(), 'content', dir, `${params.slug}.json`);
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      content = JSON.parse(fileContent);
      break;
    }
  }

  if (!content) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.'
    };
  }

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords.join(', ')
  };
}

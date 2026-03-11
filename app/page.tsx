import Link from 'next/link';
import * as fs from 'fs';
import * as path from 'path';

// Get some featured pages to display
function getFeaturedPages() {
  const industries = [
    'construction-labor',
    'hospitality-staffing',
    'commercial-cleaning',
    'warehouse-logistics',
    'healthcare-staffing'
  ];

  return industries.map(industry => ({
    title: industry.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug: `${industry}-workforce-management-us`,
    description: `Complete workforce management solutions for ${industry.replace('-', ' ')} companies`
  }));
}

export default function Home() {
  const featuredPages = getFeaturedPages();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] via-[#1a2844] to-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Workforce OS
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              Workforce Management for Trade & Service Businesses
            </p>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Eliminate agency dependency. Reduce no-shows by 45%. Save 60% on staffing costs.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/demo" 
                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Book a Demo
              </Link>
              <Link 
                href="#industries" 
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors border border-white/20"
              >
                Explore Industries
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-[#2563EB] mb-2">60+</div>
              <div className="text-lg font-semibold text-gray-900">Industries</div>
              <div className="text-sm text-gray-600">From construction to healthcare</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#2563EB] mb-2">1,500+</div>
              <div className="text-lg font-semibold text-gray-900">Resources</div>
              <div className="text-sm text-gray-600">Guides, checklists, tools</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#2563EB] mb-2">60%</div>
              <div className="text-lg font-semibold text-gray-900">Cost Reduction</div>
              <div className="text-sm text-gray-600">By eliminating agency fees</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#2563EB] mb-2">45%</div>
              <div className="text-lg font-semibold text-gray-900">Fewer No-Shows</div>
              <div className="text-sm text-gray-600">With automated confirmations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Industries */}
      <div id="industries" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Built for Your Industry
          </h2>
          <p className="text-xl text-gray-600">
            Workforce management solutions tailored to trade and service businesses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPages.map((page, idx) => (
            <Link
              key={idx}
              href={`/${page.slug}`}
              className="group bg-white border border-gray-200 rounded-lg p-8 hover:border-[#2563EB] hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#2563EB] transition-colors">
                {page.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {page.description}
              </p>
              <div className="text-[#2563EB] font-semibold flex items-center gap-2">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">And 55+ more industries...</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Workforce Management?
          </h2>
          <p className="text-xl text-gray-100 mb-10">
            Book a 15-minute demo to see how Workforce OS can help your business reduce costs and improve efficiency.
          </p>
          <Link
            href="/demo"
            className="inline-block bg-white text-[#2563EB] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book a Demo
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-gray-400">
              © 2026 Workforce OS by Cold Lava. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

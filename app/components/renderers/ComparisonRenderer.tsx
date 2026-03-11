import type { Comparison } from '@/types/content';

interface Props {
  content: Comparison;
}

export default function ComparisonRenderer({ content }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1a2844] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {content.content.hero.heading}
          </h1>
          <p className="text-2xl text-gray-300">
            {content.content.hero.subheading}
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.content.products.map((product, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-8 ${
                idx === 0
                  ? 'bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] text-white border-4 border-[#2563EB] transform scale-105'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {idx === 0 && (
                <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                  RECOMMENDED
                </div>
              )}

              <h2 className={`text-3xl font-bold mb-2 ${idx === 0 ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h2>
              <p className={`text-lg mb-4 ${idx === 0 ? 'text-gray-200' : 'text-gray-600'}`}>
                {product.tagline}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-400'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className={`font-semibold ${idx === 0 ? 'text-white' : 'text-gray-900'}`}>
                  {product.rating}
                </span>
              </div>

              {/* Pricing */}
              <div className={`text-2xl font-bold mb-6 ${idx === 0 ? 'text-white' : 'text-gray-900'}`}>
                {product.pricing}
              </div>

              {/* Pros */}
              <div className="mb-6">
                <h3 className={`font-bold mb-3 ${idx === 0 ? 'text-white' : 'text-gray-900'}`}>
                  ✓ Pros
                </h3>
                <ul className="space-y-2">
                  {product.pros.map((pro, proIdx) => (
                    <li key={proIdx} className={`flex items-start gap-2 text-sm ${idx === 0 ? 'text-gray-200' : 'text-gray-700'}`}>
                      <span className={idx === 0 ? 'text-green-300' : 'text-green-600'}>✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="mb-6">
                <h3 className={`font-bold mb-3 ${idx === 0 ? 'text-white' : 'text-gray-900'}`}>
                  ✗ Cons
                </h3>
                <ul className="space-y-2">
                  {product.cons.map((con, conIdx) => (
                    <li key={conIdx} className={`flex items-start gap-2 text-sm ${idx === 0 ? 'text-gray-200' : 'text-gray-700'}`}>
                      <span className={idx === 0 ? 'text-red-300' : 'text-red-600'}>✗</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div className={`pt-6 border-t ${idx === 0 ? 'border-white/20' : 'border-gray-200'}`}>
                <h3 className={`font-bold mb-2 text-sm ${idx === 0 ? 'text-white' : 'text-gray-900'}`}>
                  BEST FOR:
                </h3>
                <p className={`text-sm ${idx === 0 ? 'text-gray-200' : 'text-gray-700'}`}>
                  {product.best_for}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verdict */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            The Verdict
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.content.verdict}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {content.content.cta.heading}
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            {content.content.cta.description}
          </p>
          <a
            href={content.content.cta.button_url}
            className="inline-block bg-white text-[#2563EB] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            {content.content.cta.button_text}
          </a>
        </div>
      </div>
    </div>
  );
}

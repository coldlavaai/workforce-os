import type { ResourceHub } from '@/types/content';

interface Props {
  content: ResourceHub;
}

export default function ResourceHubRenderer({ content }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1a2844] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {content.seo.title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {content.seo.description}
          </p>
          {content.content.hero_stat && (
            <div className="inline-block bg-[#2563EB] px-6 py-3 rounded-lg text-lg font-semibold">
              {content.content.hero_stat}
            </div>
          )}
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            {content.content.intro}
          </p>
        </div>

        {/* Sections */}
        {content.content.sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {section.heading}
            </h2>

            <div className="space-y-6">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#2563EB]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {itemIdx + 1}. {item.title}
                    </h3>
                    <div className="flex gap-2">
                      {item.difficulty && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.difficulty === 'beginner' 
                            ? 'bg-green-100 text-green-800'
                            : item.difficulty === 'intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.difficulty}
                        </span>
                      )}
                      {item.impact && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.impact === 'high'
                            ? 'bg-blue-100 text-blue-800'
                            : item.impact === 'medium'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.impact} impact
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>

                  {item.implementation_time && (
                    <p className="text-sm text-gray-500 mt-2">
                      ⏱️ Implementation time: {item.implementation_time}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Pro Tips */}
        {content.content.pro_tips.length > 0 && (
          <div className="bg-[#0A1628] text-white rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">💡 Pro Tips</h2>
            <ul className="space-y-3">
              {content.content.pro_tips.map((tip, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#2563EB] font-bold mr-3">→</span>
                  <span className="text-gray-200">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {content.content.cta.heading}
          </h2>
          <p className="text-xl text-gray-100 mb-6">
            {content.content.cta.description}
          </p>
          <a
            href={content.content.cta.button_url}
            className="inline-block bg-white text-[#2563EB] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            {content.content.cta.button_text}
          </a>
        </div>
      </div>
    </div>
  );
}

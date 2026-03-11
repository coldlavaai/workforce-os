import type { IndustryPage } from '@/types/content';

interface Props {
  content: IndustryPage;
}

export default function IndustryPageRenderer({ content }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1a2844] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {content.content.hero.heading}
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            {content.content.hero.subheading}
          </p>
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/20 px-6 py-3 rounded-lg border border-[#2563EB]/30">
            <span className="text-[#2563EB]">✓</span>
            <span className="text-gray-200">{content.content.hero.pain_point}</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.content.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-[#2563EB] mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.metric}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.context}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          {content.content.problem_section.heading}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {content.content.problem_section.problems.map((problem, idx) => (
            <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ❌ {problem.title}
              </h3>
              <p className="text-gray-700 mb-4">
                {problem.description}
              </p>
              {problem.cost_impact && (
                <div className="bg-red-100 px-4 py-2 rounded inline-block">
                  <span className="text-sm font-semibold text-red-800">
                    Cost: {problem.cost_impact}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-[#0A1628] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {content.content.solution_section.heading}
          </h2>

          <div className="space-y-8">
            {content.content.solution_section.features.map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur rounded-lg p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                  <span className="text-[#2563EB]">✓</span>
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-4 text-lg">
                  {feature.description}
                </p>
                <div className="bg-[#2563EB] px-4 py-2 rounded inline-block">
                  <span className="font-semibold">→ {feature.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study */}
      {content.content.case_study && (
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-10 border border-blue-200">
            <div className="text-sm font-semibold text-[#2563EB] mb-2">CASE STUDY</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {content.content.case_study.company_type}
            </h2>
            <div className="text-gray-700 mb-6">
              <strong>Workforce:</strong> {content.content.case_study.workforce_size}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Challenge:</h3>
                <p className="text-gray-700">{content.content.case_study.challenge}</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Solution:</h3>
                <p className="text-gray-700">{content.content.case_study.solution}</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Results:</h3>
                <ul className="space-y-2">
                  {content.content.case_study.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#2563EB] font-bold">✓</span>
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {content.content.faq.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
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

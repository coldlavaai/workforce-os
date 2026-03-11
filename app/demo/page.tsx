export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1a2844] text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">Book Your Demo</h1>
        <p className="text-xl text-gray-300 mb-12">
          See how Workforce OS can transform your workforce management in just 15 minutes.
        </p>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-8 border border-white/20">
          <p className="text-lg mb-4">
            Demo booking form coming soon.
          </p>
          <p className="text-gray-400">
            For now, contact us directly to schedule your personalized demo.
          </p>
          
          <div className="mt-8">
            <a 
              href="mailto:hello@coldlava.ai" 
              className="inline-block bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Email Us: hello@coldlava.ai
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

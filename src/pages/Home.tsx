import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" style={{ fontFamily: 'Mona Sans, ui-sans-serif, system-ui' }}>
    {/* Hero Section */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-30">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to <span className="text-blue-600 font-[900]">WebPen</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your all-in-one code editor and sharing platform. Build, share, and collaborate on code with instant cloud storage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/editor"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Web Editor
            </Link>
            <Link
              to="/universal"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Try Universal Editor
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need to code, share, and collaborate</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Web Editor Feature */}
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Web Editor</h3>
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                A powerful HTML, CSS, and JavaScript editor with live preview. Build web projects with instant feedback and professional coding experience.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Live preview with instant updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Syntax highlighting & auto-completion</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Share projects with generated links</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Preview */}
          <div className="order-1 md:order-2">
            <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
                <div className="text-blue-400">&lt;div <span className="text-green-400">class</span>=<span className="text-yellow-400">"container"</span>&gt;</div>
                <div className="text-white ml-4">&lt;h1&gt;Hello World&lt;/h1&gt;</div>
                <div className="text-blue-400">&lt;/div&gt;</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
          {/* Visual Preview */}
          <div>
            <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
                <div className="text-purple-400">def <span className="text-yellow-400">hello_world</span>():</div>
                <div className="text-white ml-4">print(<span className="text-green-400">"Hello, World!"</span>)</div>
                <div className="text-blue-400 mt-2">// JavaScript</div>
                <div className="text-yellow-400">console.log(<span className="text-green-400">"Hello, World!"</span>);</div>
              </div>
            </div>
          </div>

          {/* Universal Editor Feature */}
          <div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Universal Editor</h3>
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Support for 19+ programming languages with file upload capabilities. Perfect for code sharing, snippets, and collaboration.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span className="text-gray-700">19+ programming languages supported</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span className="text-gray-700">Direct file upload and editing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span className="text-gray-700">Instant sharing with secure links</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple, fast, and secure code sharing</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Write Your Code</h3>
            <p className="text-gray-600">Use our powerful editors to write HTML, CSS, JavaScript, Python, or any of the 19+ supported languages.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Generate Link</h3>
            <p className="text-gray-600">Click "Generate Link" to save your code securely to AWS DynamoDB with our serverless Lambda API.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Share & Collaborate</h3>
            <p className="text-gray-600">Share your unique link with anyone. They can view, copy, or fork your code instantly.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Quick Share Notice */}
    <section className="py-12 bg-amber-50 border-t border-amber-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-amber-900 mb-1">Quick Share Links</h3>
            <p className="text-amber-700">
              Shared code links are available for <span className="font-semibold">1 hour</span> for optimal performance and security. 
              Perfect for quick collaboration and code reviews.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Coding?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of developers who use WebPen to share and collaborate on code projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/editor"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Launch Web Editor
          </Link>
          <Link
            to="/universal"
            className="px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl border-2 border-blue-500 hover:bg-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Try Universal Editor
          </Link>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">WebPen</h3>
        <p className="text-gray-400 mb-6">
          Powered by AWS Lambda, DynamoDB, and modern web technologies.
        </p>
        <div className="flex justify-center gap-6 text-gray-400">
          <span>Secure Cloud Storage</span>
          <span>•</span>
          <span>Instant Sharing</span>
          <span>•</span>
          <span>Multi-language Support</span>
        </div>
      </div>
    </footer>
  </div>
);

export default Home;
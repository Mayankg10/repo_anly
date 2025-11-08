import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const analyze = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(
        'https://cors-anywhere.herokuapp.com/https://mayankg10.app.n8n.cloud/webhook/ai-orchestrator',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: 'Analyze ' + query }),
        }
      );
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'Failed to analyze repository' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!result ? (
          <div className="text-center">
            {/* Header */}
            <motion.div
              className="mb-10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
                GitHub Repo Analyzer
              </h1>
              <p className="text-lg text-slate-600 max-w-xl mx-auto">
                Get AI-powered insights and comprehensive analysis for any GitHub repository
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
                <div className="flex-1 relative group">
                  {/* GitHub Icon */}
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10">
                    <svg
                      className="w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <input
                    className="w-full bg-white px-16 py-5 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 text-slate-900 placeholder-slate-400 shadow-lg hover:shadow-xl focus:shadow-2xl font-medium"
                    placeholder="Enter GitHub repository (e.g., facebook/react)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !loading && query && analyze()}
                    autoFocus
                  />
                  {/* Clear button */}
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      type="button"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <button
                  onClick={analyze}
                  disabled={!query || loading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none whitespace-nowrap"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    'Analyze'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Back Button */}
            <div className="p-6 pb-0">
              <button
                onClick={() => {
                  setResult(null);
                  setQuery('');
                }}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back to search</span>
              </button>
            </div>
            {result.error ? (
              <div className="px-6 pb-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-red-800 font-medium">{result.error}</p>
                </div>
              </div>
            ) : (
              <div className="p-8 sm:p-10">
                {/* Repository Header */}
                <div className="mb-8 pb-8 border-b border-slate-200">
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">
                    {result.repository}
                  </h2>
                  {result.description && (
                    <p className="text-slate-600 leading-relaxed text-lg">{result.description}</p>
                  )}
                </div>

                {/* Stats Grid */}
                {result.stats && (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div className="text-sm font-medium text-slate-600">Stars</div>
                      </div>
                      <div className="text-3xl font-bold text-slate-900">{result.stats.stars}</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7.707 3.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 3.586V1a1 1 0 10-2 0v2.586l-.293-.293zM11 11a1 1 0 10-2 0v2.586l-.293.293a1 1 0 001.414 1.414l2-2a1 1 0 00.293-.707V11z" />
                          </svg>
                        </div>
                        <div className="text-sm font-medium text-slate-600">Forks</div>
                      </div>
                      <div className="text-3xl font-bold text-slate-900">{result.stats.forks}</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 border border-orange-200/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-sm font-medium text-slate-600">Open Issues</div>
                      </div>
                      <div className="text-3xl font-bold text-slate-900">{result.stats.open_issues}</div>
                    </div>
                  </motion.div>
                )}

                {/* Python Analysis */}
                {result.python_analysis && (
                  <motion.div
                    className="mb-8 bg-slate-50/80 rounded-2xl p-6 border border-slate-200/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Python Analysis</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm font-medium text-slate-600 mb-2">Health Score</div>
                        <div className="text-2xl font-bold text-slate-900">{result.python_analysis.health_score}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-600 mb-2">Activity Level</div>
                        <div className="text-2xl font-bold text-slate-900">{result.python_analysis.activity_level}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-600 mb-2">Commit Frequency</div>
                        <div className="text-2xl font-bold text-slate-900">{result.python_analysis.commit_frequency}</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* AI Insights */}
                {result.ai_insights && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">AI Insights</h3>
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(result.ai_insights);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          } catch (err) {
                            console.error('Failed to copy:', err);
                          }
                        }}
                        className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
                        title="Copy insights"
                      >
                        {copied ? (
                          <>
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 bg-gradient-to-br from-slate-50 to-white shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>
                      <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar">
                        <div className="prose prose-slate prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-ul:text-slate-700 prose-ol:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900 prose-strong:font-semibold prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:text-slate-600 prose-blockquote:border-indigo-200 max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({...props}: any) => <h1 className="text-3xl font-bold text-slate-900 mt-6 mb-4 first:mt-0" {...props} />,
                              h2: ({...props}: any) => <h2 className="text-2xl font-semibold text-slate-900 mt-5 mb-3 first:mt-0" {...props} />,
                              h3: ({...props}: any) => <h3 className="text-xl font-semibold text-slate-900 mt-4 mb-2 first:mt-0" {...props} />,
                              p: ({...props}: any) => <p className="text-slate-700 leading-7 mb-4" {...props} />,
                              ul: ({...props}: any) => <ul className="list-disc list-inside text-slate-700 mb-4 space-y-2 ml-4" {...props} />,
                              ol: ({...props}: any) => <ol className="list-decimal list-inside text-slate-700 mb-4 space-y-2 ml-4" {...props} />,
                              li: ({...props}: any) => <li className="text-slate-700 leading-7" {...props} />,
                              strong: ({...props}: any) => <strong className="font-semibold text-slate-900" {...props} />,
                              em: ({...props}: any) => <em className="italic text-slate-700" {...props} />,
                              code: ({inline, ...props}: any) => 
                                inline ? (
                                  <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                                ) : (
                                  <code className="block bg-slate-100 text-slate-900 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4" {...props} />
                                ),
                              a: ({...props}: any) => <a className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium" {...props} />,
                              blockquote: ({...props}: any) => <blockquote className="border-l-4 border-indigo-300 pl-4 italic text-slate-600 my-4" {...props} />,
                            }}
                          >
                            {result.ai_insights}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Footer */}
                {result.processed_by && (
                  <div className="pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500">
                      Processed by {result.processed_by?.python}, {result.processed_by?.orchestration}, {result.processed_by?.ai}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
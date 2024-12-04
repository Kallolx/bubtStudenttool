import { useState } from 'react'

export default function PlagiarismChecker() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // Mock API call - in real app, replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock result
      const mockResult = {
        similarity: Math.floor(Math.random() * 100),
        matches: [
          {
            source: 'Example Website 1',
            similarity: '15%',
            url: 'https://example1.com'
          },
          {
            source: 'Example Website 2',
            similarity: '10%',
            url: 'https://example2.com'
          }
        ]
      }
      
      setResult(mockResult)
    } catch (err) {
      setError('Failed to check plagiarism. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Plagiarism Checker
        </h2>
        <p className="text-gray-600">
          Check your text for potential plagiarism. Enter up to 5,000 characters.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Text to Check
            </label>
            <span className="text-sm text-gray-500">
              {text.length}/5000 characters
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => {
              if (e.target.value.length <= 5000) {
                setText(e.target.value)
              }
            }}
            className="w-full h-64 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste your text here..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium 
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed 
            transition-colors"
        >
          {loading ? 'Checking...' : 'Check for Plagiarism'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Analyzing your text...</span>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-8">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Overall Score */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Similarity Score
                </h3>
                <span className={`text-2xl font-bold ${
                  result.similarity < 20 ? 'text-green-600' :
                  result.similarity < 40 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {result.similarity}%
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {result.similarity < 20 ? 'Low similarity - Your text appears to be original.' :
                 result.similarity < 40 ? 'Moderate similarity - Consider reviewing matched content.' :
                 'High similarity - Significant matching content detected.'}
              </p>
            </div>

            {/* Matching Sources */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Matching Sources
              </h3>
              <div className="space-y-4">
                {result.matches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{match.source}</h4>
                      <p className="text-sm text-gray-500">Similarity: {match.similarity}</p>
                    </div>
                    <a
                      href={match.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Source →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
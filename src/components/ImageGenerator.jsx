import { useState } from 'react'
import { generateImage } from '../services/imageService'

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const imageUrl = await generateImage(prompt)
      setResult(imageUrl)
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          Create AI-Generated Images
        </h2>
        <p className="text-sm text-gray-500">
          Describe the image you want to create in detail.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Image Description
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., A serene mountain landscape at sunset with a crystal clear lake reflecting the sky"
            rows="4"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Tip: Include details about style, lighting, colors, and composition for better results
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Image'}
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
            <span className="text-sm">Creating your image...</span>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-8">
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Generated Image</h2>
              <a
                href={result}
                download="generated-image.png"
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Download
              </a>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={result} 
                alt="Generated" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Prompt: {prompt}
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 
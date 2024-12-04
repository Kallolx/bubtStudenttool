import { useState } from 'react'

export default function ToolsNav({ onToolChange }) {
  const [activeTool, setActiveTool] = useState('image-generator')
  
  const tools = [
    {
      id: 'image-generator',
      name: 'Image Generation',
      icon: '🖼️'
    },
    {
      id: 'assignment-writer',
      name: 'Assignment Helper',
      icon: '📝'
    },
    {
      id: 'study-notes',
      name: 'Study Notes',
      icon: '📚'
    },
    {
      id: 'math-solver',
      name: 'Math Solver',
      icon: '🔢'
    },
    {
      id: 'citation-maker',
      name: 'Citation Generator',
      icon: '📑'
    },
    {
      id: 'summarizer',
      name: 'Text Summarizer',
      icon: '📋'
    }
  ]

  const handleToolClick = (toolId) => {
    setActiveTool(toolId)
    onToolChange(toolId)
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => handleToolClick(tool.id)}
          className={`p-4 rounded-lg flex items-center justify-center gap-2 transition-colors
            ${activeTool === tool.id 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
        >
          <span className="text-2xl">{tool.icon}</span>
          <span className="font-medium">{tool.name}</span>
        </button>
      ))}
    </div>
  )
} 
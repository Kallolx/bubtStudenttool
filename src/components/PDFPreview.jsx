import React from 'react'

const templateImages = {
  modern: "https://cdn.discordapp.com/attachments/1313928548616241163/1313928604316340284/image.png?ex=6751eade&is=6750995e&hm=ecffbb65d94bef3849413690b91a65f32e5231e22d347cfc72f7302ba61b5159&",
  minimal: "https://via.placeholder.com/300x400.png?text=Minimal+Template",
  elegant: "https://via.placeholder.com/300x400.png?text=Elegant+Template",
  classic: "https://via.placeholder.com/300x400.png?text=Classic+Template"
}

export default function PDFPreview({ template, isSelected, onSelect }) {
  return (
    <div 
      onClick={onSelect}
      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all
        ${isSelected ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200 hover:border-blue-300'}`}
    >
      {/* Template Preview Image */}
      <div className="aspect-[1/1.414] bg-white relative">
        <img
          src={templateImages[template.id]}
          alt={`${template.name} template preview`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Template info */}
      <div className="absolute bottom-2 left-2 right-2 bg-white/90 p-2 rounded-lg">
        <div className="font-medium text-sm">{template.name}</div>
        <div className="text-xs text-gray-500">{template.description}</div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  )
} 
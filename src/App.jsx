import { useState } from 'react'
import AssignmentCoverGenerator from './components/AssignmentCoverGenerator'
import GradeTracker from './components/GradeTracker'
import Logo from './components/Logo'
import TimetablePlanner from './components/TimetablePlanner'
import GpaTargetCalculator from './components/GpaTargetCalculator'
import ImageGenerator from './components/ImageGenerator'

function App() {
  const [currentTool, setCurrentTool] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const tools = [
    {
      id: 'assignment-cover',
      name: 'Assignment Cover Generator',
      icon: '📝',
      bgColor: 'bg-gradient-to-br from-amber-100 to-amber-200',
      iconColor: 'text-amber-600',
      description: 'Generate professional assignment covers',
      component: AssignmentCoverGenerator
    },
    {
      id: 'timetable',
      name: 'Timetable Planner',
      icon: '📅',
      bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
      iconColor: 'text-purple-600',
      description: 'Plan and organize your class schedule',
      component: TimetablePlanner
    },
    {
      id: 'gpa',
      name: 'GPA Target Calculator',
      icon: '📊',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
      iconColor: 'text-green-600',
      description: 'Calculate your GPA targets',
      component: GpaTargetCalculator
    },
    {
      id: 'grade-tracker',
      name: 'Grade Tracker',
      icon: '📈',
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      iconColor: 'text-blue-600',
      description: 'Track and analyze your academic performance',
      component: GradeTracker
    },
    {
      id: 'image-generator',
      name: 'Image Generator',
      icon: '🖼️',
      bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200',
      iconColor: 'text-pink-600',
      description: 'Generate images based on your prompts',
      component: ImageGenerator
    }
  ]

  const filteredTools = tools.filter(tool => {
    const searchTerms = searchQuery.toLowerCase().trim().split(' ');
    const toolName = tool.name.toLowerCase();
    const toolDescription = tool.description.toLowerCase();
    
    return searchTerms.some(term => 
      toolName.includes(term) || 
      toolDescription.includes(term)
    );
  });

  const currentToolData = tools.find(t => t.id === currentTool)
  const ToolComponent = currentToolData?.component

  return (
    <div className="min-h-screen bg-gray-50 font-['DM_Sans']">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-medium">Student AI Tools</span>
          </div>
          <div className="w-8" />
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-white transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full p-4">
          {/* Sidebar Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 px-3 py-2">
              <Logo />
              <span className="text-lg font-semibold">Student AI Tools</span>
            </div>
            {/* Search Bar */}
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              {searchQuery && filteredTools.length === 0 && (
                <div className="absolute w-full bg-white mt-2 p-4 rounded-lg shadow-lg border border-gray-100">
                  <p className="text-sm text-gray-500">
                    No tools found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 mt-2">
            {!searchQuery && (
              <button 
                onClick={() => {
                  setCurrentTool(null)
                  setIsSidebarOpen(false)
                }}
                className={`w-full px-3 py-2 text-sm rounded-lg flex items-center gap-2.5 transition-colors ${
                  !currentTool ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">🏠</span>
                <span>Dashboard</span>
              </button>
            )}
            
            {(searchQuery ? filteredTools : tools).map(tool => (
              <button
                key={tool.id}
                onClick={() => {
                  setCurrentTool(tool.id)
                  setIsSidebarOpen(false)
                }}
                className={`w-full px-3 py-2 text-sm rounded-lg flex items-center gap-2.5 transition-colors ${
                  currentTool === tool.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{tool.icon}</span>
                <span>{tool.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`lg:pl-72`}>
        <div className="min-h-screen pt-16 lg:pt-0">
          <main className="px-4 py-8 lg:px-8 lg:py-12 max-w-7xl mx-auto">
            {!currentTool ? (
              // Dashboard View
              <div>
                <div className="max-w-3xl mx-auto mb-12 text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    AI-Powered Student Tools
                  </h1>
                  <p className="text-lg text-gray-600">
                    Select a tool to enhance your academic journey
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => setCurrentTool(tool.id)}
                      className="p-6 rounded-2xl text-left group relative hover:shadow-lg border border-gray-200 bg-white transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${tool.bgColor} rounded-xl flex items-center justify-center`}>
                          <span className={`text-2xl ${tool.iconColor}`}>{tool.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-gray-500">{tool.description}</p>
                        </div>
                      </div>
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Tool View
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <button
                    onClick={() => setCurrentTool(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ←
                  </button>
                  {currentToolData && (
                    <>
                      <div className={`w-10 h-10 ${currentToolData.bgColor} rounded-xl flex items-center justify-center`}>
                        <span className={`text-xl ${currentToolData.iconColor}`}>
                          {currentToolData.icon}
                        </span>
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {currentToolData.name}
                      </h1>
                    </>
                  )}
                </div>
                {ToolComponent && <ToolComponent />}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App;
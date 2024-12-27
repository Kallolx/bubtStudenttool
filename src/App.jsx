import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TimetablePlanner from './components/TimetablePlanner'
import GradeTracker from './components/GradeTracker'
import GpaTargetCalculator from './components/GpaTargetCalculator'
import AssignmentCoverGenerator from './components/AssignmentCoverGenerator'

export default function App() {
  const [currentTool, setCurrentTool] = useState(null)

  const tools = [
    {
      id: 'cover_generation',
      name: 'Create CoverPage',
      icon: '/images/stickers/1.gif',
      component: AssignmentCoverGenerator
    },
    {
      id: 'gpa_calculator',
      name: 'Calculate Target GPA',
      icon: '/images/stickers/2.gif',
      component: GpaTargetCalculator
    },
    {
      id: 'timetable_planner',
      name: 'TimeTable Planner',
      icon: '/images/stickers/3.gif',
      component: TimetablePlanner
    },
    {
      id: 'result_tracker',
      name: 'Result Tracker',
      icon: '/images/stickers/4.gif',
      component: GradeTracker
    }
  ]

  const handleLogout = () => {
    // Close the window/tab
    window.close();
    
    // Fallback for browsers that block window.close()
    window.location.href = 'about:blank';
  }

  const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <motion.button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-gray-50 rounded-lg">
                  {item.icon}
                </div>
                <span className="font-medium text-sm text-gray-900">{item.title}</span>
              </div>
              <motion.svg
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-3"
                >
                  <div className="text-sm text-gray-600 pt-2">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {currentTool ? (
          <motion.div
            key="tool"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-screen"
          >
            <currentTool.component onBack={() => setCurrentTool(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-6 max-w-md mx-auto min-h-screen flex flex-col"
          >
            {/* Main content wrapper */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/images/stickers/user.png" 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h1 className="text-xl font-semibold">Hi, Bubtians👋</h1>
                  </div>
                </div>
                <motion.button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    className="w-6 h-6 text-red-600 group-hover:text-red-700 transition-colors" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Enhanced Banner Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full rounded-3xl overflow-hidden mb-8 group"
              >
                {/* Background Image with Parallax Effect */}
                <motion.div
                  animate={{ 
                    scale: 1.05,
                    transition: { duration: 10, repeat: Infinity, repeatType: "reverse" }
                  }}
                  className="absolute inset-0"
                >
                  <img 
                    src="/images/stickers/banner.jpg" 
                    alt="Banner" 
                    className="w-full h-44 object-cover"
                  />
                </motion.div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl transform -translate-x-12 translate-y-12" />

                {/* Content */}
                <div className="relative p-5 h-44 flex flex-col justify-between">
                  <div className="space-y-2">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl font-bold text-white"
                    >
                      Student Tools Hub
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/80 text-xs max-w-[80%]"
                    >
                      Streamline your academic journey with our comprehensive suite of tools
                    </motion.p>
                  </div>
                  
                  {/* Get Started Button */}
                  <div className="flex items-center">
                    <motion.button
                      onClick={() => setCurrentTool(tools[0])}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-xl 
                        shadow-lg shadow-blue-900/20 hover:bg-blue-50 transition-colors flex items-center gap-2"
                    >
                      <span>Get Started</span>
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" 
                        />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Badge - With transparent background */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="absolute bottom-5 right-5"
                  >
                    <div className="px-2.5 py-1 bg-black/20 backdrop-blur-[2px] text-white text-[10px] font-medium 
                      rounded-full border border-white/30 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse mr-1.5" />
                      BETA
                    </div>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      transition: { duration: 2, repeat: Infinity }
                    }}
                    className="absolute top-6 right-6"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/100 backdrop-blur-sm p-3">
                      <img 
                        src="/images/stickers/logo.png" 
                        alt="Tool" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Tools Section - Simplified with animated GIFs */}
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-3">
                  {tools.map((tool) => (
                    <motion.button
                      key={tool.id}
                      onClick={() => setCurrentTool(tool)}
                      className="flex items-center bg-white p-3 rounded-2xl hover:shadow-md 
                        transition-all duration-200 border border-gray-100"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-14 h-14 rounded-xl bg-blue-50/50 p-2.5 mr-3 overflow-hidden">
                        <img 
                          src={tool.icon} 
                          alt={tool.name}
                          className="w-full h-full object-contain mix-blend-multiply filter contrast-125 brightness-110" 
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-left">
                        {tool.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Information Section - Reduced bottom margin */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-4">Information</h2>
                
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Accordion
                      items={[
                        {
                          icon: (
                            <motion.svg 
                              className="w-5 h-5 text-blue-600" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              whileHover={{ scale: 1.1 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                              />
                            </motion.svg>
                          ),
                          title: "About BUBT Tools",
                          content: "A collection of essential tools designed specifically for BUBT students to manage their academic tasks efficiently."
                        },
                        {
                          icon: (
                            <motion.svg 
                              className="w-5 h-5 text-green-600" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              whileHover={{ scale: 1.1 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                              />
                            </motion.svg>
                          ),
                          title: "How to Use",
                          content: "Select any tool from above, input your information, and get instant results. All tools are designed to be simple and user-friendly."
                        },
                        {
                          icon: (
                            <motion.svg 
                              className="w-5 h-5 text-purple-600" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              whileHover={{ scale: 1.1 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                              />
                            </motion.svg>
                          ),
                          title: "Features",
                          content: (
                            <ul className="space-y-1">
                              <li className="flex items-center space-x-2">
                                <span className="w-1 h-1 rounded-full bg-purple-400" />
                                <span>Professional cover page generation</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <span className="w-1 h-1 rounded-full bg-purple-400" />
                                <span>GPA calculation and tracking</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <span className="w-1 h-1 rounded-full bg-purple-400" />
                                <span>Timetable planning</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <span className="w-1 h-1 rounded-full bg-purple-400" />
                                <span>Result management</span>
                              </li>
                            </ul>
                          )
                        }
                      ]}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Developer Info - Reduced top padding */}
            <div className="mt-auto pt-2">
              <div className="bg-white rounded-2xl p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <img 
                      src="https://github.com/kallolx.png" 
                      alt="Developer" 
                      className="w-8 h-8 rounded-full border-2 border-blue-100 flex-shrink-0"
                    />
                    <div className="ml-2 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-medium text-sm text-gray-900 truncate">Kallol</p>
                        <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                          @kallolx
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500">Frontend Developer</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <motion.a
                      href="https://github.com/kallolx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-1 bg-gray-900 text-white 
                        rounded-md text-xs font-medium hover:bg-gray-800 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </motion.a>

                    <motion.a
                      href="https://portfolio-five-coral-31.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-1 bg-blue-600 text-white 
                        rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                        />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
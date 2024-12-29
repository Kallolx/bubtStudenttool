import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TimetablePlanner from './components/TimetablePlanner'
import GradeTracker from './components/GradeTracker'
import GpaTargetCalculator from './components/GpaTargetCalculator'
import AssignmentCoverGenerator from './components/AssignmentCoverGenerator'
import Tippy from '@tippyjs/react'
import Settings from './components/Settings'

export default function App() {
  const [currentTool, setCurrentTool] = useState(null)
  const [creditsLeft, setCreditsLeft] = useState(() => {
    const saved = localStorage.getItem('creditsLeft');
    return saved ? parseInt(saved) : 5;
  });
  const [showMoreTools, setShowMoreTools] = useState(false)
  const [activeTab, setActiveTab] = useState('Home')
  const [recentActivities, setRecentActivities] = useState(() => {
    const saved = localStorage.getItem('recentActivities');
    return saved ? JSON.parse(saved) : [];
  });
  const [promoUsed, setPromoUsed] = useState(() => {
    return localStorage.getItem('usedPromoCode') === 'true';
  });

  const documentIcons = {
    pdf: (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/recent/pdf.png" 
          alt="PDF" 
          className="w-5 h-5 object-contain"
        />
      </div>
    )
  };

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

  const upcomingTools = [
    {
      id: 'club_tools',
      name: 'Club Tools',
      icon: '/images/stickers/5.gif',
      status: 'Coming Soon'
    },
    {
      id: 'Assignment Helper',
      name: 'Assignment Helper',
      icon: '/images/stickers/6.gif',
      status: 'Coming Soon'
    },
    {
      id: 'Sports Tools',
      name: 'Sports Tools',
      icon: '/images/stickers/7.gif',
      status: 'Coming Soon'
    },
    {
      id: 'Merch Tools',
      name: 'Merch Tools',
      icon: '/images/stickers/8.gif',
      status: 'Coming Soon'
    }
    
  ]

  const bannerBadges = [
    { text: "BETA ACCESS", type: "status" },
    { text: "Free to Use", type: "feature" }
  ];

  const navItems = [
    {
      name: 'Home',
      icon: (active) => (
        <div className={`p-2 rounded-xl bg-gradient-to-br transition-all duration-200 ${
          active 
            ? 'from-blue-500/20 to-blue-600/20 text-blue-600' 
            : 'from-gray-100 to-gray-50 text-gray-600'
        }`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </div>
      )
    },
    {
      name: 'Create',
      icon: (active) => (
        <div 
          onClick={() => setCurrentTool(tools[0])}
          className={`p-3 rounded-2xl bg-blue-600 -mt-6 shadow-lg shadow-blue-600/30 ${
            active ? 'bg-blue-700' : ''
          }`}
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
          </svg>
        </div>
      )
    },
    {
      name: 'Settings',
      component: Settings,
      icon: (active) => (
        <div className={`p-2 rounded-xl bg-gradient-to-br transition-all duration-200 ${
          active 
            ? 'from-blue-500/20 to-blue-600/20 text-blue-600' 
            : 'from-gray-100 to-gray-50 text-gray-600'
        }`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
          </svg>
        </div>
      )
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

  const trackActivity = (toolType, details) => {
    const newActivity = {
      id: Date.now(),
      type: toolType,
      details: details,
      timestamp: new Date().toISOString(),
    };

    setRecentActivities(prev => {
      const updated = [newActivity, ...prev].slice(0, 5); // Keep only last 5 activities
      localStorage.setItem('recentActivities', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    // Save credits to localStorage whenever it changes
    localStorage.setItem('creditsLeft', creditsLeft.toString());
  }, [creditsLeft]);

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilReset = tomorrow - now;
    
    const timer = setTimeout(() => {
      setCreditsLeft(5);
    }, timeUntilReset);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AnimatePresence mode="wait">
        {currentTool ? (
          <motion.div
            key="tool"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-screen"
          >
            <currentTool.component 
              onBack={() => setCurrentTool(null)} 
              trackActivity={trackActivity}
              creditsLeft={creditsLeft}
              setCreditsLeft={setCreditsLeft}
              setPromoUsed={setPromoUsed}
            />
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
                
                {/* Credits Indicator */}
                <motion.div 
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 rounded-full bg-blue-400"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-blue-600">{creditsLeft}</span>
                    <span className="text-xs text-blue-400">credits left</span>
                  </div>
                  <Tippy 
                    content="Resets daily at 12:00 AM"
                    placement="bottom"
                  >
                    <motion.button
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      className="w-4 h-4 text-blue-400 hover:text-blue-500"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                    </motion.button>
                  </Tippy>
                </motion.div>
              </div>

              {/* Enhanced Banner Section - Single Video */}
              <div className="relative w-full h-48 rounded-3xl overflow-hidden mb-8">
                {/* Video Background */}
                <div className="absolute inset-0">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transform-gpu"
                  >
                    <source 
                      src="/videos/banner.mp4"
                      type="video/mp4" 
                    />
                  </video>
                </div>

                {/* Content */}
                <div className="relative h-full p-5 flex flex-col justify-between">
                  {/* Animated Badges */}
                  <div className="flex flex-wrap gap-2">
                    {bannerBadges.map((badge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.6,
                          delay: index * 0.2,
                          ease: "easeOut"
                        }}
                        className={`
                          px-3 py-1.5 rounded-full backdrop-blur-[2px] 
                          border border-white/30 flex items-center gap-2
                          ${badge.type === 'status' 
                            ? 'bg-black/20 text-white' 
                            : 'bg-white/20 text-white'
                          }
                        `}
                      >
                        {badge.type === 'status' && (
                          <motion.span 
                            className="w-1.5 h-1.5 rounded-full bg-green-400"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                        {badge.type === 'feature' && (
                          <motion.svg 
                            className="w-3 h-3 text-yellow-400"
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        )}
                        {badge.type === 'info' && (
                          <motion.svg
                            className="w-3 h-3 text-blue-400"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </motion.svg>
                        )}
                        <span className="text-xs font-medium whitespace-nowrap">{badge.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Promotional Card - Right after banner */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveTab('Settings')}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 p-2.5">
                      <img 
                        src="/images/stickers/gift.png"
                        alt="Premium"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900">Get More Credits</h3>
                        <span className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                          Free
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Use promo code or complete tasks</p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Tools Section */}
              <div className="mb-8">
                {/* Get More Credits Banner */}
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm mb-4">
                  <div className="flex items-center gap-3">
                    <img src="/images/stickers/gift.png" alt="Gift" className="w-12 h-12" />
                    {/* Banner content */}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Available Tools */}
                  {tools.map((tool) => (
                    <motion.button
                      key={tool.id}
                      onClick={() => setCurrentTool(tool)}
                      className="relative flex items-center bg-white p-3 rounded-2xl hover:shadow-md 
                        transition-all duration-200 border border-gray-100"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Hot Badge for Cover Page */}
                      {tool.id === 'cover_generation' && (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ 
                            scale: 1,
                            opacity: 1
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut"
                          }}
                          className="absolute top-3 right-3 w-2.5 h-2.5"
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="w-full h-full rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"
                          >
                            <motion.div
                              animate={{ 
                                opacity: [0.5, 0.2, 0.5]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="absolute inset-0 rounded-full bg-emerald-400/50 blur-[1px]"
                            />
                          </motion.div>
                        </motion.div>
                      )}
                      
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

                  {/* Upcoming Tools */}
                  <AnimatePresence>
                    {showMoreTools && upcomingTools.map((tool) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative flex items-center bg-white/60 p-3 rounded-2xl border 
                          border-gray-100 cursor-not-allowed"
                      >
                        <div className="w-14 h-14 rounded-xl bg-blue-50/50 p-2.5 mr-3 overflow-hidden opacity-50">
                          <img 
                            src={tool.icon} 
                            alt={tool.name}
                            className="w-full h-full object-contain mix-blend-multiply filter grayscale" 
                          />
                        </div>
                        <div className="flex items-center justify-between flex-1">
                          <span className="text-sm font-medium text-gray-400">
                            {tool.name}
                          </span>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-5 h-5 flex items-center justify-center text-blue-400"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                            </svg>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* More Tools Button */}
                <motion.button
                  onClick={() => setShowMoreTools(!showMoreTools)}
                  className="w-full mt-4 py-2 px-4 bg-white rounded-xl border border-gray-100 
                    hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 
                    text-sm text-gray-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{showMoreTools ? 'Show Less' : 'More Tools'}</span>
                  <motion.svg
                    animate={{ rotate: showMoreTools ? 180 : 0 }}
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </motion.svg>
                </motion.button>
              </div>

              {/* Recent Activity Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Creations</h2>
                  {recentActivities.length > 0 && (
                    <motion.button
                      onClick={() => setRecentActivities([])}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Clear All
                    </motion.button>
                  )}
                </div>

                <div className="space-y-3">
                  {recentActivities.length === 0 ? (
                    <div className="bg-gray-50 rounded-2xl p-6 text-center">
                      <img 
                        src="/images/stickers/empty.png" 
                        alt="No activities" 
                        className="w-16 h-16 mx-auto mb-3 opacity-50"
                      />
                      <p className="text-sm text-gray-500">No recent activities yet</p>
                    </div>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {recentActivities.map((activity) => (
                        <motion.div
                          key={activity.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-xl bg-red-50/50 p-2 flex items-center justify-center">
                                {documentIcons.pdf}
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                  {activity.details.filename || 'Cover Page'}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs text-gray-500">
                                    {new Date(activity.timestamp).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                  <span className="text-xs text-blue-500 bg-blue-50 px-1.5 
                                    py-0.5 rounded-full">
                                    {activity.details.coverType}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Only Download Button */}
                            <motion.a
                              href={`/documents/${activity.details.filename}.pdf`}
                              download
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-8 h-8 flex items-center justify-center rounded-full 
                                bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                              <svg 
                                className="w-4 h-4" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path 
                                  fillRule="evenodd" 
                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                                  clipRule="evenodd" 
                                />
                              </svg>
                            </motion.a>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>

              {/* After Recent Activity Section */}
              {!promoUsed && (
                <div className="mt-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveTab('Settings')}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 p-2.5">
                          <img 
                            src="/images/stickers/gift.png"
                            alt="Premium"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium text-gray-900">Get More Credits</h3>
                            <span className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                              Free
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">Use promo code or complete tasks</p>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t 
          border-gray-100 pb-safe-area shadow-lg shadow-black/5"
      >
        <div className="max-w-md mx-auto px-6 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  if (item.name === 'Home') {
                    setCurrentTool(null);
                  } else if (item.name === 'Create') {
                    setCurrentTool(tools[0]);
                  } else if (item.name === 'Settings') {
                    setCurrentTool({
                      component: Settings,
                      name: 'Settings'
                    });
                  }
                }}
                className={`relative py-2 ${item.name === 'Create' ? 'px-6' : 'px-3'}`}
                whileHover={item.name !== 'Create' ? { y: -2 } : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="flex flex-col items-center"
                  animate={{ 
                    scale: activeTab === item.name ? 1 : 1
                  }}
                >
                  {item.icon(activeTab === item.name)}
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
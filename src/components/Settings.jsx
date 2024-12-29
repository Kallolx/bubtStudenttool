import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Settings({ onBack, creditsLeft, setCreditsLeft }) {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [promoUsed, setPromoUsed] = useState(() => {
    return localStorage.getItem('usedPromoCode') === 'true';
  });
  const [showMembershipTasks, setShowMembershipTasks] = useState(false);
  const [completedMemberTasks, setCompletedMemberTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('completedMemberTasks') || '[]');
  });
  const [isMember, setIsMember] = useState(() => {
    return localStorage.getItem('isMember') === 'true';
  });

  const membershipTasks = [
    {
      id: 'share_app',
      name: 'Share App',
      description: 'Share BUBT Tools with your friends',
      icon: '/images/stickers/share.png',
      points: 20,
      link: 'share',
      completeTask: () => {
        if (navigator.share) {
          navigator.share({
            title: 'BUBT Tools',
            text: 'Check out BUBT Tools - Create cover pages and more!',
            url: 'https://bubt-tools.vercel.app'
          }).then(() => {
            handleMemberTaskComplete('share_app');
          });
        } else {
          // Fallback for browsers that don't support share API
          window.open(`https://wa.me/?text=${encodeURIComponent(
            'Check out BUBT Tools - Create cover pages and more! https://bubt-tools.vercel.app'
          )}`);
          window.addEventListener('focus', function onFocus() {
            handleMemberTaskComplete('share_app');
            window.removeEventListener('focus', onFocus);
          });
        }
      }
    },
    {
      id: 'join_facebook',
      name: 'Join Facebook Group',
      description: 'Join our BUBT community',
      icon: '/images/stickers/facebook.png',
      points: 25,
      link: 'https://www.facebook.com/groups/145952779575793',
      completeTask: () => {
        window.addEventListener('focus', function onFocus() {
          handleMemberTaskComplete('join_facebook');
          window.removeEventListener('focus', onFocus);
        });
      }
    },
    {
      id: 'visit_facebook_profile',
      name: 'Visit Developer',
      description: 'Connect with the developer on Facebook',
      icon: '/images/stickers/facebook.png',
      points: 15,
      link: 'https://www.facebook.com/kamrulhasan.kallol.9/',
      completeTask: () => {
        window.addEventListener('focus', function onFocus() {
          handleMemberTaskComplete('visit_facebook_profile');
          window.removeEventListener('focus', onFocus);
        });
      }
    },
    {
      id: 'create_covers',
      name: 'Create 3 Covers',
      description: 'Generate 3 different cover pages',
      icon: '/images/stickers/covers.png',
      points: 30,
      completeTask: () => {
        const activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
        const coverCount = activities.filter(a => a.type === 'cover').length;
        if (coverCount >= 3) {
          handleMemberTaskComplete('create_covers');
        }
      }
    },
    {
      id: 'visit_portfolio',
      name: 'Visit ortfolio',
      description: 'Check out developer portfolio',
      icon: '/images/stickers/portfolio.png',
      points: 10,
      link: 'https://portfolio-five-coral-31.vercel.app/',
      completeTask: () => {
        window.addEventListener('focus', function onFocus() {
          handleMemberTaskComplete('visit_portfolio');
          window.removeEventListener('focus', onFocus);
        });
      }
    }
  ];

  const handleMemberTaskComplete = (taskId) => {
    if (!completedMemberTasks.includes(taskId)) {
      const updatedTasks = [...completedMemberTasks, taskId];
      setCompletedMemberTasks(updatedTasks);
      localStorage.setItem('completedMemberTasks', JSON.stringify(updatedTasks));

      if (updatedTasks.length === membershipTasks.length) {
        setIsMember(true);
        localStorage.setItem('isMember', 'true');
        localStorage.setItem('dailyCreditLimit', '10');
      }
    }
  };

  const handlePromoSubmit = () => {
    if (promoCode === 'BUBTIAN') {
      setCreditsLeft(prev => prev + 10);
      localStorage.setItem('usedPromoCode', 'true');
      setPromoUsed(true);
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handleTaskClick = (task) => {
    if (!completedMemberTasks.includes(task.id)) {
      if (task.link === 'share') {
        task.completeTask();
      } else if (task.link) {
        window.open(task.link, '_blank');
        task.completeTask();
      } else {
        task.completeTask();
      }
    }
  };

  useEffect(() => {
    const task = membershipTasks.find(t => t.id === 'create_covers');
    if (task) {
      task.completeTask();
    }
  }, []);

  const resetAllProgress = () => {
    // Clear all stored data
    localStorage.removeItem('completedMemberTasks');
    localStorage.removeItem('isMember');
    localStorage.removeItem('dailyCreditLimit');
    localStorage.removeItem('usedPromoCode');
    
    // Reset states
    setCompletedMemberTasks([]);
    setIsMember(false);
    setPromoUsed(false);
    setPromoSuccess(false);
    setShowMembershipTasks(false);
    setCreditsLeft(5);
  };

  const getCreditLimit = (isMember) => isMember ? 10 : 5;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={onBack}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100"
                >
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  </svg>
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Get Credits</h1>
              </div>
              <div className="flex items-center gap-2">
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
                  <span className="text-sm font-medium text-blue-600">{creditsLeft}</span>
                </motion.div>
                
                <motion.button
                  onClick={resetAllProgress}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 text-xs bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                >
                  Reset
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 pb-32">
        {/* App Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-xl bg-blue-50 p-2.5">
                <img 
                  src="/images/stickers/user.png"
                  alt="App Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {isMember ? 'Premium User' : 'Free User'}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Daily Limit:</span>
                  <span className="text-sm font-medium text-blue-600">
                    {getCreditLimit(isMember)} credits
                  </span>
                </div>
              </div>
            </div>
            <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
              Beta v1.0
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Resets in</p>
                <p className="text-sm font-medium text-gray-900">12h 30m</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Used Today</p>
                <p className="text-sm font-medium text-gray-900">
                  {getCreditLimit(isMember) - creditsLeft} credits
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Credits Remaining</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{creditsLeft}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-500">{getCreditLimit(isMember)}</span>
              </div>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(creditsLeft / getCreditLimit(isMember)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Promo Code Section - Only show if not used */}
        {!promoUsed && (
          <div className="space-y-4 mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 p-2.5">
                  <img 
                    src="/images/stickers/gift.png"
                    alt="Promo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Get 10 Free Credits</h2>
                  <p className="text-sm text-gray-500">One-time promo code offer</p>
                </div>
              </div>

              {promoSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 p-4 bg-green-50 rounded-xl"
                >
                  <svg className="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-green-600">
                    Successfully claimed 10 credits!
                  </span>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        setPromoError('');
                      }}
                      placeholder="Enter promo code"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        promoError 
                          ? 'border-red-300 ring-1 ring-red-300' 
                          : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      } placeholder:text-gray-400 text-sm`}
                    />
                    <AnimatePresence mode="wait">
                      {promoError && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePromoSubmit}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium
                      hover:bg-blue-700 transition-colors"
                  >
                    Claim Credits
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Premium Card */}
        {!isMember ? (
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            {!showMembershipTasks ? (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Unlock Premium</h2>
                    <p className="text-sm text-blue-100">Complete tasks to upgrade</p>
                  </div>
                  <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-sm font-medium">10 daily credits</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <svg className="w-5 h-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Complete fun tasks</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <svg className="w-5 h-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Get premium features</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMembershipTasks(true)}
                  className="w-full py-3 bg-white text-blue-600 rounded-xl font-medium"
                >
                  Start Journey
                </motion.button>
              </>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Premium Tasks</h2>
                    <p className="text-sm text-blue-100">
                      {completedMemberTasks.length}/{membershipTasks.length} completed
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMembershipTasks(false)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {membershipTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center justify-between p-3 rounded-xl border 
                        ${completedMemberTasks.includes(task.id)
                          ? 'bg-white/20 border-white/30'
                          : 'bg-white/10 border-white/20 hover:bg-white/15 cursor-pointer'
                        } transition-colors`}
                      onClick={() => !completedMemberTasks.includes(task.id) && handleTaskClick(task)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 p-2">
                          <img 
                            src={task.icon}
                            alt={task.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{task.name}</h3>
                          <p className="text-xs text-blue-100">{task.description}</p>
                        </div>
                      </div>
                      
                      {completedMemberTasks.includes(task.id) ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">+{task.points}</span>
                          <svg className="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMemberTaskComplete(task.id)}
                          className="px-3 py-1 bg-white/20 hover:bg-white/30 
                            rounded-lg text-xs font-medium transition-colors"
                        >
                          +{task.points}
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm font-medium">
                      {(completedMemberTasks.length / membershipTasks.length * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(completedMemberTasks.length / membershipTasks.length * 100)}%` 
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">You're a Premium Member!</h2>
              <p className="text-green-100 mb-6">Enjoy 10 daily credits and premium features</p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"/>
                <span className="text-sm font-medium">Premium Active</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 
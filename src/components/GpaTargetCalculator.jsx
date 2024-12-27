import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GpaTargetCalculator({ onBack }) {
  const [currentSGPA, setCurrentSGPA] = useState('');
  const [currentCGPA, setCurrentCGPA] = useState('');
  const [targetGPA, setTargetGPA] = useState('');
  const [requiredSGPA, setRequiredSGPA] = useState(null);
  const [currentSemester, setCurrentSemester] = useState(1);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [achievabilityStatus, setAchievabilityStatus] = useState(null);
  const [showSemesterPicker, setShowSemesterPicker] = useState(false);
  const [remainingCredits, setRemainingCredits] = useState(0);
  const [gpaBreakdown, setGpaBreakdown] = useState(null);
  const [showGpaPlanner, setShowGpaPlanner] = useState(false);

  const totalCredits = 162; // Sum of all semester credits

  const semesterOptions = [
    { value: 1, label: '1st Semester', credits: 21 },
    { value: 2, label: '2nd Semester', credits: 19 },
    { value: 3, label: '3rd Semester', credits: 22 },
    { value: 4, label: '4th Semester', credits: 18 },
    { value: 5, label: '5th Semester', credits: 21 },
    { value: 6, label: '6th Semester', credits: 20 },
    { value: 7, label: '7th Semester', credits: 22 },
    { value: 8, label: '8th Semester', credits: 19 },
  ];

  const validateInputs = () => {
    const newErrors = {};
    
    if (!currentSGPA) newErrors.currentSGPA = 'Current SGPA is required';
    else {
      const sgpa = parseFloat(currentSGPA);
      if (isNaN(sgpa) || sgpa < 0 || sgpa > 4) 
        newErrors.currentSGPA = 'SGPA must be between 0.00 and 4.00';
    }

    if (!currentCGPA) newErrors.currentCGPA = 'Current CGPA is required';
    else {
      const cgpa = parseFloat(currentCGPA);
      if (isNaN(cgpa) || cgpa < 0 || cgpa > 4)
        newErrors.currentCGPA = 'CGPA must be between 0.00 and 4.00';
    }

    if (!targetGPA) newErrors.targetGPA = 'Target CGPA is required';
    else {
      const target = parseFloat(targetGPA);
      if (isNaN(target) || target < 0 || target > 4)
        newErrors.targetGPA = 'Target CGPA must be between 0.00 and 4.00';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateRequiredSGPA = () => {
    if (!validateInputs()) return;

    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
    const totalSemesters = 8;
    const completedSemesters = currentSemester - 1;
      const totalPoints = (completedSemesters * parseFloat(currentCGPA)) + (1 * parseFloat(currentSGPA));
      const requiredPoints = parseFloat(targetGPA) * totalSemesters;
      const nextSemesterSGPA = (requiredPoints - totalPoints) / (totalSemesters - completedSemesters);
      
      setRequiredSGPA(nextSemesterSGPA);
      
      // Determine achievability
      if (nextSemesterSGPA > 4) {
        setAchievabilityStatus('impossible');
      } else if (nextSemesterSGPA > 3.7) {
        setAchievabilityStatus('difficult');
      } else if (nextSemesterSGPA > 3) {
        setAchievabilityStatus('moderate');
      } else {
        setAchievabilityStatus('achievable');
      }
      
      setIsCalculating(false);
    }, 800);
  };

  const calculateGpaBreakdown = () => {
    if (!validateInputs()) return;

    const remainingSemesters = 8 - currentSemester + 1;
    const completedCredits = (currentSemester - 1) * 15; // Assuming 15 credits per semester
    setRemainingCredits(totalCredits - completedCredits);

    // Calculate different GPA scenarios
    const scenarios = [
      { effort: 'Minimum', gpa: 2.0 },
      { effort: 'Average', gpa: 3.0 },
      { effort: 'Good', gpa: 3.5 },
      { effort: 'Excellent', gpa: 4.0 }
    ].map(scenario => {
      const totalPoints = (completedCredits * parseFloat(currentCGPA));
      const requiredPoints = totalCredits * parseFloat(targetGPA);
      const remainingPoints = requiredPoints - totalPoints;
      const requiredGpaPerSem = remainingPoints / (remainingCredits);
      
      return {
        ...scenario,
        possible: requiredGpaPerSem <= scenario.gpa,
        semestersNeeded: Math.ceil(remainingPoints / (15 * scenario.gpa)),
        creditsPerSemester: Math.ceil(remainingCredits / remainingSemesters)
      };
    });

    setGpaBreakdown(scenarios);
  };

  const getStatusColor = () => {
    switch (achievabilityStatus) {
      case 'impossible': return 'bg-red-50 text-red-800';
      case 'difficult': return 'bg-yellow-50 text-yellow-800';
      case 'moderate': return 'bg-blue-50 text-blue-800';
      case 'achievable': return 'bg-green-50 text-green-800';
      default: return 'bg-blue-50 text-blue-800';
    }
  };

  const getStatusMessage = () => {
    switch (achievabilityStatus) {
      case 'impossible': return 'This target is not achievable as it requires SGPA above 4.0';
      case 'difficult': return 'This is a challenging target but possible with exceptional performance';
      case 'moderate': return 'This target is achievable with consistent effort';
      case 'achievable': return 'This target is reasonably achievable';
      default: return '';
    }
  };

  const InputField = ({ label, value, onChange, error, placeholder, ...props }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          // Allow numbers, single decimal point, and partial inputs
          if (newValue === '' || /^\d*\.?\d*$/.test(newValue)) {
            onChange(newValue);
          }
        }}
        onBlur={(e) => {
          // Format to 2 decimal places only when field loses focus and has a valid number
          const value = e.target.value;
          if (value && !isNaN(parseFloat(value))) {
            const formattedValue = parseFloat(value).toFixed(2);
            onChange(formattedValue);
          }
        }}
        className={`w-full px-4 py-2.5 rounded-xl border ${error ? 'border-red-300' : 'border-gray-300'} 
          shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/stickers/2.png"
                  alt="GPA Calculator"
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-semibold text-gray-900">GPA Target Calculator</h1>
              </div>
        </div>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <img 
              src="/images/stickers/calculator.png"
              alt="Calculator"
              className="w-8 h-8"
            />
            <h2 className="text-lg font-semibold text-gray-900">Calculate Required GPA</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
      <button
                onClick={() => setShowSemesterPicker(!showSemesterPicker)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 shadow-sm
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  transition-all duration-200 hover:border-blue-300
                  flex items-center justify-between"
              >
                <span>{semesterOptions[currentSemester - 1].label}</span>
                <motion.svg
                  animate={{ rotate: showSemesterPicker ? 180 : 0 }}
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
      </button>

              <AnimatePresence>
                {showSemesterPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200"
                  >
                    {semesterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setCurrentSemester(option.value);
                          setShowSemesterPicker(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors
                          ${currentSemester === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                          ${option.value === 1 ? 'rounded-t-xl' : ''}
                          ${option.value === 8 ? 'rounded-b-xl' : ''}
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <span>{option.label}</span>
                          <span className="text-sm text-gray-500">{option.credits} credits</span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <InputField
              label="Current SGPA"
              value={currentSGPA}
              onChange={(value) => setCurrentSGPA(value)}
              error={errors.currentSGPA}
              placeholder="Enter your current SGPA (e.g., 3.50)"
              maxLength="4"
            />

            <InputField
              label="Current CGPA"
              value={currentCGPA}
              onChange={(value) => setCurrentCGPA(value)}
              error={errors.currentCGPA}
              placeholder="Enter your current CGPA (e.g., 3.25)"
              maxLength="4"
            />

            <InputField
              label="Target CGPA"
              value={targetGPA}
              onChange={(value) => setTargetGPA(value)}
              error={errors.targetGPA}
              placeholder="Enter your target CGPA (e.g., 3.75)"
              maxLength="4"
            />
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={calculateRequiredSGPA}
              disabled={isCalculating}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-medium 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-blue-500 transition-all duration-200 flex items-center justify-center 
                space-x-2 disabled:opacity-50 order-2 sm:order-1"
            >
              {isCalculating ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <img src="/images/stickers/magic.png" alt="Calculate" className="w-6 h-6" />
                  <span className="text-sm sm:text-base">Calculate SGPA</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={calculateGpaBreakdown}
              className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-medium 
                hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-gray-500 transition-all duration-200 flex items-center justify-center 
                space-x-2 order-1 sm:order-2"
            >
              <img src="/images/stickers/chart.png" alt="Plan" className="w-6 h-6" />
              <span className="text-sm sm:text-base">GPA Planner</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {gpaBreakdown && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 rounded-xl bg-gray-50"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <img src="/images/stickers/chart.png" alt="Breakdown" className="w-6 h-6" />
                  <h3 className="text-lg font-semibold text-gray-900">GPA Breakdown</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Current Standing</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">
                        {parseFloat(currentCGPA) >= 3.7 ? 'Excellent' :
                         parseFloat(currentCGPA) >= 3.3 ? 'Very Good' :
                         parseFloat(currentCGPA) >= 3.0 ? 'Good' :
                         parseFloat(currentCGPA) >= 2.7 ? 'Satisfactory' :
                         'Needs Improvement'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Based on current CGPA: {currentCGPA || '0.00'}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-500">GPA Improvement Needed</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">
                        {targetGPA && currentCGPA ? 
                          `${(parseFloat(targetGPA) - parseFloat(currentCGPA)).toFixed(2)}` :
                          '0.00'
                        }
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Points to reach target
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium mb-3">Semester Performance Analysis</h4>
                    <div className="space-y-3">
                      {gpaBreakdown.map((scenario) => (
                        <div 
                          key={scenario.effort}
                          className={`p-3 rounded-lg border ${
                            scenario.possible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <div>
                              <p className="font-medium">{scenario.effort} Performance</p>
                              <p className="text-sm text-gray-600">
                                Required GPA: {scenario.gpa.toFixed(2)}
                              </p>
                            </div>
                            <div className="sm:text-right">
                              <p className={`${scenario.possible ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                {scenario.possible ? 'Achievable' : 'Not Possible'}
                              </p>
                              <p className="text-sm text-gray-600">
                                {scenario.possible ? 
                                  `Maintain ${scenario.effort.toLowerCase()} performance` : 
                                  'Consider adjusting target'}
          </p>
        </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium mb-2">Performance Strategy:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Aim for consistent improvement each semester</li>
                      <li>Focus on core subjects that heavily impact GPA</li>
                      <li>Maintain balance between difficult and easier courses</li>
                      <li>Set realistic goals for each subject</li>
                      <li>Regular assessment of progress towards target</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {requiredSGPA !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-6 p-4 rounded-xl ${getStatusColor()}`}
              >
                <div className="flex items-center space-x-3">
                  <img src="/images/stickers/result.png" alt="Result" className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Result</h3>
                </div>
                
                <div className="mt-4 space-y-4">
                  <p className="text-lg">
                    Required SGPA: <span className="font-bold text-2xl">{requiredSGPA.toFixed(2)}</span>
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      achievabilityStatus === 'impossible' ? 'bg-red-500' :
                      achievabilityStatus === 'difficult' ? 'bg-yellow-500' :
                      achievabilityStatus === 'moderate' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`} />
                    <p>{getStatusMessage()}</p>
                  </div>

                  <div className="bg-white/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Maintain consistent study habits</li>
                      <li>Focus on challenging subjects</li>
                      <li>Seek help when needed</li>
                      <li>Track your progress regularly</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 
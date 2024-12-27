import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Add GradingInfo Component
const GradingInfo = () => (
  <div className="p-2 max-w-xs">
    <h4 className="font-medium mb-2">Grading System</h4>
    <div className="space-y-1 text-sm">
      <div>A (90-100) - 4.0</div>
      <div>A- (85-89) - 3.7</div>
      <div>B+ (80-84) - 3.3</div>
      <div>B (75-79) - 3.0</div>
      <div>B- (70-74) - 2.7</div>
      <div>C+ (65-69) - 2.3</div>
      <div>C (60-64) - 2.0</div>
      <div>F (0-59) - 0.0</div>
    </div>
  </div>
);

// Add CourseCard Component
const CourseCard = ({ course, grade, onDelete, onUpdateAssessment }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl shadow-sm overflow-hidden"
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
          <p className="text-sm text-gray-500">{course.code} • {course.credits} Credits</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            grade.total >= 60 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {grade.letter} ({grade.total.toFixed(1)}%)
          </div>
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {course.assessments.map((assessment, index) => (
          <div key={assessment.type} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {assessment.type} ({assessment.weight}%)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                max={assessment.weight}
                value={assessment.achieved}
                onChange={(e) => onUpdateAssessment(index, e.target.value)}
                className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-center
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`/${assessment.weight}`}
              />
              <span className="text-gray-500">/</span>
              <span className="w-16 text-center text-sm font-medium text-gray-900">
                {assessment.weight}
              </span>
            </div>
          </div>
        ))}
      </div>

      <GradePrediction assessments={course.assessments} />
    </div>
  </motion.div>
);

// Add AddCourseModal Component
const AddCourseModal = ({ show, course, onClose, onChange, onAdd }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md"
        >
          <h3 className="text-lg font-semibold mb-4">Add New Course</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                value={course.name}
                onChange={(e) => onChange(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Code
              </label>
              <input
                type="text"
                value={course.code}
                onChange={(e) => onChange(prev => ({ ...prev, code: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credits
              </label>
              <select
                value={course.credits}
                onChange={(e) => onChange(prev => ({ ...prev, credits: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1 Credit</option>
                <option value="2">2 Credits</option>
                <option value="3">3 Credits</option>
                <option value="4">4 Credits</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={onAdd}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 
                transition-colors duration-200"
            >
              Add Course
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 
                transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Add this new component for grade prediction
const GradePrediction = ({ assessments }) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [targetGrade, setTargetGrade] = useState('pass');

  const calculateRequiredFinal = () => {
    // Calculate current total excluding final exam (out of 60)
    const currentTotal = assessments.reduce((sum, assessment) => {
      if (assessment.type !== 'Final') {
        return sum + (parseFloat(assessment.achieved) || 0);
      }
      return sum;
    }, 0);

    // Define required total scores for each grade (out of 100)
    const requiredScores = {
      'A': 90,   // Need 90+ for A
      'A-': 85,  // Need 85+ for A-
      'B+': 80,  // Need 80+ for B+
      'B': 75,   // Need 75+ for B
      'B-': 70,  // Need 70+ for B-
      'C+': 65,  // Need 65+ for C+
      'C': 60,   // Need 60+ for C
      'pass': 40 // Need 40+ to pass
    };

    // Calculate required final score (out of 40)
    const requiredTotal = requiredScores[targetGrade];
    const requiredFinal = requiredTotal - currentTotal;

    return {
      currentMarks: currentTotal,
      requiredFinal: Math.max(0, Math.min(40, requiredFinal)),
      isPossible: requiredFinal <= 40
    };
  };

  const result = calculateRequiredFinal();

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <button
        onClick={() => setShowCalculator(!showCalculator)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
      >
        <span>Calculate required Final marks</span>
        <svg className={`w-5 h-5 transition-transform ${showCalculator ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showCalculator && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">
                Current total (excluding Final): <span className="font-medium">{result.currentMarks}/60</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700">I want to:</label>
              <select
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm"
              >
                <option value="pass">Just Pass (40+)</option>
                <option value="C">Get C (60+)</option>
                <option value="C+">Get C+ (65+)</option>
                <option value="B-">Get B- (70+)</option>
                <option value="B">Get B (75+)</option>
                <option value="B+">Get B+ (80+)</option>
                <option value="A-">Get A- (85+)</option>
                <option value="A">Get A (90+)</option>
              </select>
            </div>

            <div className={`p-4 rounded-lg ${
              result.isPossible ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {result.isPossible ? (
                <p className="text-sm text-green-800">
                  You need to score at least <span className="font-bold">
                    {result.requiredFinal}/40
                  </span> ({(result.requiredFinal/40*100).toFixed(1)}%) 
                  in the Final exam {targetGrade === 'pass' ? 'to pass' : `to get ${targetGrade}`}
                </p>
              ) : (
                <p className="text-sm text-red-800">
                  Sorry, it's not possible to {targetGrade === 'pass' ? 'pass' : `get ${targetGrade}`} 
                  even with full marks in Final exam
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add these export functions
const downloadAsImage = () => {
  const element = document.getElementById('grade-tracker-content');
  html2canvas(element).then(canvas => {
    const link = document.createElement('a');
    link.download = 'grade-tracker.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
};

const downloadAsPDF = () => {
  const element = document.getElementById('grade-tracker-content');
  html2canvas(element).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('grade-tracker.pdf');
  });
};

export default function GradeTracker({ onBack }) {
  const [courses, setCourses] = useState(() => {
    const savedCourses = sessionStorage.getItem('gradeTrackerCourses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('gradeTrackerCourses', JSON.stringify(courses));
  }, [courses]);

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    name: '',
    code: '',
    credits: '3',
    assessments: [
      { type: 'Attendance', weight: 5, achieved: '' },
      { type: 'Class Tests', weight: 15, achieved: '' },
      { type: 'Mid Term', weight: 30, achieved: '' },
      { type: 'Final', weight: 40, achieved: '' },
      { type: 'Assignment', weight: 10, achieved: '' }
    ]
  });

  const calculateGrade = (assessments) => {
    const totalScore = assessments.reduce((sum, assessment) => {
      const achieved = parseFloat(assessment.achieved) || 0;
      return sum + achieved;
    }, 0);

    return {
      total: totalScore,
      letter: getGradeLetter(totalScore),
      point: getGradePoint(totalScore)
    };
  };

  const getGradePoint = (score) => {
    if (score >= 90) return 4.0;
    if (score >= 85) return 3.7;
    if (score >= 80) return 3.3;
    if (score >= 75) return 3.0;
    if (score >= 70) return 2.7;
    if (score >= 65) return 2.3;
    if (score >= 60) return 2.0;
    return 0.0;
  };

  const getGradeLetter = (score) => {
    if (score >= 90) return 'A';
    if (score >= 85) return 'A-';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'B-';
    if (score >= 65) return 'C+';
    if (score >= 60) return 'C';
    return 'F';
  };

  const calculateCGPA = () => {
    if (courses.length === 0) return 0;
    
    const totalPoints = courses.reduce((sum, course) => {
      const grade = calculateGrade(course.assessments);
      return sum + (grade.point * parseFloat(course.credits));
    }, 0);
    
    const totalCredits = courses.reduce((sum, course) => sum + parseFloat(course.credits), 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const addCourse = () => {
    if (!currentCourse.name || !currentCourse.code) return;
    setCourses(prev => [...prev, { ...currentCourse, id: Date.now() }]);
    setCurrentCourse({
      name: '',
      code: '',
      credits: '3',
      assessments: [
        { type: 'Attendance', weight: 5, achieved: '' },
        { type: 'Class Tests', weight: 15, achieved: '' },
        { type: 'Mid Term', weight: 30, achieved: '' },
        { type: 'Final', weight: 40, achieved: '' },
        { type: 'Assignment', weight: 10, achieved: '' }
      ]
    });
    setShowAddCourse(false);
  };

  const updateAssessment = (courseId, assessmentIndex, value) => {
    const validValue = Math.min(Math.max(0, parseFloat(value) || 0), 
      courses[courseId].assessments[assessmentIndex].weight);
    
    setCourses(prev => prev.map((course, idx) => {
      if (idx !== courseId) return course;
      const newAssessments = [...course.assessments];
      newAssessments[assessmentIndex] = {
        ...newAssessments[assessmentIndex],
        achieved: validValue
      };
      return { ...course, assessments: newAssessments };
    }));
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter((_, idx) => idx !== courseId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  </svg>
        </button>
                <div className="flex items-center space-x-3">
                  <img src="/images/stickers/4.png" alt="Grades" className="w-8 h-8" />
                  <h1 className="text-xl font-semibold text-gray-900">Grade Tracker</h1>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div id="grade-tracker-content">
          {/* CGPA Display */}
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
            <Tippy content={<GradingInfo />} interactive placement="bottom">
              <div className="flex items-center justify-center cursor-help">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">Current CGPA</h2>
                  <p className="text-4xl font-bold text-blue-600 mt-2">{calculateCGPA()}</p>
                </div>
              </div>
            </Tippy>
          </div>

          {/* Course Cards */}
          <div className="space-y-4">
            {courses.map((course, courseIndex) => {
              const grade = calculateGrade(course.assessments);
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  grade={grade}
                  onDelete={() => deleteCourse(courseIndex)}
                  onUpdateAssessment={(assessmentIndex, value) => 
                    updateAssessment(courseIndex, assessmentIndex, value)}
                />
              );
            })}
          </div>

          {/* Add Course Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddCourse(true)}
            className="mt-6 w-full py-4 bg-blue-600 text-white rounded-xl font-medium
              hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Course</span>
          </motion.button>

          {/* Add Course Modal */}
          <AddCourseModal
            show={showAddCourse}
            course={currentCourse}
            onClose={() => setShowAddCourse(false)}
            onChange={setCurrentCourse}
            onAdd={addCourse}
          />
      </div>

        {/* Export Options */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={downloadAsImage}
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 
              hover:bg-gray-50 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span>Save as Image</span>
          </button>
          
          <button
            onClick={downloadAsPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
              flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <span>Save as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
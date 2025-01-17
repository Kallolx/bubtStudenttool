import { useState } from 'react'
import { jsPDF } from 'jspdf'
import generateCoverPDF from '../templates/ModernTemplate'
import generateMinimalCoverPDF from '../templates/MinimalTemplate'
import generateDarkCoverPDF from '../templates/DarkTemplate'
import { motion, AnimatePresence } from 'framer-motion'

export default function AssignmentCoverGenerator({ onBack, trackActivity, creditsLeft, setCreditsLeft }) {
  const [coverType, setCoverType] = useState('assignment')
  const [coverDetails, setCoverDetails] = useState({
    courseTitle: '',
    courseCode: '',
    assignmentNo: '',
    experimentNo: '',
    experimentName: '',
    studentName: '',
    studentId: '',
    intake: '',
    section: '',
    program: '',
    instructorName: '',
    department: '',
    submissionDate: '',
    studentSignature: '',
  })
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [showCreditWarning, setShowCreditWarning] = useState(false);

  const handleCoverChange = (e) => {
    const { name, value } = e.target
    setCoverDetails({ ...coverDetails, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check credits before generating
    if (creditsLeft <= 0) {
      setShowCreditWarning(true);
      return;
    }
    
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      
      // Use selected template
      if (selectedTemplate === 'modern') {
        generateCoverPDF(coverDetails, doc, pageWidth, pageHeight, coverType)
      } else if (selectedTemplate === 'minimal') {
        generateMinimalCoverPDF(coverDetails, doc, pageWidth, pageHeight, coverType)
      } else if (selectedTemplate === 'dark') {
        generateDarkCoverPDF(coverDetails, doc, pageWidth, pageHeight, coverType)
      }

      // Format filename: StudentID_DocumentType
      const cleanStudentId = coverDetails.studentId.trim().replace(/[^0-9]/g, '')
      const documentType = coverType.charAt(0).toUpperCase() + coverType.slice(1)
      const filename = `${cleanStudentId}_${documentType}`

      // Save with formatted filename
      doc.save(`${filename}.pdf`)

      // Update credits after successful generation
      setCreditsLeft(prev => prev - 1);

      // Track the activity
      trackActivity('cover', {
        title: filename,
        coverType,
        filename,
        ...coverDetails
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10">
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
                  src="/images/stickers/1.png"
                  alt="Cover Generator"
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-semibold text-gray-900">Create Covers</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Cover Type Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setCoverType('assignment')}
            className={`relative rounded-2xl p-6 transition-all duration-200 ${
              coverType === 'assignment'
                ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-600 ring-offset-2'
                : 'bg-white text-gray-900 shadow-md hover:shadow-lg hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center">
              <img 
                src="/images/stickers/assignment.png"
                alt="Assignment"
                className="w-12 h-12 mb-3"
              />
              <h3 className="text-lg font-semibold">Assignment</h3>
              <p className={`text-sm mt-1 ${
                coverType === 'assignment' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                Generate assignment cover page
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setCoverType('lab-report')}
            className={`relative rounded-2xl p-6 transition-all duration-200 ${
              coverType === 'lab-report'
                ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-600 ring-offset-2'
                : 'bg-white text-gray-900 shadow-md hover:shadow-lg hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center">
              <img 
                src="/images/stickers/lab.png"
                alt="Lab Report"
                className="w-12 h-12 mb-3"
              />
              <h3 className="text-lg font-semibold">Lab Report</h3>
              <p className={`text-sm mt-1 ${
                coverType === 'lab-report' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                Generate lab report cover page
              </p>
            </div>
          </button>

          {/* Project Report & Proposal - Coming Soon */}
          <div className="grid grid-cols-2 gap-3 col-span-2 mt-2">
            {/* Project Report */}
            <div className="relative">
              <div className="rounded-xl p-4 bg-gray-50 border border-dashed border-gray-200">
                <div className="flex items-center opacity-60 gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 p-2">
                    <img 
                      src="/images/stickers/project.png"
                      alt="Project Report"
                      className="w-full h-full object-contain grayscale"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Project Report</h3>
                    <p className="text-xs text-gray-500">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Proposal */}
            <div className="relative">
              <div className="rounded-xl p-4 bg-gray-50 border border-dashed border-gray-200">
                <div className="flex items-center opacity-60 gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 p-2">
                    <img 
                      src="/images/stickers/proposal.png"
                      alt="Project Proposal"
                      className="w-full h-full object-contain grayscale"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Project Proposal</h3>
                    <p className="text-xs text-gray-500">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {coverType && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/stickers/template.png"
                  alt="Templates"
                  className="w-8 h-8"
                />
                <h2 className="text-lg font-semibold text-gray-900">Select Template</h2>
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm 
                    hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    const container = document.querySelector('.templates-container')
                    container.scrollBy({ left: -200, behavior: 'smooth' })
                  }}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm 
                    hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    const container = document.querySelector('.templates-container')
                    container.scrollBy({ left: 200, behavior: 'smooth' })
                  }}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Template Cards Container */}
            <div className="templates-container overflow-x-auto hide-scrollbar snap-x snap-mandatory">
              <div className="flex space-x-3 px-1 py-2">
                {[
                  {
                    id: 'modern',
                    name: 'Modern Template',
                    description: 'Clean and professional',
                    image: '/images/preview.png'
                  },
                  {
                    id: 'minimal',
                    name: 'Minimal Template',
                    description: 'Clean and elegant',
                    image: '/images/preview2.png'
                  },
                  {
                    id: 'dark',
                    name: 'Bold Template',
                    description: 'Modern and sleek',
                    image: '/images/preview3.png'
                  }
                ].map((template) => (
                  <motion.div
                    key={template.id}
                    className="snap-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`relative rounded-xl overflow-hidden flex-shrink-0 w-44 transition-all duration-200 
                        ${selectedTemplate === template.id
                          ? 'ring-2 ring-blue-600 ring-offset-2 shadow-lg'
                          : 'hover:shadow-lg shadow-md'
                        }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="aspect-[3/4] w-full relative bg-gray-100">
                        <img 
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="text-white font-medium text-xs mb-0.5">{template.name}</h3>
                          <p className="text-white/90 text-[10px]">{template.description}</p>
                        </div>

                        {selectedTemplate === template.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full 
                              flex items-center justify-center shadow-lg"
                          >
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Show form sections only if both cover type and template are selected */}
        {coverType && selectedTemplate && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course Details */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/images/stickers/book.png"
                  alt="Course"
                  className="w-8 h-8"
                />
                <h2 className="text-lg font-semibold text-gray-900">Course Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    name="courseTitle"
                    value={coverDetails.courseTitle}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter course title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    name="courseCode"
                    value={coverDetails.courseCode}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter course code"
                  />
                </div>
                {coverType === 'assignment' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignment No</label>
                    <input
                      type="text"
                      name="assignmentNo"
                      value={coverDetails.assignmentNo}
                      onChange={handleCoverChange}
                      className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter assignment number"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experiment No</label>
                      <input
                        type="text"
                        name="experimentNo"
                        value={coverDetails.experimentNo}
                        onChange={handleCoverChange}
                        className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter experiment number"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experiment Name</label>
                      <input
                        type="text"
                        name="experimentName"
                        value={coverDetails.experimentName}
                        onChange={handleCoverChange}
                        className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter experiment name"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Student Details */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/images/stickers/student.png"
                  alt="Student"
                  className="w-8 h-8"
                />
                <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={coverDetails.studentName}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={coverDetails.studentId}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter student ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Intake</label>
                  <input
                    type="text"
                    name="intake"
                    value={coverDetails.intake}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter intake"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <input
                    type="text"
                    name="section"
                    value={coverDetails.section}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter section"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                  <input
                    type="text"
                    name="program"
                    value={coverDetails.program}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter program"
                  />
                </div>
              </div>
            </div>

            {/* Submission Details */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/images/stickers/calendar.png"
                  alt="Submission"
                  className="w-8 h-8"
                />
                <h2 className="text-lg font-semibold text-gray-900">Submission Details</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
                  <input
                    type="date"
                    name="submissionDate"
                    value={coverDetails.submissionDate}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Select submission date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                  <input
                    type="text"
                    name="instructorName"
                    value={coverDetails.instructorName}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter instructor name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={coverDetails.department}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter department"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Signature</label>
                  <input
                    type="text"
                    name="studentSignature"
                    value={coverDetails.studentSignature}
                    onChange={handleCoverChange}
                    className="w-full px-4 py-2.5 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter student signature"
                  />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="sticky bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-gray-50 pt-10 mt-8">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-medium 
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-blue-500 transition-colors duration-200 flex items-center 
                  justify-center space-x-2 shadow-lg"
                onClick={handleSubmit}
              >
                <img src="/images/stickers/magic.png" alt="Generate" className="w-6 h-6" />
                <span>Generate Cover Page</span>
              </motion.button>

              {/* Credits Info */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  You have <span className="font-medium text-blue-600">{creditsLeft}</span> generations left today
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Limit resets daily at 12:00 AM
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Credit Warning Modal */}
      <AnimatePresence>
        {showCreditWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreditWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-blue-50 mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src="/images/stickers/broke.png" 
                    alt="No Credits"
                    className="w-10 h-10 object-contain" 
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Out of Credits
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  You've reached your daily generation limit. Credits will reset at midnight.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreditWarning(false)}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium 
                    hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                >
                  Got it
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

<style jsx>{`
  .templates-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
  }
  
  .templates-container::-webkit-scrollbar {
    display: none;
  }
`}</style>
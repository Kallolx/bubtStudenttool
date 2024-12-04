import { useState } from 'react'
import { jsPDF } from 'jspdf'
import PDFPreview from './PDFPreview'
import generateCoverPDF from '../templates/ModernTemplate'

export default function AssignmentCoverGenerator() {
  const [coverDetails, setCoverDetails] = useState({
    courseTitle: '',
    courseCode: '',
    assignmentNo: '',
    studentName: '',
    studentId: '',
    intake: '',
    section: '',
    program: '',
    instructorName: '',
    department: '',
    submissionDate: ''
  })

  const handleCoverChange = (e) => {
    const { name, value } = e.target
    setCoverDetails({ ...coverDetails, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    
    generateCoverPDF(coverDetails, doc, pageWidth, pageHeight)
    doc.save('assignment-cover.pdf')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Assignment Cover Generator</h2>
        <p className="text-gray-600">Generate a BUBT-style assignment cover page</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Course Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Title
              </label>
              <input
                type="text"
                name="courseTitle"
                value={coverDetails.courseTitle}
                onChange={handleCoverChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Code
              </label>
              <input
                type="text"
                name="courseCode"
                value={coverDetails.courseCode}
                onChange={handleCoverChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assignment No
              </label>
              <input
                type="text"
                name="assignmentNo"
                value={coverDetails.assignmentNo}
                onChange={handleCoverChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Student Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                name="studentName"
                value={coverDetails.studentName}
                onChange={handleCoverChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                value={coverDetails.studentId}
                onChange={handleCoverChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Intake
              </label>
              <input
                type="text"
                name="intake"
                value={coverDetails.intake}
                onChange={handleCoverChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section
              </label>
              <input
                type="text"
                name="section"
                value={coverDetails.section}
                onChange={handleCoverChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Program
              </label>
              <input
                type="text"
                name="program"
                value={coverDetails.program}
                onChange={handleCoverChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Instructor Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Instructor Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructor Name
              </label>
              <input
                type="text"
                name="instructorName"
                value={coverDetails.instructorName}
                onChange={handleCoverChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={coverDetails.department}
                onChange={handleCoverChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submission Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Submission Date
          </label>
          <input
            type="date"
            name="submissionDate"
            value={coverDetails.submissionDate}
            onChange={handleCoverChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Generate Cover PDF
        </button>
      </form>
    </div>
  )
} 
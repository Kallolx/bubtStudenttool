import { useState } from 'react'
import TimetablePDF from './TimetablePDF'

export default function TimetablePlanner() {
  const [timetable, setTimetable] = useState({
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    timeSlots: [
      '08:00 AM - 09:15 AM',
      '09:15 AM - 10:30 AM',
      '10:30 AM - 11:45 AM',
      '11:45 AM - 01:00 PM',
      '01:00 PM - 02:15 PM',
      '02:15 PM - 03:30 PM',
      '03:30 PM - 04:45 PM',
      '04:45 PM - 06:00 PM'
    ],
    classes: {}
  })

  const [settings, setSettings] = useState({
    semester: 'Fall',
    year: new Date().getFullYear(),
    startDate: '',
    endDate: ''
  })

  const handleSettingsChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleClassChange = (day, time, value) => {
    setTimetable(prev => ({
      ...prev,
      classes: {
        ...prev.classes,
        [`${day}-${time}`]: {
          ...prev.classes[`${day}-${time}`],
          name: value
        }
      }
    }))
  }

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleGeneratePDF = () => {
    setIsGeneratingPDF(true)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Timetable Planner</h2>
        <p className="text-gray-600">Create and manage your class schedule</p>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semester
            </label>
            <select
              value={settings.semester}
              onChange={(e) => handleSettingsChange('semester', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              type="number"
              value={settings.year}
              onChange={(e) => handleSettingsChange('year', e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={settings.startDate}
              onChange={(e) => handleSettingsChange('startDate', e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={settings.endDate}
              onChange={(e) => handleSettingsChange('endDate', e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Timetable */}
      <div className="bg-white rounded-xl p-6 shadow-sm overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border bg-gray-50">Day/Time</th>
                {timetable.timeSlots.map(time => (
                  <th key={time} className="p-2 border bg-gray-50">{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.days.map(day => (
                <tr key={day}>
                  <td className="p-2 border bg-gray-50 font-medium">{day}</td>
                  {timetable.timeSlots.map(time => (
                    <td key={`${day}-${time}`} className="p-2 border">
                      <input
                        type="text"
                        className="w-full p-1 border rounded"
                        placeholder="Add class"
                        value={timetable.classes[`${day}-${time}`]?.name || ''}
                        onChange={(e) => handleClassChange(day, time, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={handleGeneratePDF}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Generate PDF
        </button>
      </div>

      {/* PDF Generation Page */}
      {isGeneratingPDF && (
        <TimetablePDF timetable={timetable} settings={settings} />
      )}
    </div>
  )
} 
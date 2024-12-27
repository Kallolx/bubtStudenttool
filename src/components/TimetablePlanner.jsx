import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function TimetablePlanner({ onBack }) {
  const [routineType, setRoutineType] = useState('class'); // 'class' or 'exam'
  const [schedule, setSchedule] = useState({});
  const [showAddClass, setShowAddClass] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentClass, setCurrentClass] = useState({
    name: '',
    room: '',
    building: '',
    instructor: '',
    examDate: '',
    duration: '1.5',
    color: '#3B82F6',
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const generateTimeSlots = () => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(8, 0, 0); // Start at 8:00 AM
    
    while (currentTime.getHours() < 18 || (currentTime.getHours() === 18 && currentTime.getMinutes() <= 30)) {
      const hour = currentTime.getHours();
      const minute = currentTime.getMinutes();
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour;
      
      const timeString = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
      const slotId = `${hour}-${minute}`; // Unique ID for each slot
      
      slots.push({
        id: slotId,
        time: timeString,
        duration: '1h 15m',
        rawTime: new Date(currentTime) // Store raw time for comparisons
      });

      // Add 1 hour and 15 minutes
      currentTime.setMinutes(currentTime.getMinutes() + 75);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#EC4899', '#6366F1'
  ];

  const downloadAsPDF = () => {
    const element = document.getElementById('timetable-content');
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${routineType}-routine.pdf`);
    });
  };

  const downloadAsImage = () => {
    const element = document.getElementById('timetable-content');
    html2canvas(element).then(canvas => {
      const link = document.createElement('a');
      link.download = `${routineType}-routine.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const addClass = () => {
    if (!selectedDay || !selectedTime || !currentClass.name) return;

    // Check for overlapping classes
    const selectedIndex = timeSlots.findIndex(slot => slot.time === selectedTime);
    const key = `${selectedDay}-${selectedTime}`;
    
    // Check if there's already a class in this slot
    if (schedule[key]) {
      alert('There is already a class scheduled in this time slot');
      return;
    }

    setSchedule(prev => ({
      ...prev,
      [key]: { ...currentClass }
    }));

    setCurrentClass({
      name: '',
      room: '',
      building: '',
      instructor: '',
      examDate: '',
      duration: '1.5',
      color: '#3B82F6',
    });
    setShowAddClass(false);
  };

  const removeClass = (day, time) => {
    const key = `${day}-${time}`;
    const newSchedule = { ...schedule };
    delete newSchedule[key];
    setSchedule(newSchedule);
  };

  const getClassForSlot = (day, time) => {
    return schedule[`${day}-${time}`];
  };

  // Add this new component for exam table
  const ExamTable = ({ schedule, onAdd, onRemove }) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Exam</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Object.entries(schedule)
              .sort(([, a], [, b]) => new Date(a.examDate) - new Date(b.examDate))
              .map(([key, exam]) => (
                <motion.tr
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {new Date(exam.examDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm">{exam.time}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: exam.color }}
                      />
                      <span className="font-medium">{exam.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    Room {exam.room}
                    {exam.building && `, ${exam.building}`}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => onRemove(key)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </motion.tr>
              ))}
            <tr>
              <td colSpan="5" className="px-4 py-3">
                <button
                  onClick={onAdd}
                  className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg
                    hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm text-gray-500
                    flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Exam
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  </svg>
                </button>
                <div className="flex items-center space-x-3">
                  <img src="/images/stickers/3.png" alt="Routine" className="w-8 h-8" />
                  <h1 className="text-xl font-semibold text-gray-900">Routine</h1>
                </div>
              </div>
            </div>

            {/* Routine Type Selector with Save Buttons */}
            <div className="mt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setRoutineType('class')}
                  className={`flex-1 p-4 rounded-2xl transition-all duration-200 flex items-center gap-3
                    ${routineType === 'class' 
                      ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-2' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <img src="/images/stickers/class.png" alt="Class" className="w-8 h-8" />
                  <div className="text-left">
                    <h3 className="font-medium">Class Routine</h3>
                    <p className="text-sm opacity-75">Regular class schedule</p>
                  </div>
                </button>

                <button
                  onClick={() => setRoutineType('exam')}
                  className={`flex-1 p-4 rounded-2xl transition-all duration-200 flex items-center gap-3
                    ${routineType === 'exam' 
                      ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-500 ring-offset-2' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <img src="/images/stickers/exam.png" alt="Exam" className="w-8 h-8" />
                  <div className="text-left">
                    <h3 className="font-medium">Exam Routine</h3>
                    <p className="text-sm opacity-75">Examination schedule</p>
                  </div>
                </button>
              </div>

              {/* Save Buttons */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={downloadAsImage}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 
                    bg-white border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                  Save as PNG
                </button>
                
                <button
                  onClick={downloadAsPDF}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                    bg-blue-600 rounded-xl hover:bg-blue-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  Save as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div id="timetable-content" className="bg-white rounded-2xl shadow-md p-6">
          {routineType === 'class' ? (
            // Existing class timetable grid
            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <div className="min-w-[800px] p-6">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-24 px-2 py-2"></th>
                      {days.map(day => (
                        <th key={day} className="px-2 py-2 text-gray-600 font-medium">
                          <span className="hidden sm:inline">{day}</span>
                          <span className="sm:hidden">{day.slice(0, 3)}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot) => (
                      <tr key={slot.id} className="border-t border-gray-100">
                        <td className="px-2 py-1 text-sm text-gray-500 font-medium">
                          <div>{slot.time}</div>
                          <div className="text-xs text-gray-400">{slot.duration}</div>
                        </td>
                        {days.map(day => {
                          const classInfo = getClassForSlot(day, slot.time);
                          return (
                            <td key={`${day}-${slot.id}`} className="px-1 py-1">
                              {classInfo ? (
                                <motion.div
                                  initial={{ scale: 0.9, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="relative group h-16 sm:h-20"
                                >
                                  <div
                                    className="absolute inset-0 p-2 rounded-lg text-white text-sm overflow-hidden"
                                    style={{ backgroundColor: classInfo.color }}
                                  >
                                    <div className="font-medium truncate">{classInfo.name}</div>
                                    <div className="text-xs opacity-90 truncate">
                                      {classInfo.room} {classInfo.building && `(${classInfo.building})`}
                                    </div>
                                    <div className="text-xs opacity-90 truncate">{classInfo.instructor}</div>
                                  </div>
                                  <button
                                    onClick={() => removeClass(day, slot.time)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full 
                                      text-white opacity-0 group-hover:opacity-100 transition-opacity 
                                      flex items-center justify-center"
                                  >
                                    ×
                                  </button>
                                </motion.div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setSelectedDay(day);
                                    setSelectedTime(slot.time);
                                    setShowAddClass(true);
                                  }}
                                  className="w-full h-16 sm:h-20 border-2 border-dashed border-gray-200 
                                    rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                                />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // New exam table
            <ExamTable
              schedule={schedule}
              onAdd={() => {
                setSelectedTime('9:00 AM'); // Default time
                setShowAddClass(true);
              }}
              onRemove={removeClass}
            />
          )}
        </div>

        {/* Enhanced Modal for both Class and Exam */}
        <AnimatePresence>
          {showAddClass && (
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
                <h3 className="text-lg font-semibold mb-4">
                  Add {routineType === 'class' ? 'Class' : 'Exam'} for {selectedDay} at {selectedTime}
                </h3>
                
                <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                      {routineType === 'class' ? 'Course Name' : 'Exam Name'}
            </label>
                    <input
                      type="text"
                      value={currentClass.name}
                      onChange={(e) => setCurrentClass(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      placeholder={`Enter ${routineType === 'class' ? 'course' : 'exam'} name`}
                    />
          </div>

                  <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                        Room No
            </label>
            <input
                        type="text"
                        value={currentClass.room}
                        onChange={(e) => setCurrentClass(prev => ({ ...prev, room: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter room number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                        Building
            </label>
            <input
                        type="text"
                        value={currentClass.building}
                        onChange={(e) => setCurrentClass(prev => ({ ...prev, building: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter building"
            />
          </div>
                  </div>

                  {routineType === 'exam' && (
                    <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
            </label>
            <input
              type="date"
                          value={currentClass.examDate}
                          onChange={(e) => setCurrentClass(prev => ({ ...prev, examDate: e.target.value }))}
                          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration (hours)
                        </label>
                        <select
                          value={currentClass.duration}
                          onChange={(e) => setCurrentClass(prev => ({ ...prev, duration: e.target.value }))}
                          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="1">1 hour</option>
                          <option value="1.5">1.5 hours</option>
                          <option value="2">2 hours</option>
                          <option value="3">3 hours</option>
                        </select>
        </div>
      </div>
                  )}

                  {routineType === 'class' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instructor
                      </label>
                      <input
                        type="text"
                        value={currentClass.instructor}
                        onChange={(e) => setCurrentClass(prev => ({ ...prev, instructor: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter instructor name"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="flex space-x-2">
                      {colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setCurrentClass(prev => ({ ...prev, color }))}
                          className={`w-8 h-8 rounded-full ${
                            currentClass.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
        </div>
      </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={addClass}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 
                      transition-colors duration-200"
                  >
                    Add {routineType === 'class' ? 'Class' : 'Exam'}
                  </button>
        <button
                    onClick={() => setShowAddClass(false)}
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
      </div>
    </div>
  );
} 
import { useState } from 'react';

const GpaTargetCalculatorPage = () => {
  const [currentSGPA, setCurrentSGPA] = useState('');
  const [currentCGPA, setCurrentCGPA] = useState('');
  const [targetGPA, setTargetGPA] = useState('');
  const [requiredSGPA, setRequiredSGPA] = useState(null);

  const calculateRequiredSGPA = () => {
    const totalSemesters = 8;
    const currentSemester = 1; // Adjust based on the current semester
    const completedSemesters = currentSemester - 1;

    const totalPoints = (completedSemesters * currentCGPA) + (1 * currentSGPA);
    const requiredPoints = targetGPA * totalSemesters;

    const nextSemesterSGPA = (requiredPoints - totalPoints) / (totalSemesters - completedSemesters);
    setRequiredSGPA(nextSemesterSGPA);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md max-w-4xl mx-auto mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">GPA Target Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current SGPA</label>
          <input
            type="number"
            value={currentSGPA}
            onChange={(e) => setCurrentSGPA(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your current SGPA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current CGPA</label>
          <input
            type="number"
            value={currentCGPA}
            onChange={(e) => setCurrentCGPA(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your current CGPA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target GPA</label>
          <input
            type="number"
            value={targetGPA}
            onChange={(e) => setTargetGPA(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your target GPA"
          />
        </div>
      </div>
      <button
        onClick={calculateRequiredSGPA}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Calculate Required SGPA
      </button>

      {requiredSGPA !== null && (
        <div className="mt-4 text-lg text-gray-800">
          <p>
            To achieve a target GPA of <strong>{targetGPA}</strong>, you need to score at least{' '}
            <strong>{requiredSGPA.toFixed(2)}</strong> in your next semester.
          </p>
        </div>
      )}
    </div>
  );
};

export default GpaTargetCalculatorPage; 
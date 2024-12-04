import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GradeTracker = () => {
  const [courses, setCourses] = useState([{ id: 1, name: '', grade: '', credits: '' }]);
  const [gpa, setGpa] = useState(0);
  const [gradeDistribution, setGradeDistribution] = useState({});

  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  useEffect(() => {
    calculateGPA();
    calculateGradeDistribution();
  }, [courses]);

  const calculateGPA = () => {
    const validCourses = courses.filter(course => course.grade && course.credits);

    if (validCourses.length === 0) {
      setGpa(0);
      return;
    }

    const totalPoints = validCourses.reduce((sum, course) => {
      return sum + (gradePoints[course.grade] * Number(course.credits));
    }, 0);

    const totalCredits = validCourses.reduce((sum, course) => {
      return sum + Number(course.credits);
    }, 0);

    setGpa((totalPoints / totalCredits).toFixed(2));
  };

  const calculateGradeDistribution = () => {
    const distribution = courses.reduce((acc, course) => {
      if (course.grade) {
        acc[course.grade] = (acc[course.grade] || 0) + 1;
      }
      return acc;
    }, {});

    setGradeDistribution(distribution);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { id: courses.length + 1, name: '', grade: '', credits: '' }]);
  };

  const handleRemoveCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleCourseChange = (id, field, value) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const getChartData = () => {
    return {
      labels: Object.keys(gradeDistribution),
      datasets: [{
        label: 'Number of Courses',
        data: Object.values(gradeDistribution),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Grade Tracker</h2>
        <p className="text-gray-600">Track your academic performance and analyze your GPA.</p>
      </div>

      {/* Course List */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Courses</h3>
        <button
          onClick={handleAddCourse}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Course
        </button>

        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Course Name"
                  value={course.name}
                  onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <select
                  value={course.grade}
                  onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)}
                  className="p-2 border rounded-lg"
                >
                  <option value="">Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Credits"
                  value={course.credits}
                  onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <button
                onClick={() => handleRemoveCourse(course.id)}
                className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* GPA Display */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current GPA</h3>
        <p className="text-4xl font-bold text-blue-600">{gpa}</p>
      </div>

      {/* Grade Distribution Chart */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
        <div className="h-64">
          <Bar data={getChartData()} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default GradeTracker;
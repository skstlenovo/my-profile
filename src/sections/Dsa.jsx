import axios from "axios";
import { useEffect, useState } from "react";

const USERNAME = "SanjayJavaDeveloper";

const getColor = (count = 0) => {
  if (count >= 6) return "bg-green-600";
  if (count >= 4) return "bg-green-500";
  if (count >= 2) return "bg-green-400";
  if (count >= 1) return "bg-green-300";
  return "bg-gray-700";
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const generateCalendarDays = (year, month, submissionData) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0 = Sunday
  
  const days = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    days.push({
      day,
      date,
      count: submissionData[date] || 0
    });
  }
  
  return days;
};

const calculateStreak = (submissionData) => {
  if (!submissionData || Object.keys(submissionData).length === 0) return 0;

  const dates = Object.keys(submissionData)
    .map(d => new Date(`${d}T00:00:00`).getTime())
    .sort((a, b) => b - a);

  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  // If today has no submissions, start from yesterday
  const todayKey = current.toISOString().split("T")[0];
  if (!submissionData[todayKey]) {
    current.setDate(current.getDate() - 1);
  }

  for (const ts of dates) {
    if (ts === current.getTime()) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else if (ts < current.getTime()) {
      break;
    }
  }

  return streak;
};


const convertSubmissionCalendar = (calendar) => {
  const result = {};

  Object.entries(calendar || {}).forEach(([timestamp, count]) => {
    const date = new Date(Number(timestamp) * 1000);

    // Normalize to local midnight (IMPORTANT)
    date.setHours(0, 0, 0, 0);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    result[`${yyyy}-${mm}-${dd}`] = count;
  });

  return result;
};


export default function DsaCalendar() {
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const calendarDays = generateCalendarDays(currentYear, currentMonth, submissions);
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate stats from submission data for current month only
  const currentMonthSubmissions = Object.entries(submissions).filter(([date]) => {
    const [year, month] = date.split('-');
    return parseInt(year) === currentYear && parseInt(month) === currentMonth;
  });
  
  const totalPracticeDays = currentMonthSubmissions.length;
  const totalProblemsInPractice = currentMonthSubmissions.reduce((sum, [, count]) => sum + count, 0);
  const currentStreak = calculateStreak(submissions);

  useEffect(() => {
  const fetchLeetCodeData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://leetcode-api-faisalshohag.vercel.app/${USERNAME}`
      );

      const data = response.data;
      setStats(data);

      // ✅ Convert submissionCalendar properly
      const submissionsByDate = convertSubmissionCalendar(
        data.submissionCalendar
      );

      setSubmissions(submissionsByDate);
      setError(false);

    } catch (err) {
      console.error(err);
      setError(true);
      setSubmissions({});
    } finally {
      setLoading(false);
    }
  };

  fetchLeetCodeData();
}, []);


  const monthName = new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' });

  return (
    <section className="max-w-4xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-[#1cd8d2] mb-8 text-center">
        LeetCode Submissions
      </h2>     

      {loading && (
        <div className="text-center text-gray-400 py-12">
          <div className="animate-spin w-12 h-12 border-4 border-[#1cd8d2] border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-lg">Loading your LeetCode data...</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center text-red-400 py-12">
          <p className="text-lg mb-2">⚠️ Failed to load LeetCode data</p>
          <p className="text-sm text-gray-400">Please check your internet connection</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl transition-shadow duration-300 hover:shadow-[#1cd8d2]/30">
            <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">
              {monthName} {currentYear} Activity
            </h3>
            
            {/* Week day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-xs text-gray-400 text-center font-medium">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((dayData, i) => {
                if (!dayData) {
                  return <div key={`empty-${i}`} className="w-10 h-10" />;
                }

                const { day, date, count } = dayData;
                
                return (
                  <div
                    key={i}
                    title={`${date}: ${count} submissions`}
                    className={`w-10 h-10 rounded flex items-center justify-center text-xs font-semibold cursor-pointer transition-transform hover:scale-110 ${getColor(count)}`}
                  >
                    {count > 0 && <span className="text-white">{count}</span>}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="text-xs text-gray-400">Less</span>
              <div className="flex gap-1.5">
                <span className="w-4 h-4 bg-gray-700 rounded" title="0 submissions" />
                <span className="w-4 h-4 bg-green-300 rounded" title="1-2 submissions" />
                <span className="w-4 h-4 bg-green-400 rounded" title="2-3 submissions" />
                <span className="w-4 h-4 bg-green-500 rounded" title="4-5 submissions" />
                <span className="w-4 h-4 bg-green-600 rounded" title="6+ submissions" />
              </div>
              <span className="text-xs text-gray-400">More</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-4">
            {/* Practice Stats */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl transition-shadow duration-300 hover:shadow-[#1cd8d2]/30">
              <h3 className="text-lg font-semibold text-[#1cd8d2] mb-4">
                📊 Practice Stats ({monthName})
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Days:</span>
                  <span className="text-green-400 font-semibold">{totalPracticeDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Submissions This Month:</span>
                  <span className="text-green-400 font-semibold">{totalProblemsInPractice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Streak:</span>
                  <span className="text-green-400 font-semibold">{currentStreak} days 🔥</span>
                </div>
              </div>
            </div>

            {/* LeetCode Stats */}
            {stats && (
              <div className="bg-gray-900 p-6 rounded-xl shadow-2xl transition-shadow duration-300 hover:shadow-[#1cd8d2]/30">
                <h3 className="text-lg font-semibold text-[#1cd8d2] mb-4">
                  💻 LeetCode Profile
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Solved:</span>
                    <span className="text-[#1cd8d2] font-semibold text-lg">
                      {stats.totalSolved}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="text-center p-2 bg-gray-800 rounded">
                      <div className="text-green-400 font-semibold">{stats.easySolved}</div>
                      <div className="text-xs text-gray-400">Easy</div>
                    </div>
                    <div className="text-center p-2 bg-gray-800 rounded">
                      <div className="text-yellow-400 font-semibold">{stats.mediumSolved}</div>
                      <div className="text-xs text-gray-400">Medium</div>
                    </div>
                    <div className="text-center p-2 bg-gray-800 rounded">
                      <div className="text-red-400 font-semibold">{stats.hardSolved}</div>
                      <div className="text-xs text-gray-400">Hard</div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-400">Acceptance Rate:</span>
                    <span className="text-green-400 font-semibold">
                      {stats.acceptanceRate}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-6 text-center">
        Real-time data from LeetCode APIs. Last updated: {new Date().toLocaleString("en-GB")}.
      </p>
    </section>
  );
}

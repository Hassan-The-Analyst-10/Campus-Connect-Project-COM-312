import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, FileText, Calendar, CheckCircle, Clock } from "lucide-react";

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalRequests: 0,
    completedRequests: 0,
    pendingRequests: 0,
    averageResponseTime: "2.5 hours",
    studentEngagement: "85%"
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const requestsRes = await fetch("http://127.0.0.1:5000/api/requests/");
      const requests = await requestsRes.json();
      
      setAnalytics({
        totalRequests: requests.length,
        completedRequests: requests.filter(r => r.status === "Completed").length,
        pendingRequests: requests.filter(r => r.status === "Pending").length,
        averageResponseTime: "2.5 hours",
        studentEngagement: "85%"
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-500 mt-1">View platform statistics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <FileText className="text-emerald-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <p className="text-gray-500 text-sm">Total Requests</p>
          <p className="text-2xl font-bold text-gray-800">{analytics.totalRequests}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Completed Requests</p>
          <p className="text-2xl font-bold text-gray-800">{analytics.completedRequests}</p>
          <p className="text-sm text-green-600 mt-1">
            {analytics.totalRequests ? Math.round((analytics.completedRequests / analytics.totalRequests) * 100) : 0}% completion rate
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Clock className="text-amber-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Pending Requests</p>
          <p className="text-2xl font-bold text-gray-800">{analytics.pendingRequests}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Student Engagement</p>
          <p className="text-2xl font-bold text-gray-800">{analytics.studentEngagement}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
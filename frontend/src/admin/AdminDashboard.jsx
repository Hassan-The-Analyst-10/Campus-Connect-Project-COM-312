import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import MessagesFromStudents from "./MessagesFromStudents";
import AdminAnnouncements from "./AdminAnnouncements";
import AdminRequests from "./AdminRequests";
import AdminCollaboration from "./AdminCollaboration";
import AdminUsers from "./AdminUsers";
import AdminAnalytics from "./AdminAnalytics";
import { Users, Clock, Megaphone, MessageCircle, LayoutDashboard } from "lucide-react";

function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingRequests: 0,
    totalAnnouncements: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (!storedAdmin) {
      window.location.href = "/admin/login";
    } else {
      setAdmin(JSON.parse(storedAdmin));
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch users
      const usersRes = await fetch("http://127.0.0.1:5000/api/admin/users");
      const users = await usersRes.json();
      
      // Fetch requests
      const requestsRes = await fetch("http://127.0.0.1:5000/api/requests/");
      const requests = await requestsRes.json();
      
      // Fetch announcements
      const announcementsRes = await fetch("http://127.0.0.1:5000/api/announcements/");
      const announcements = await announcementsRes.json();
      
      setStats({
        totalStudents: users.filter(u => u.role === "student").length,
        pendingRequests: requests.filter(r => r.status === "Pending").length,
        totalAnnouncements: announcements.length,
        unreadMessages: 0 // Will be implemented later
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  if (!admin) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar setPage={setPage} activePage={page} admin={admin} />
      
      <div className="flex-1 overflow-y-auto">
        {page === "dashboard" && <DashboardHome stats={stats} admin={admin} setPage={setPage} />}
        {page === "messages" && <MessagesFromStudents />}
        {page === "announcements" && <AdminAnnouncements />}
        {page === "requests" && <AdminRequests />}
        {page === "collab" && <AdminCollaboration />}
        {page === "users" && <AdminUsers />}
        {page === "analytics" && <AdminAnalytics />}
      </div>
    </div>
  );
}

// Dashboard Home Component
function DashboardHome({ stats, admin, setPage }) {
  const [recentRequests, setRecentRequests] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchRecentData();
  }, []);

  const fetchRecentData = async () => {
    try {
      const requestsRes = await fetch("http://127.0.0.1:5000/api/requests/");
      const requests = await requestsRes.json();
      setRecentRequests(requests.slice(0, 5));
      
      // Recent activities
      setRecentActivities([
        { id: 1, action: "New student registered", time: "5 minutes ago", user: "John Doe" },
        { id: 2, action: "Request #1234 completed", time: "1 hour ago", user: "Sarah Smith" },
        { id: 3, action: "Announcement posted", time: "3 hours ago", user: "Admin" },
      ]);
    } catch (error) {
      console.error("Error fetching recent data:", error);
    }
  };

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <div 
      onClick={onClick} 
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-xl text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, <span className="text-emerald-600">{admin?.role || "Admin"}</span>
        </h1>
        <p className="text-gray-500 mt-2">Here's what's happening in your campus today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Students" 
          value={stats.totalStudents} 
          icon={<Users size={24} />}
          color="bg-emerald-500"
          onClick={() => setPage("users")}
        />
        <StatCard 
          title="Pending Requests" 
          value={stats.pendingRequests} 
          icon={<Clock size={24} />}
          color="bg-amber-500"
          onClick={() => setPage("requests")}
        />
        <StatCard 
          title="Announcements" 
          value={stats.totalAnnouncements} 
          icon={<Megaphone size={24} />}
          color="bg-purple-500"
          onClick={() => setPage("announcements")}
        />
        <StatCard 
          title="Unread Messages" 
          value={stats.unreadMessages} 
          icon={<MessageCircle size={24} />}
          color="bg-blue-500"
          onClick={() => setPage("messages")}
        />
      </div>

      {/* Recent Activity and Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Requests</h3>
          <div className="space-y-3">
            {recentRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent requests</p>
            ) : (
              recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{request.title}</p>
                    <p className="text-sm text-gray-500">From: {request.user_name}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === "Pending" ? "bg-amber-100 text-amber-700" :
                    request.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {request.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
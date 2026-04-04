// ProfessionalDashboard.jsx
import { useState, useEffect } from "react";
import {
  Megaphone,
  Send,
  Users,
  LayoutDashboard,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Clock,
  CheckCircle,
  FileText,
  Calendar,
  ArrowRight,
  Sparkles,
  FolderKanban,
  MessageSquare,
  TrendingUp,
  Award,
  X,
  AlertCircle
} from "lucide-react";

function UserSidebar({ setPage, activePage = "dashboard", user }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const mainMenuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, page: "dashboard" },
    {
      label: "Announcements",
      icon: <Megaphone size={20} />,
      page: "announcements",
    },
    { label: "Requests", icon: <Send size={20} />, page: "request" },
    { label: "Collaboration Hub", icon: <Users size={20} />, page: "collab" },
  ];

  const bottomMenuItems = [
    { label: "Notifications", icon: <Bell size={20} />, page: "notifications" },
    { label: "Settings", icon: <Settings size={20} />, page: "settings" },
    { label: "Help & Support", icon: <HelpCircle size={20} />, page: "help" },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/user/login";
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 text-white 
      flex flex-col transition-all duration-300 ease-in-out shadow-2xl relative`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-emerald-600 rounded-full p-1.5 
        hover:bg-emerald-500 transition shadow-lg border-2 border-white z-10"
      >
        <div className={`transform transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}>
          <ChevronLeft size={16} />
        </div>
      </button>

      <div className="p-6 border-b border-emerald-600/30">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 rounded-xl p-2.5 shadow-lg">
            <Users size={24} />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold">Student Portal</h2>
              <p className="text-xs text-emerald-200/80">Access • Collaborate • Succeed</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-4 border-b border-emerald-600/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center font-bold shadow-lg">
              {initials || "U"}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-emerald-800 rounded-full" />
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-semibold">{user?.name || "User"}</p>
              <p className="text-xs text-emerald-200/70">{user?.role?.toUpperCase() || "STUDENT"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        {mainMenuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setPage(item.page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative mb-1 ${
              activePage === item.page ? "bg-emerald-600 shadow-lg" : "hover:bg-emerald-700/60"
            }`}
          >
            {item.icon}
            {!isCollapsed && (
              <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
            )}
          </button>
        ))}

        <div className="mt-6 pt-4 border-t border-emerald-600/30">
          {bottomMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setPage(item.page)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-700/60 transition mb-1"
            >
              {item.icon}
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-emerald-600/30">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-600/20 hover:text-red-400 transition"
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}

// Announcements Component
function AnnouncementsComponent({ user }) {
  const [announcements, setAnnouncements] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/announcements/");
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  const postAnnouncement = async () => {
    if (!newTitle.trim() || !newMessage.trim()) return;
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/announcements/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          message: newMessage,
          created_by: user.id,
        }),
      });
      
      if (response.ok) {
        setNewTitle("");
        setNewMessage("");
        setShowForm(false);
        fetchAnnouncements();
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
            <p className="text-gray-500 mt-1">Stay updated with latest news and updates</p>
          </div>
          {user?.role === "admin" && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <Megaphone size={18} />
              Post Announcement
            </button>
          )}
        </div>

        {showForm && user?.role === "admin" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Announcement</h2>
            <input
              type="text"
              placeholder="Announcement Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              placeholder="Announcement Message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows="4"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex gap-3">
              <button
                onClick={postAnnouncement}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl"
              >
                Post Announcement
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          </div>
        ) : announcements.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Megaphone size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No announcements yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Megaphone size={16} className="text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                    </div>
                    <p className="text-gray-600 mt-2">{announcement.message}</p>
                    <p className="text-sm text-gray-400 mt-3">
                      {new Date(announcement.created_at).toLocaleDateString()} at{" "}
                      {new Date(announcement.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Requests Component with Restrictions
function RequestsComponent({ user }) {
  const [requests, setRequests] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState(null);
  const [blocked, setBlocked] = useState(false);

  const fetchRequests = async () => {
    try {
      const endpoint = user?.role === "admin" 
        ? "http://127.0.0.1:5000/api/requests/"
        : `http://127.0.0.1:5000/api/requests/user/${user?.id}`;
      
      const response = await fetch(endpoint);
      const data = await response.json();
      setRequests(data);
      
      // Check for restrictions
      if (user?.role !== "admin") {
        const pendingRequests = data.filter(r => r.status === "Pending").length;
        if (pendingRequests >= 3) {
          setWarning("You have 3 pending requests. Please wait for feedback before submitting new requests.");
        } else if (pendingRequests >= 5) {
          setBlocked(true);
          setWarning("You have been blocked from submitting new requests due to multiple pending requests. Please contact admin.");
        } else {
          setWarning(null);
          setBlocked(false);
        }
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitRequest = async () => {
    if (blocked) {
      alert("You are currently blocked from submitting requests. Please contact administrator.");
      return;
    }
    
    if (!newTitle.trim() || !newDescription.trim()) return;
    
    const pendingCount = requests.filter(r => r.status === "Pending").length;
    if (pendingCount >= 3) {
      alert("You have too many pending requests. Please wait for feedback on existing requests.");
      return;
    }
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          user_id: user.id,
        }),
      });
      
      if (response.ok) {
        setNewTitle("");
        setNewDescription("");
        fetchRequests();
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const updateStatus = async (id, status) => {
    if (user?.role !== "admin") return;
    
    try {
      await fetch(`http://127.0.0.1:5000/api/requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Service Requests</h1>
          <p className="text-gray-500 mt-1">Submit and track your service requests</p>
        </div>

        {warning && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${blocked ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
            <AlertCircle size={20} className={blocked ? 'text-red-600' : 'text-amber-600'} />
            <p className={`text-sm ${blocked ? 'text-red-700' : 'text-amber-700'}`}>{warning}</p>
          </div>
        )}

        {user?.role !== "admin" && !blocked && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">New Service Request</h2>
            <input
              type="text"
              placeholder="Request Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              placeholder="Describe your request in detail..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows="4"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={submitRequest}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl"
            >
              Submit Request
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Send size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No requests found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{request.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === "Pending" ? "bg-amber-100 text-amber-700" :
                        request.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{request.description}</p>
                    <p className="text-sm text-gray-400 mt-3">
                      Submitted: {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {user?.role === "admin" && (
                    <select
                      value={request.status}
                      onChange={(e) => updateStatus(request.id, e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Real-time Collaboration Hub Component
function CollaborationHub({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // WebSocket connection for real-time chat
    const websocket = new WebSocket(`ws://127.0.0.1:5000/ws/chat?user_id=${user.id}`);
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages(prev => [...prev, data.message]);
      } else if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    
    setWs(websocket);
    
    // Load previous messages
    fetch("http://127.0.0.1:5000/api/chat/messages")
      .then(res => res.json())
      .then(data => setMessages(data));
    
    return () => websocket.close();
  }, [user.id]);

  const sendMessage = () => {
    if (!text.trim() || !ws) return;
    
    ws.send(JSON.stringify({
      type: 'message',
      content: text,
      user_id: user.id,
      user_name: user.name
    }));
    setText("");
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="h-screen flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-2xl font-bold text-gray-800">Collaboration Hub</h1>
          <p className="text-gray-500 text-sm">Real-time chat with {users.length} online</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.user_id === user.id ? 'justify-end' : ''}`}>
              {msg.user_id !== user.id && (
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {msg.user_name?.[0] || 'U'}
                </div>
              )}
              <div className={`max-w-[70%] ${msg.user_id === user.id ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200'} rounded-2xl px-4 py-2`}>
                {msg.user_id !== user.id && (
                  <p className="text-xs font-semibold text-emerald-600 mb-1">{msg.user_name}</p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={sendMessage}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Home Component
function DashboardHome({ user }) {
  const [stats, setStats] = useState({
    activeProjects: 0,
    pendingRequests: 0,
    notifications: 0,
    announcements: 0
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const [requestsRes, announcementsRes] = await Promise.all([
          fetch(`http://127.0.0.1:5000/api/requests/user/${user?.id}`),
          fetch("http://127.0.0.1:5000/api/announcements/")
        ]);
        
        const requests = await requestsRes.json();
        const announcements = await announcementsRes.json();
        
        setStats({
          activeProjects: 4,
          pendingRequests: requests.filter(r => r.status === "Pending").length,
          notifications: 3,
          announcements: announcements.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    
    fetchStats();
  }, [user?.id]);

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-emerald-600">{user?.name?.split(' ')[0] || 'User'}</span>
          </h1>
          <p className="text-gray-500 mt-2">Here's what's happening with your academic journey today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Projects</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeProjects}</p>
              </div>
              <div className="bg-emerald-500 p-3 rounded-xl text-white shadow-lg">
                <FolderKanban size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.pendingRequests}</p>
              </div>
              <div className="bg-amber-500 p-3 rounded-xl text-white shadow-lg">
                <Clock size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Notifications</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.notifications}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl text-white shadow-lg">
                <Bell size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Announcements</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.announcements}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl text-white shadow-lg">
                <Megaphone size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Professional Dashboard
export default function ProfessionalDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      );
    }

    switch (activePage) {
      case "dashboard":
        return <DashboardHome user={user} />;
      case "announcements":
        return <AnnouncementsComponent user={user} />;
      case "request":
        return <RequestsComponent user={user} />;
      case "collab":
        return <CollaborationHub user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <UserSidebar setPage={setActivePage} activePage={activePage} user={user} />
      {renderContent()}
    </div>
  );
}
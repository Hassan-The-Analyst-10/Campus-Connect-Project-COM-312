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
  AlertCircle,
  User,
  Mail,
  Phone,
  BookOpen,
  Target,
  Zap,
  Activity,
  PlusCircle,
  Download,
  Share2,
  CheckCheck,
  Check,
  Eye,
  Send as SendIcon,
  RefreshCw
} from "lucide-react";

// ==================== SIDEBAR COMPONENT ====================
function UserSidebar({ setPage, activePage = "dashboard", user, unreadCount }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const mainMenuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, page: "dashboard" },
    { label: "Announcements", icon: <Megaphone size={20} />, page: "announcements" },
    { label: "Requests", icon: <Send size={20} />, page: "request" },
    { label: "Collaboration Hub", icon: <Users size={20} />, page: "collab" },
  ];

  const bottomMenuItems = [
    { label: "Notifications", icon: <Bell size={20} />, page: "notifications", badge: unreadCount },
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
      flex flex-col transition-all duration-300 ease-in-out shadow-2xl relative sticky top-0`}
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
            {activePage === item.page && !isCollapsed && (
              <div className="w-1 h-6 bg-white rounded-full" />
            )}
          </button>
        ))}

        <div className="mt-6 pt-4 border-t border-emerald-600/30">
          {bottomMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setPage(item.page)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-700/60 transition mb-1 relative"
            >
              {item.icon}
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              {item.badge > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
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

// ==================== ANNOUNCEMENTS COMPONENT (Read-only for users) ====================
function AnnouncementsComponent({ user }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
          <p className="text-gray-500 mt-1">Stay updated with latest news and updates</p>
        </div>

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
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Megaphone size={20} className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
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

// ==================== REQUESTS COMPONENT (With 5 request limit) ====================
function RequestsComponent({ user, addNotification }) {
  const [requests, setRequests] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState(null);
  const [blocked, setBlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchRequests = async () => {
    try {
      const endpoint = user?.role === "admin" 
        ? "http://127.0.0.1:5000/api/requests/"
        : `http://127.0.0.1:5000/api/requests/user/${user?.id}`;
      
      const response = await fetch(endpoint);
      const data = await response.json();
      setRequests(data);
      
      if (user?.role !== "admin") {
        const pendingRequests = data.filter(r => r.status === "Pending").length;
        if (pendingRequests >= 5) {
          setBlocked(true);
          setWarning("You have reached the maximum limit of 5 pending requests. Please wait for admin to respond to your existing requests.");
        } else if (pendingRequests >= 3) {
          setWarning(`You have ${pendingRequests} pending requests. You can submit ${5 - pendingRequests} more requests.`);
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
      alert("You cannot submit new requests. Please wait for admin to respond to your pending requests.");
      return;
    }
    
    if (!newTitle.trim() || !newDescription.trim()) return;
    
    const pendingCount = requests.filter(r => r.status === "Pending").length;
    if (pendingCount >= 5) {
      alert("Maximum 5 pending requests allowed.");
      return;
    }
    
    setSubmitting(true);
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
      
      const data = await response.json();
      
      if (response.ok) {
        setNewTitle("");
        setNewDescription("");
        fetchRequests();
        addNotification("Request Submitted", "Your request has been submitted successfully", "success");
      } else if (response.status === 403 || response.status === 429) {
        alert(data.error || data.warning);
        fetchRequests();
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
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
      
      const request = requests.find(r => r.id === id);
      if (request && status === "Completed") {
        addNotification("Request Completed", `Your request "${request.title}" has been completed`, "success");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const pendingCount = requests.filter(r => r.status === "Pending").length;

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Service Requests</h1>
          <p className="text-gray-500 mt-1">Submit and track your service requests (Max 5 pending)</p>
        </div>

        {/* Progress bar for pending requests */}
        {user?.role !== "admin" && (
          <div className="mb-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Pending Requests</span>
              <span className="text-sm font-medium text-emerald-600">{pendingCount}/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  pendingCount >= 5 ? "bg-red-500" : pendingCount >= 3 ? "bg-yellow-500" : "bg-emerald-500"
                }`}
                style={{ width: `${(pendingCount / 5) * 100}%` }}
              />
            </div>
            {warning && (
              <div className={`mt-3 p-3 rounded-xl flex items-start gap-2 text-sm ${blocked ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{warning}</span>
              </div>
            )}
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
              disabled={submitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Request"}
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
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
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
                      Submitted: {new Date(request.created_at).toLocaleDateString()} at {new Date(request.created_at).toLocaleTimeString()}
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

// ==================== COLLABORATION HUB (WhatsApp-like with ticks) ====================
function CollaborationHub({ user, addNotification }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [sending, setSending] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/chat/messages");
      const data = await res.json();
      setMessages(data);
      setOnlineUsers(Math.floor(Math.random() * 20) + 5);
      
      // Mark messages as seen when viewed
      const unseenMessages = data.filter(m => m.user_id !== user.id && m.status !== "seen");
      unseenMessages.forEach(msg => {
        markAsSeen(msg.id);
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const markAsDelivered = async (messageId) => {
    try {
      await fetch(`http://127.0.0.1:5000/api/chat/messages/${messageId}/delivered`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Error marking as delivered:", error);
    }
  };

  const markAsSeen = async (messageId) => {
    try {
      await fetch(`http://127.0.0.1:5000/api/chat/messages/${messageId}/seen`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Error marking as seen:", error);
    }
  };

  const sendMessage = async () => {
    if (!text.trim() || sending) return;
    
    setSending(true);
    const tempId = Date.now();
    const tempMessage = {
      id: tempId,
      content: text,
      user_id: user.id,
      user_name: user.name,
      timestamp: new Date().toISOString(),
      status: "sending"
    };
    
    setMessages(prev => [...prev, tempMessage]);
    setText("");
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          user_id: user.id,
          room: "general",
        }),
      });
      
      const savedMessage = await response.json();
      setMessages(prev => prev.map(m => m.id === tempId ? savedMessage : m));
      
      // Simulate delivery after short delay
      setTimeout(() => {
        markAsDelivered(savedMessage.id);
        fetchMessages();
      }, 500);
      
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => prev.map(m => m.id === tempId ? { ...m, status: "failed" } : m));
    } finally {
      setSending(false);
    }
  };

  const getMessageStatusIcon = (status) => {
    switch(status) {
      case "sending":
        return <Clock size={12} className="text-gray-400" />;
      case "sent":
        return <Check size={12} className="text-gray-400" />;
      case "delivered":
        return <CheckCheck size={12} className="text-gray-400" />;
      case "seen":
        return <CheckCheck size={12} className="text-blue-500" />;
      case "failed":
        return <AlertCircle size={12} className="text-red-500" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="h-screen flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Collaboration Hub</h1>
              <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {onlineUsers} online
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={fetchMessages} className="p-2 hover:bg-gray-100 rounded-full transition">
                <RefreshCw size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.user_id === user.id ? 'justify-end' : ''}`}>
              {msg.user_id !== user.id && (
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0">
                  {msg.user_name?.[0] || 'U'}
                </div>
              )}
              <div className={`max-w-[70%] ${msg.user_id === user.id ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200'} rounded-2xl px-4 py-2 shadow-sm`}>
                {msg.user_id !== user.id && (
                  <p className="text-xs font-semibold text-emerald-600 mb-1">{msg.user_name}</p>
                )}
                <p className="text-sm break-words">{msg.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <p className="text-xs opacity-70">
                    {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </p>
                  {msg.user_id === user.id && getMessageStatusIcon(msg.status)}
                </div>
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
              disabled={sending || !text.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <SendIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== NOTIFICATIONS COMPONENT ====================
function NotificationsComponent({ user, notifications, markAsRead, markAllAsRead }) {
  const getNotificationColor = (type) => {
    switch(type) {
      case "success": return "bg-green-50 border-green-200";
      case "warning": return "bg-yellow-50 border-yellow-200";
      case "error": return "bg-red-50 border-red-200";
      default: return "bg-blue-50 border-blue-200";
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case "success": return <CheckCircle size={20} className="text-green-600" />;
      case "warning": return <AlertCircle size={20} className="text-yellow-600" />;
      case "error": return <X size={20} className="text-red-600" />;
      default: return <Bell size={20} className="text-blue-600" />;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-500 mt-1">Stay updated with your latest activities</p>
          </div>
          {notifications.some(n => !n.is_read) && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Bell size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border ${getNotificationColor(notification.type)} ${
                  !notification.is_read ? 'shadow-md' : 'opacity-75'
                } transition-all cursor-pointer hover:shadow-md`}
                onClick={() => !notification.is_read && markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notification.created_at).toLocaleDateString()} at {new Date(notification.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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

// ==================== SETTINGS COMPONENT ====================
function SettingsComponent({ user, updateUser, changePassword, addNotification }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || "",
    bio: user?.bio || "",
  });
  
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(formData);
      addNotification("Profile Updated", "Your profile has been updated successfully", "success");
    } catch (error) {
      addNotification("Update Failed", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      addNotification("Password Error", "New passwords do not match", "error");
      return;
    }
    if (passwordData.new_password.length < 6) {
      addNotification("Password Error", "Password must be at least 6 characters", "error");
      return;
    }
    
    setPasswordLoading(true);
    try {
      await changePassword(passwordData.current_password, passwordData.new_password);
      addNotification("Password Updated", "Your password has been changed successfully", "success");
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      addNotification("Password Error", error.message, "error");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-500 mb-8">Manage your account settings and preferences</p>

        {/* Profile Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User size={20} className="text-emerald-600" />
            Profile Information
          </h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-gray-50"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+1234567890"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                placeholder="Computer Science, Business, etc."
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows="3"
                placeholder="Tell us about yourself..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Lock size={20} className="text-emerald-600" />
            Security
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                value={passwordData.current_password}
                onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={passwordData.new_password}
                onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirm_password}
                onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={passwordLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl disabled:opacity-50"
            >
              {passwordLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==================== HELP & SUPPORT COMPONENT ====================
function HelpSupportComponent({ addNotification }) {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    // Fetch FAQs from backend
    fetch("http://127.0.0.1:5000/api/help/faqs")
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error("Error fetching FAQs:", err));
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/help/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        addNotification("Message Sent", "We'll get back to you within 24 hours", "success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      addNotification("Error", "Failed to send message. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Help & Support</h1>
        <p className="text-gray-500 mb-8">Find answers to common questions or contact our support team</p>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HelpCircle size={20} className="text-emerald-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition flex justify-between items-center"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <ChevronLeft className={`transform transition-transform ${expandedFaq === faq.id ? 'rotate-90' : '-rotate-90'}`} size={18} />
                </button>
                {expandedFaq === faq.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Mail size={20} className="text-emerald-600" />
            Contact Support
          </h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="5"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==================== DASHBOARD HOME COMPONENT ====================
function DashboardHome({ user, setPage }) {
  const [stats, setStats] = useState({
    activeProjects: 8,
    pendingRequests: 0,
    notifications: 0,
    announcements: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [requestsRes, announcementsRes, notificationsRes] = await Promise.all([
          fetch(`http://127.0.0.1:5000/api/requests/user/${user?.id}`),
          fetch("http://127.0.0.1:5000/api/announcements/"),
          fetch(`http://127.0.0.1:5000/api/notifications/?user_id=${user?.id}`)
        ]);
        
        const requests = await requestsRes.json();
        const announcements = await announcementsRes.json();
        const notifications = await notificationsRes.json();
        
        setStats({
          activeProjects: 8,
          pendingRequests: requests.filter(r => r.status === "Pending").length,
          notifications: notifications.unread_count || 0,
          announcements: announcements.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    
    fetchStats();
  }, [user?.id]);

  const recentActivities = [
    { type: "upload", description: "Sarah uploaded a new document", time: "5 mins ago" },
    { type: "comment", description: "Ali commented on 'Marketing Plan Update'", time: "20 mins ago" },
    { type: "join", description: "Jason joined 'Team Alpha'", time: "1 hour ago" },
    { type: "meeting", description: "Meeting scheduled for 3 PM", time: "Today, 9:00 AM" },
  ];

  const StatsCard = ({ title, value, icon, color, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-emerald-600">{user?.name?.split(' ')[0] || 'User'}</span>
          </h1>
          <p className="text-gray-500 mt-2">Here's a quick overview of your activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Active Projects" 
            value={stats.activeProjects} 
            icon={<FolderKanban size={24} />}
            color="bg-emerald-500"
          />
          <StatsCard 
            title="Pending Requests" 
            value={stats.pendingRequests} 
            icon={<Clock size={24} />}
            color="bg-amber-500"
            onClick={() => setPage("request")}
          />
          <StatsCard 
            title="Notifications" 
            value={stats.notifications} 
            icon={<Bell size={24} />}
            color="bg-blue-500"
            onClick={() => setPage("notifications")}
          />
          <StatsCard 
            title="Announcements" 
            value={stats.announcements} 
            icon={<Megaphone size={24} />}
            color="bg-purple-500"
            onClick={() => setPage("announcements")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <Activity size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap size={20} />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button onClick={() => setPage("collab")} className="w-full bg-white/10 hover:bg-white/20 rounded-xl p-3 flex items-center gap-3 transition">
                  <Users size={18} />
                  <span className="flex-1 text-left text-sm">Start Collaboration</span>
                  <ArrowRight size={16} />
                </button>
                <button onClick={() => setPage("request")} className="w-full bg-white/10 hover:bg-white/20 rounded-xl p-3 flex items-center gap-3 transition">
                  <Send size={18} />
                  <span className="flex-1 text-left text-sm">Send Request</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN DASHBOARD COMPONENT ====================
export default function UserDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/notifications/?user_id=${user.id}`);
      const data = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unread_count);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const addNotification = async (title, message, type = "info") => {
    if (!user) return;
    try {
      await fetch("http://127.0.0.1:5000/api/notifications/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          title: title,
          message: message,
          type: type
        })
      });
      fetchNotifications();
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`http://127.0.0.1:5000/api/notifications/${notificationId}/read`, {
        method: "PUT"
      });
      fetchNotifications();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("http://127.0.0.1:5000/api/notifications/read-all", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id })
      });
      fetchNotifications();
      addNotification("Notifications", "All notifications marked as read", "success");
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const updateUser = async (formData) => {
    const response = await fetch(`http://127.0.0.1:5000/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
    
    const updatedUser = await response.json();
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  };

  const changePassword = async (currentPassword, newPassword) => {
    const response = await fetch(`http://127.0.0.1:5000/api/users/${user.id}/change-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to change password");
    }
    
    return await response.json();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/user/login";
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [user]);

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
        return <DashboardHome user={user} setPage={setActivePage} />;
      case "announcements":
        return <AnnouncementsComponent user={user} />;
      case "request":
        return <RequestsComponent user={user} addNotification={addNotification} />;
      case "collab":
        return <CollaborationHub user={user} addNotification={addNotification} />;
      case "notifications":
        return <NotificationsComponent user={user} notifications={notifications} markAsRead={markAsRead} markAllAsRead={markAllAsRead} />;
      case "settings":
        return <SettingsComponent user={user} updateUser={updateUser} changePassword={changePassword} addNotification={addNotification} />;
      case "help":
        return <HelpSupportComponent addNotification={addNotification} />;
      default:
        return <DashboardHome user={user} setPage={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <UserSidebar setPage={setActivePage} activePage={activePage} user={user} unreadCount={unreadCount} />
      {renderContent()}
    </div>
  );
}
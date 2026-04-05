import { 
  LayoutDashboard, 
  MessageCircle, 
  Megaphone, 
  Users, 
  LogOut, 
  ChevronLeft,
  CheckSquare,
  BarChart3,
  Settings,
  HelpCircle,
  Bell
} from "lucide-react";
import { useState } from "react";

function AdminSidebar({ setPage, activePage, admin }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, key: "dashboard" },
    { label: "Student Messages", icon: <MessageCircle size={20} />, key: "messages" },
    { label: "Announcements", icon: <Megaphone size={20} />, key: "announcements" },
    { label: "Service Requests", icon: <CheckSquare size={20} />, key: "requests" },
    { label: "Collaboration Hub", icon: <Users size={20} />, key: "collab" },
    { label: "User Management", icon: <Users size={20} />, key: "users" },
    { label: "Analytics", icon: <BarChart3 size={20} />, key: "analytics" },
  ];

  const logout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  const getInitials = () => {
    if (admin?.role) {
      return admin.role.substring(0, 2).toUpperCase();
    }
    return "AD";
  };

  return (
    <div className={`${isCollapsed ? "w-20" : "w-64"} bg-gradient-to-b from-emerald-800 to-emerald-900 text-white flex flex-col transition-all duration-300 relative shadow-xl`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-emerald-600 rounded-full p-1.5 hover:bg-emerald-500 transition shadow-lg border-2 border-white z-10"
      >
        <div className={`transform transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}>
          <ChevronLeft size={16} />
        </div>
      </button>

      {/* Header */}
      <div className="p-6 border-b border-emerald-600/30">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 rounded-xl p-2.5 shadow-lg">
            <Users size={24} />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold">Admin Portal</h2>
              <p className="text-xs text-emerald-200/80">Manage • Monitor • Support</p>
            </div>
          )}
        </div>
      </div>

      {/* Admin Info */}
      <div className="px-4 py-4 border-b border-emerald-600/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center font-bold shadow-lg">
              {getInitials()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-emerald-800 rounded-full" />
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-semibold">{admin?.role || "Administrator"}</p>
              <p className="text-xs text-emerald-200/70">{admin?.email || "admin@campus.com"}</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 mb-1 ${
              activePage === item.key ? "bg-emerald-600 shadow-lg" : "hover:bg-emerald-700/60"
            }`}
          >
            {item.icon}
            {!isCollapsed && <span className="flex-1 text-left text-sm font-medium">{item.label}</span>}
            {activePage === item.key && !isCollapsed && (
              <div className="w-1 h-6 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Logout Button */}
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

export default AdminSidebar;
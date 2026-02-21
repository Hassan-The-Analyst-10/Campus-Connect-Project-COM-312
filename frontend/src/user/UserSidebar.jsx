import { useState } from "react";
import {
  Megaphone,
  MessageSquare,
  Send,
  Users,
  LayoutDashboard,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from "lucide-react";

function UserSidebar({ setPage, activePage = "announcements", user }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const mainMenuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, page: "dashboard" },
    {
      label: "Announcements",
      icon: <Megaphone size={20} />,
      page: "announcements",
      badge: 3,
    },
    {
      label: "Messages",
      icon: <MessageSquare size={20} />,
      page: "message",
      badge: 2,
    },
    { label: "Requests", icon: <Send size={20} />, page: "request" },
    { label: "Collaboration Hub", icon: <Users size={20} />, page: "collab" },
  ];

  const bottomMenuItems = [
    { label: "Notifications", icon: <Bell size={20} />, page: "notifications", badge: 5 },
    { label: "Settings", icon: <Settings size={20} />, page: "settings" },
    { label: "Help & Support", icon: <HelpCircle size={20} />, page: "help" },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/user/login";
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 text-white 
      flex flex-col transition-all duration-300 ease-in-out shadow-2xl relative`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-emerald-600 rounded-full p-1.5 
        hover:bg-emerald-500 transition shadow-lg border-2 border-white z-10"
      >
        <div
          className={`transform transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        >
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
              <h2 className="text-xl font-bold">Student Portal</h2>
              <p className="text-xs text-emerald-200/80">
                Access • Collaborate • Succeed
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="px-4 py-4 border-b border-emerald-600/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 
              rounded-xl flex items-center justify-center font-bold shadow-lg"
            >
              {initials || "U"}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 
              bg-green-400 border-2 border-emerald-800 rounded-full"
            />
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-emerald-200/70">
                {user?.role?.toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {mainMenuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setPage(item.page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
            transition-all duration-200 group relative
            ${
              activePage === item.page
                ? "bg-emerald-600 shadow-lg"
                : "hover:bg-emerald-700/60"
            }`}
          >
            {item.icon}
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left text-sm font-medium">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="bg-red-500 px-2 py-1 rounded-full text-xs font-bold">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}

        {/* System Menu */}
        <div className="mt-6 pt-4 border-t border-emerald-600/30">
          {bottomMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setPage(item.page)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              hover:bg-emerald-700/60 transition"
            >
              {item.icon}
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-emerald-600/30">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
          hover:bg-red-600/20 hover:text-red-400 transition"
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default UserSidebar;

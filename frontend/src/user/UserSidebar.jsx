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

function UserSidebar({ setPage, activePage = "announcements" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainMenuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      page: "dashboard",
    },
    {
      label: "Announcements",
      icon: <Megaphone size={20} />,
      page: "announcements",
      badge: 3, // New announcements count
    },
    {
      label: "Messages",
      icon: <MessageSquare size={20} />,
      page: "message",
      badge: 2, // Unread messages
    },
    {
      label: "Requests",
      icon: <Send size={20} />,
      page: "request",
    },
    {
      label: "Collaboration Hub",
      icon: <Users size={20} />,
      page: "collab",
    },
  ];

  const bottomMenuItems = [
    {
      label: "Notifications",
      icon: <Bell size={20} />,
      page: "notifications",
      badge: 5,
    },
    {
      label: "Settings",
      icon: <Settings size={20} />,
      page: "settings",
    },
    {
      label: "Help & Support",
      icon: <HelpCircle size={20} />,
      page: "help",
    },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 text-white 
      flex flex-col transition-all duration-300 ease-in-out shadow-2xl relative`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-emerald-600 rounded-full p-1.5 
                   hover:bg-emerald-500 transition-colors shadow-lg border-2 border-white z-10"
      >
        <div className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
          <ChevronLeft size={16} />
        </div>
      </button>

      {/* Header with Logo/Icon */}
      <div className="p-6 border-b border-emerald-600/30">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 rounded-xl p-2.5 shadow-lg">
            <Users size={24} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h2 className="text-xl font-bold tracking-tight">Student Portal</h2>
              <p className="text-xs text-emerald-200/80 mt-0.5">Access • Collaborate • Succeed</p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="px-4 py-4 border-b border-emerald-600/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 
                          rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold">JS</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 
                          bg-green-400 border-2 border-emerald-800 rounded-full"></div>
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-semibold">John Smith</p>
              <p className="text-xs text-emerald-200/70">CS • Year 3</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-emerald-300/70 uppercase tracking-wider px-3 mb-2">
              Main Menu
            </p>
          )}
          {mainMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setPage(item.page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                         transition-all duration-200 group relative
                         ${activePage === item.page 
                           ? 'bg-emerald-600 shadow-lg shadow-emerald-600/30' 
                           : 'hover:bg-emerald-700/60'
                         }`}
            >
              <span className={`${activePage === item.page ? 'text-white' : 'text-emerald-100/80'}`}>
                {item.icon}
              </span>
              
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full 
                                   shadow-lg animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs 
                              rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                              transition-all whitespace-nowrap z-50">
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 bg-red-500 px-1.5 py-0.5 rounded-full text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Secondary Navigation */}
        <div className="mt-6 pt-4 border-t border-emerald-600/30">
          <div className="space-y-1">
            {!isCollapsed && (
              <p className="text-xs font-semibold text-emerald-300/70 uppercase tracking-wider px-3 mb-2">
                System
              </p>
            )}
            {bottomMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setPage(item.page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                           transition-all duration-200 group relative
                           hover:bg-emerald-700/60`}
              >
                <span className="text-emerald-100/80">{item.icon}</span>
                
                {!isCollapsed && (
                  <>
                    <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs 
                                rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                transition-all whitespace-nowrap z-50">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 bg-emerald-500 px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-3 border-t border-emerald-600/30">
        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                     hover:bg-red-600/20 text-emerald-100/80 hover:text-red-400
                     transition-all duration-200 group relative`}
          onClick={() => console.log('Logout')}
        >
          <LogOut size={20} />
          {!isCollapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs 
                          rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                          transition-all whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default UserSidebar;
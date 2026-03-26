import { useState, useRef, useEffect } from "react";
import { Home, MessageCircle, Megaphone, Users, LogOut } from "lucide-react";

export default function AdminLayout() {
  const [page, setPage] = useState("messages");

  const logout = () => {
    localStorage.removeItem("admin");
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar setPage={setPage} logout={logout} />
      <MainContent page={page} />
    </div>
  );
}

function AdminSidebar({ setPage, logout }) {
  const admin = JSON.parse(localStorage.getItem("admin")) || { role: "Admin" };

  const menu = [
    { name: "Dashboard", icon: <Home size={18} />, key: "dashboard" },
    { name: "Messages", icon: <MessageCircle size={18} />, key: "messages" },
    { name: "Announcements", icon: <Megaphone size={18} />, key: "announcements" },
    { name: "Requests", icon: <Users size={18} />, key: "requests" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-green-700 to-green-500 text-white flex flex-col justify-between p-4 shadow-lg">
      <div>
        <h2 className="text-xl font-bold mb-6">{admin.role} Panel</h2>

        <div className="space-y-2">
          {menu.map((item) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/20 transition"
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 bg-white text-green-600 px-3 py-2 rounded-lg hover:bg-gray-200"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}

function MainContent({ page }) {
  return (
    <div className="flex-1 p-4 h-screen">
      {page === "messages" && <ChatUI />}
      {page !== "messages" && (
        <div className="text-gray-600">{page} page coming soon...</div>
      )}
    </div>
  );
}

function ChatUI() {
  const [messages, setMessages] = useState([
    { text: "Hello Admin", sender: "student" },
    { text: "Hello, how can I help?", sender: "admin" },
  ]);
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "admin" }]);
    setInput("");
  };

  // Auto expand textarea like WhatsApp
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#e5ddd5] rounded-xl overflow-hidden shadow">
      {/* Header */}
      <div className="bg-green-600 text-white p-3 font-semibold">
        Student Chat
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs text-sm shadow whitespace-pre-wrap ${
                msg.sender === "admin"
                  ? "bg-green-500 text-white"
                  : "bg-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2 bg-white">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            rows={1}
            className="flex-1 resize-none border rounded-2xl px-4 py-2 outline-none max-h-40 overflow-y-auto"
          />

          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

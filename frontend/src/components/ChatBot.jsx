import { useState, useEffect, useRef } from "react";
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Mic,
  MoreVertical,
  MessageCircle,
  CheckCheck,
  Check,
  PlusCircle,
  LogOut,
  History
} from "lucide-react";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const menuRef = useRef(null);

  // Load chats from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("chat_sessions");
    if (savedChats) {
      const chats = JSON.parse(savedChats);
      setRecentChats(chats);
      if (chats.length > 0) {
        const lastChat = chats[chats.length - 1];
        setCurrentChatId(lastChat.id);
        setMessages(lastChat.messages);
      } else {
        startNewChat();
      }
    } else {
      startNewChat();
    }
  }, []);

  // Save chats to localStorage
  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      const updatedChats = recentChats.map(chat => 
        chat.id === currentChatId ? { ...chat, messages, updatedAt: new Date() } : chat
      );
      
      if (!recentChats.find(chat => chat.id === currentChatId)) {
        updatedChats.push({
          id: currentChatId,
          messages,
          createdAt: new Date(),
          updatedAt: new Date(),
          title: messages[0]?.text?.substring(0, 30) || "New Chat"
        });
      }
      
      setRecentChats(updatedChats);
      localStorage.setItem("chat_sessions", JSON.stringify(updatedChats));
    }
  }, [messages, currentChatId]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const startNewChat = () => {
    const newChatId = Date.now();
    setCurrentChatId(newChatId);
    setMessages([
      {
        id: 1,
        text: "👋 Hello! I'm Campus Connect AI Assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
        status: "read"
      }
    ]);
    setShowMenu(false);
    
    const newChat = {
      id: newChatId,
      messages: [{
        id: 1,
        text: "👋 Hello! I'm Campus Connect AI Assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
        status: "read"
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "New Chat"
    };
    
    setRecentChats(prev => [newChat, ...prev]);
    localStorage.setItem("chat_sessions", JSON.stringify([newChat, ...recentChats]));
  };

  const endChat = () => {
    if (window.confirm("Are you sure you want to end this chat? The conversation will be saved in recent chats.")) {
      handleClose();
      setShowMenu(false);
    }
  };

  const viewRecentChats = () => {
    setShowMenu(false);
    showRecentChatsModal();
  };

  const showRecentChatsModal = () => {
    const chatList = recentChats.map(chat => ({
      id: chat.id,
      title: chat.title,
      date: new Date(chat.updatedAt).toLocaleDateString(),
      messageCount: chat.messages.length
    }));
    
    const modalHtml = `
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4" id="recentChatsModal">
        <div class="bg-white rounded-2xl max-w-md w-full max-h-[500px] overflow-hidden shadow-2xl">
          <div class="bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-4 flex justify-between items-center">
            <h3 class="text-white font-bold text-lg">Recent Chats</h3>
            <button onclick="document.getElementById('recentChatsModal').remove()" class="text-white hover:bg-white/10 rounded-full p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div class="overflow-y-auto max-h-[400px] p-4 space-y-2">
            ${chatList.length === 0 ? '<p class="text-gray-500 text-center py-8">No recent chats</p>' : 
              chatList.map(chat => `
                <div class="p-3 hover:bg-gray-50 rounded-xl cursor-pointer border border-gray-100 transition-all" onclick="loadChat(${chat.id})">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    </div>
                    <div class="flex-1">
                      <p class="font-medium text-gray-800">${chat.title}</p>
                      <p class="text-xs text-gray-400">${chat.messageCount} messages • ${chat.date}</p>
                    </div>
                  </div>
                </div>
              `).join('')
            }
          </div>
        </div>
      </div>
    `;
    
    const existingModal = document.getElementById('recentChatsModal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    window.loadChat = (chatId) => {
      const chat = recentChats.find(c => c.id === chatId);
      if (chat) {
        setCurrentChatId(chat.id);
        setMessages(chat.messages);
        document.getElementById('recentChatsModal')?.remove();
        if (!isOpen) setIsOpen(true);
      }
    };
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMessage = input.trim();
    setInput("");
    
    const userMsgObj = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent"
    };
    setMessages(prev => [...prev, userMsgObj]);
    
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMsgObj.id ? { ...msg, status: "delivered" } : msg
      ));
    }, 500);
    
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMsgObj.id ? { ...msg, status: "read" } : msg
      ));
      
      const botResponse = getBotResponse(userMessage);
      const botMsgObj = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        status: "read"
      };
      setMessages(prev => [...prev, botMsgObj]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    const msg = message.toLowerCase();
    
    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello! How can I assist you with Campus Connect today?";
    } else if (msg.includes("request") || msg.includes("submit")) {
      return "📝 **To submit a service request:**\n\n1. Go to the Requests page\n2. Click 'New Service Request'\n3. Fill in the title and description\n4. Click Submit\n\nYou can track your request status in real-time!";
    } else if (msg.includes("collab") || msg.includes("chat")) {
      return "💬 **The Collaboration Hub** lets you chat with other students in real-time!\n\n**Features:**\n• Online status indicators\n• Message delivery status (✓, ✓✓, ✓✓ blue)\n• Real-time updates\n\nClick 'Collaboration Hub' in the sidebar to start chatting!";
    } else if (msg.includes("announcement")) {
      return "📢 **Announcements**\n\nCheck the Announcements page for:\n• Campus news and updates\n• Important deadlines\n• Event notifications\n• System updates\n\nAdmins post new announcements regularly!";
    } else if (msg.includes("help")) {
      return "🆘 **I can help you with:**\n\n• 📝 Submitting service requests\n• 💬 Using the collaboration hub\n• 📢 Viewing announcements\n• ⚙️ Managing your profile\n• 🔔 Checking notifications\n\nWhat would you like to know?";
    } else {
      return "I'm here to help! You can ask me about:\n\n• **How to submit a request**\n• **Using the collaboration hub**\n• **Viewing announcements**\n• **Managing your profile**\n\nWhat specific feature would you like help with?";
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const msgDate = new Date(date);
    const diffHours = (now - msgDate) / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      return msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffHours < 24) {
      return `Today ${msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return msgDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getMessageStatus = (status) => {
    switch(status) {
      case "sent":
        return <Check size={12} className="text-gray-400" />;
      case "delivered":
        return <CheckCheck size={12} className="text-gray-400" />;
      case "read":
        return <CheckCheck size={12} className="text-blue-500" />;
      default:
        return null;
    }
  };

  // Floating button when chat is closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50 group cursor-pointer hover:scale-105"
      >
        <div className="relative">
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </div>
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
          Open Chat
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 pointer-events-none ${isClosing ? 'opacity-0' : 'opacity-100'} transition-all duration-300`}>
      {/* Chat Container - Centered with proper margins */}
      <div className="absolute bottom-6 right-6 pointer-events-auto">
        <div className="w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* ===== HEADER ===== */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-4 flex items-center justify-between flex-shrink-0">
            {/* Left: Chatbot Name and Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base">Campus-Connect</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-white/80 text-xs">AI Assistant</p>
                </div>
              </div>
            </div>
            
            {/* Right: Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Three dots menu */}
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-9 h-9 hover:bg-white/15 rounded-full flex items-center justify-center transition-all duration-200"
                  aria-label="Menu"
                >
                  <MoreVertical size={20} className="text-white" />
                </button>
                
                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                    <button
                      onClick={startNewChat}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <PlusCircle size={18} className="text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Start New Chat</p>
                        <p className="text-xs text-gray-400">Begin a fresh conversation</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={viewRecentChats}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
                    >
                      <History size={18} className="text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">View Recent Chats</p>
                        <p className="text-xs text-gray-400">See your conversation history</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={endChat}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-left border-t border-gray-100"
                    >
                      <LogOut size={18} className="text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-red-600">End Chat</p>
                        <p className="text-xs text-gray-400">Close this conversation</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Close button */}
              <button 
                onClick={handleClose}
                className="w-9 h-9 hover:bg-white/15 rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Close"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* ===== MESSAGES AREA ===== */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f0f2f5] custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-message-fade-in`}
              >
                {/* Bot Avatar */}
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mr-2 self-end">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                
                {/* Message Bubble */}
                <div className={`relative max-w-[75%] ${
                  message.sender === "user" 
                    ? "bg-emerald-600 text-white rounded-2xl rounded-br-md" 
                    : "bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm"
                } px-4 py-2.5`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                  
                  {/* Message Footer */}
                  <div className={`flex items-center justify-end gap-1 mt-1 ${
                    message.sender === "user" ? "text-emerald-100" : "text-gray-400"
                  }`}>
                    <span className="text-[10px]">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.sender === "user" && getMessageStatus(message.status)}
                  </div>
                </div>
                
                {/* User Avatar */}
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center flex-shrink-0 ml-2 self-end">
                    <User size={14} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-message-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mr-2">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* ===== INPUT AREA ===== */}
          <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              {/* Input Field */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !isTyping && sendMessage()}
                  placeholder="Message..."
                  className="w-full px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  disabled={isTyping}
                />
              </div>
              
              {/* Microphone Button */}
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isRecording 
                    ? "bg-red-500 text-white animate-pulse" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Mic size={18} />
              </button>
              
              {/* Send Button */}
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Send size={18} />
              </button>
            </div>
            
            {/* Recording indicator */}
            {isRecording && (
              <div className="mt-2 text-center">
                <p className="text-xs text-red-500 animate-pulse">🔴 Recording... Tap mic again to stop</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
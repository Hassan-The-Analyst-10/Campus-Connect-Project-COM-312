import { useState, useEffect, useRef } from "react";
import { Send, Reply, CheckCheck, Clock, User, Circle, Paperclip, Smile } from "lucide-react";

// Mock data for demonstration
const MOCK_MESSAGES = [
  {
    id: 1,
    studentId: "STU001",
    studentName: "Emma Thompson",
    studentAvatar: "ET",
    course: "Computer Science",
    year: "3rd Year",
    subject: "Grade Inquiry",
    message: "Hello, I have a question about my recent exam grade. Could you please explain how the final grade was calculated?",
    timestamp: "2024-03-25T10:30:00",
    status: "unread",
    replies: []
  },
  {
    id: 2,
    studentId: "STU002",
    studentName: "Michael Chen",
    studentAvatar: "MC",
    course: "Business Administration",
    year: "2nd Year",
    subject: "Course Registration",
    message: "I'm having trouble registering for BUS301. The system shows it's full but I need it for my major requirement.",
    timestamp: "2024-03-24T15:45:00",
    status: "read",
    replies: [
      {
        id: 1,
        adminName: "Registrar",
        message: "Hello Michael, we've added an extra section for BUS301. Please try registering again.",
        timestamp: "2024-03-24T16:20:00"
      }
    ]
  },
  {
    id: 3,
    studentId: "STU003",
    studentName: "Sophia Rodriguez",
    studentAvatar: "SR",
    course: "Engineering",
    year: "4th Year",
    subject: "Internship Requirements",
    message: "What are the requirements for the industrial internship? I need to submit my application by next week.",
    timestamp: "2024-03-24T09:15:00",
    status: "unread",
    replies: []
  },
  {
    id: 4,
    studentId: "STU004",
    studentName: "James Wilson",
    studentAvatar: "JW",
    course: "Psychology",
    year: "1st Year",
    subject: "Schedule Conflict",
    message: "Two of my core classes are scheduled at the same time. Can you help me resolve this conflict?",
    timestamp: "2024-03-23T14:20:00",
    status: "read",
    replies: [
      {
        id: 1,
        adminName: "Dean's Office",
        message: "Hi James, please visit the Dean's office with your schedule so we can assist you better.",
        timestamp: "2024-03-23T15:00:00"
      }
    ]
  }
];

function MessagesFromStudents() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const replyInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Load messages on component mount
  useEffect(() => {
    loadMessages();
  }, []);

  // Auto-scroll to bottom of replies when new reply is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedMessage?.replies]);

  const loadMessages = () => {
    // In a real app, this would be an API call
    setIsLoading(true);
    setTimeout(() => {
      setMessages(MOCK_MESSAGES);
      setIsLoading(false);
    }, 500);
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedMessage) return;

    const newReply = {
      id: Date.now(),
      adminName: "Admin",
      message: replyText,
      timestamp: new Date().toISOString()
    };

    // Update messages with new reply
    const updatedMessages = messages.map(msg =>
      msg.id === selectedMessage.id
        ? {
            ...msg,
            replies: [...(msg.replies || []), newReply],
            status: "read"
          }
        : msg
    );

    setMessages(updatedMessages);
    setSelectedMessage({
      ...selectedMessage,
      replies: [...(selectedMessage.replies || []), newReply],
      status: "read"
    });
    setReplyText("");

    // In a real app, you would send this to an API
    // await sendReplyToAPI(selectedMessage.id, replyText);
  };

  const markAsRead = (messageId) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, status: "read" } : msg
    );
    setMessages(updatedMessages);
    if (selectedMessage?.id === messageId) {
      setSelectedMessage({ ...selectedMessage, status: "read" });
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || msg.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getUnreadCount = () => {
    return messages.filter(msg => msg.status === "unread").length;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Student Messages</h2>
            <p className="text-green-100 text-sm mt-1">
              {getUnreadCount()} unread {getUnreadCount() === 1 ? 'message' : 'messages'}
            </p>
          </div>
          <div className="bg-white/20 rounded-lg px-3 py-1">
            <span className="text-white text-sm">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[600px]">
        {/* Messages List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-200 space-y-3">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex space-x-2">
              {["all", "unread", "read"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterStatus(filter)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === filter
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Circle className="h-12 w-12 mb-2" />
                <p>No messages found</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    markAsRead(message.id);
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
                    selectedMessage?.id === message.id ? "bg-green-50" : ""
                  } ${message.status === "unread" ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        message.status === "unread" 
                          ? "bg-green-100 text-green-600" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {message.studentAvatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-900 truncate">
                            {message.studentName}
                          </p>
                          {message.status === "unread" && (
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{message.subject}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(message.timestamp)}</p>
                      </div>
                    </div>
                    {message.replies?.length > 0 && (
                      <CheckCheck className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="flex-1 flex flex-col">
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-lg">
                        {selectedMessage.studentAvatar}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedMessage.studentName}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedMessage.course} • {selectedMessage.year}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Student ID: {selectedMessage.studentId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{selectedMessage.subject}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Original Message */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-gray-100 rounded-lg px-4 py-3">
                    <p className="text-gray-800">{selectedMessage.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDate(selectedMessage.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Replies */}
                {selectedMessage.replies?.map((reply) => (
                  <div key={reply.id} className="flex justify-end">
                    <div className="max-w-[80%] bg-green-600 rounded-lg px-4 py-3">
                      <p className="text-white">{reply.message}</p>
                      <div className="flex items-center justify-end space-x-2 mt-2">
                        <span className="text-xs text-green-100">{reply.adminName}</span>
                        <span className="text-xs text-green-200">
                          {formatDate(reply.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Input */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <textarea
                      ref={replyInputRef}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendReply();
                        }
                      }}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      <Smile className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift + Enter for new line
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Reply className="h-16 w-16 mb-4" />
              <p className="text-lg">Select a message to view and reply</p>
              <p className="text-sm">Choose a message from the list to start responding</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagesFromStudents;
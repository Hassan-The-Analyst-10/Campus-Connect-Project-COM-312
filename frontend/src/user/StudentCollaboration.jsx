import { useEffect, useState } from "react";

function StudentCollaboration() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Fetch messages
  const fetchMessages = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/chat/messages");
    const data = await res.json();
    setMessages(data);
  };

  // Send message
  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch("http://127.0.0.1:5000/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: text,
        user_id: user.id,
      }),
    });

    setText("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // polling
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Collaboration Chat</h2>

      {/* Messages */}
      <div className="h-96 border rounded-lg p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white 
                            flex items-center justify-center text-sm font-bold">
              {msg.user.name[0]}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">
                  {msg.user.name}
                </span>
                <span className="text-xs text-gray-400">
                  {msg.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-700">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default StudentCollaboration;

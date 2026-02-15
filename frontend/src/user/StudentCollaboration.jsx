import { useState, useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';

function StudentCollaboration({ roomUrl, userName = "Student" }) {
  const [callFrame, setCallFrame] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callType, setCallType] = useState(null); // 'voice' or 'video'
  const containerRef = useRef(null);

  // Create a Daily room (you'd normally get this from your backend)
  const createRoom = async (type) => {
    try {
      // In production, this should be an API call to your backend
      // which then creates a room using Daily's REST API
      const response = await fetch('https://api.daily.co/v1/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_DAILY_API_KEY}`,
        },
        body: JSON.stringify({
          name: `collab-${Date.now()}`,
          privacy: 'public',
          properties: {
            enable_chat: true,
            enable_knocking: false,
            start_video_off: type === 'voice',
            start_audio_off: false,
          },
        }),
      });
      const room = await response.json();
      return room.url;
    } catch (error) {
      console.error('Failed to create room:', error);
      // Fallback demo room (for testing only)
      return 'https://your-domain.daily.co/hello';
    }
  };

  const startCall = async (type) => {
    setCallType(type);
    setIsCallActive(true);
    
    // Get or create room URL
    const url = await createRoom(type);
    
    // Create and join call
    const frame = DailyIframe.createFrame(containerRef.current, {
      showLeaveButton: true,
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
      },
      dailyConfig: {
        experimentalChromeVideoMuteLightOff: true,
      },
    });

    frame.join({
      url: url,
      userName: userName,
      videoSource: type === 'video',
      audioSource: true,
    });

    frame.on('left-meeting', () => {
      setIsCallActive(false);
      setCallType(null);
    });

    setCallFrame(frame);
  };

  const endCall = () => {
    if (callFrame) {
      callFrame.leave();
      callFrame.destroy();
      setCallFrame(null);
      setIsCallActive(false);
      setCallType(null);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (callFrame) {
        callFrame.leave();
        callFrame.destroy();
      }
    };
  }, [callFrame]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Collaboration Hub
        </h2>
        {isCallActive && (
          <button
            onClick={endCall}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg 
                       transition-colors flex items-center gap-2"
          >
            <span>🔴</span> End Call
          </button>
        )}
      </div>

      {/* Active Call Area */}
      {isCallActive ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
              <span className="font-medium">
                {callType === 'voice' ? '🎤 Voice Call' : '📹 Video Call'} • Active
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Room: Active • {userName}
            </div>
          </div>
          <div ref={containerRef} className="w-full h-[500px]" />
        </div>
      ) : (
        /* Collaboration Features */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Group Chat Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Group Chat</h3>
                <p className="text-sm text-gray-500">Real-time messaging</p>
              </div>
            </div>
            
            <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4">
              <ChatMessages />
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Send
              </button>
            </div>
          </div>

          {/* Voice/Video Call Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-2xl">🎥</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Live Collaboration</h3>
                <p className="text-sm text-gray-500">Start a voice or video call</p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => startCall('voice')}
                className="w-full bg-green-600 hover:bg-green-700 text-white 
                         px-6 py-4 rounded-lg transition-colors flex items-center justify-between group"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl">🎤</span>
                  <span className="font-medium">Start Voice Call</span>
                </span>
                <span className="text-sm opacity-75 group-hover:opacity-100">
                  → Audio only
                </span>
              </button>

              <button
                onClick={() => startCall('video')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white 
                         px-6 py-4 rounded-lg transition-colors flex items-center justify-between group"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl">📹</span>
                  <span className="font-medium">Start Video Call</span>
                </span>
                <span className="text-sm opacity-75 group-hover:opacity-100">
                  → Video & Audio
                </span>
              </button>
            </div>

            {/* Active Users */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>5 students online</span>
              </div>
              <div className="flex -space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 
                             flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                  >
                    S{i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Tools */}
      {!isCallActive && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <CollaborationCard
            icon="📝"
            title="Shared Whiteboard"
            description="Draw and brainstorm together"
            onClick={() => {/* Open whiteboard */}}
          />
          <CollaborationCard
            icon="📁"
            title="File Sharing"
            description="Share documents instantly"
            onClick={() => {/* Open file share */}}
          />
          <CollaborationCard
            icon="👥"
            title="Screen Sharing"
            description="Present your screen"
            onClick={() => {/* Start screen share */}}
          />
        </div>
      )}
    </div>
  );
}

// Chat Messages Component
function ChatMessages() {
  const messages = [
    { user: 'Alice', text: 'Has anyone started the assignment?', time: '10:30' },
    { user: 'Bob', text: 'Working on it now!', time: '10:31' },
    { user: 'Charlie', text: 'Need help with the last question', time: '10:32' },
  ];

  return (
    <div className="space-y-3">
      {messages.map((msg, idx) => (
        <div key={idx} className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-sm">{msg.user}</span>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
            <p className="text-sm text-gray-700">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Collaboration Card Component
function CollaborationCard({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-500 
                 hover:shadow-lg transition-all text-left group"
    >
      <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </button>
  );
}

export default StudentCollaboration;
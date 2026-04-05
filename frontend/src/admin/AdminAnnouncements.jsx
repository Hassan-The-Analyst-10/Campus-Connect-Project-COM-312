import { useEffect, useState } from "react";
import { Megaphone, Edit, Trash2, Plus, X, Calendar } from "lucide-react";

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
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

  const postAnnouncement = async () => {
    if (!title.trim() || !message.trim()) return;
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/announcements/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          message,
          created_by: 2 // Admin ID
        }),
      });
      
      if (response.ok) {
        resetForm();
        fetchAnnouncements();
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  const updateAnnouncement = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/announcements/${editingAnnouncement.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });
      
      if (response.ok) {
        resetForm();
        fetchAnnouncements();
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const deleteAnnouncement = async (id) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      try {
        await fetch(`http://127.0.0.1:5000/api/announcements/${id}`, {
          method: "DELETE",
        });
        fetchAnnouncements();
      } catch (error) {
        console.error("Error deleting announcement:", error);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setShowForm(false);
    setEditingAnnouncement(null);
  };

  const editAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setTitle(announcement.title);
    setMessage(announcement.message);
    setShowForm(true);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
          <p className="text-gray-500 mt-1">Create and manage campus announcements</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          New Announcement
        </button>
      </div>

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {editingAnnouncement ? "Edit Announcement" : "Create Announcement"}
              </h3>
              <button onClick={resetForm} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Announcement Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              placeholder="Announcement Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex gap-3">
              <button
                onClick={editingAnnouncement ? updateAnnouncement : postAnnouncement}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl transition"
              >
                {editingAnnouncement ? "Update" : "Post"}
              </button>
              <button
                onClick={resetForm}
                className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
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
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Megaphone size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <Calendar size={14} />
                        <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2 ml-13">{announcement.message}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editAnnouncement(announcement)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteAnnouncement(announcement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminAnnouncements;
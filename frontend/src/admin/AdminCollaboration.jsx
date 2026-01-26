function AdminCollaboration() {
  return (
    <>
      <h2 className="text-xl font-bold text-green-600 mb-4">
        Admin Collaboration
      </h2>

      <div className="border p-4 mb-4">
        💬 Internal Admin Chat
      </div>

      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-4 py-2">
          🎤 Voice Call
        </button>
        <button className="bg-green-600 text-white px-4 py-2">
          🎥 Video Call
        </button>
      </div>
    </>
  );
}

export default AdminCollaboration;

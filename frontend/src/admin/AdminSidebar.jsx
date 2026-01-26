function AdminSidebar({ setPage, logout }) {
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <div className="w-64 bg-green-600 text-white p-4 space-y-4">
      <h2 className="text-lg font-bold">
        {admin.role} Panel
      </h2>

      <button onClick={() => setPage("messages")} className="block">
        Messages from Students
      </button>

      <button onClick={() => setPage("announcements")} className="block">
        Announcements
      </button>

      <button onClick={() => setPage("requests")} className="block">
        Requests
      </button>

      <button onClick={() => setPage("collab")} className="block">
        Admin Collaboration
      </button>

      <hr />

      <button
        onClick={logout}
        className="bg-white text-green-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;

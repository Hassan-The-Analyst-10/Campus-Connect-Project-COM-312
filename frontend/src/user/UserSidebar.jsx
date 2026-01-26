function UserSidebar({ setPage }) {
  return (
    <div className="w-64 bg-green-600 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold">Student Panel</h2>

      <button onClick={() => setPage("announcements")}>Announcements</button>
      <button onClick={() => setPage("message")}>Message Admin</button>
      <button onClick={() => setPage("request")}>Send Request</button>
      <button onClick={() => setPage("collab")}>Student Collaboration</button>
    </div>
  );
}

export default UserSidebar;

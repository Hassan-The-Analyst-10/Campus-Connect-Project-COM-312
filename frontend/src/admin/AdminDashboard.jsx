import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import MessagesFromStudents from "./MessagesFromStudents";
import AdminAnnouncements from "./AdminAnnouncements";
import AdminRequests from "./AdminRequests";
import AdminCollaboration from "./AdminCollaboration";

function AdminDashboard() {
  const [page, setPage] = useState("announcements");

  const logout = () => {
    localStorage.removeItem("admin");
    window.location.replace("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar setPage={setPage} logout={logout} />

      <div className="flex-1 p-6">
        {page === "messages" && <MessagesFromStudents />}
        {page === "announcements" && <AdminAnnouncements />}
        {page === "requests" && <AdminRequests />}
        {page === "collab" && <AdminCollaboration />}
      </div>
    </div>
  );
}

export default AdminDashboard;

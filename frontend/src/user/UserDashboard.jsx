import { useState } from "react";
import UserSidebar from "./UserSidebar";
import MessageAdmin from "./MessageAdmin";
import UserAnnouncements from "./UserAnnouncements";
import NewRequest from "./NewRequest";
import StudentCollaboration from "./StudentCollaboration";

function UserDashboard() {
  const [page, setPage] = useState("announcements");

  const renderPage = () => {
    if (page === "message") return <MessageAdmin />;
    if (page === "request") return <NewRequest />;
    if (page === "collab") return <StudentCollaboration />;
    return <UserAnnouncements />;
  };

  return (
    <div className="flex min-h-screen">
      <UserSidebar setPage={setPage} />
      <div className="flex-1 p-6 bg-white">{renderPage()}</div>
    </div>
  );
}

export default UserDashboard;

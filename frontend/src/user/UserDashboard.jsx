import { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar";
import UserAnnouncements from "./UserAnnouncements";
import NewRequest from "./NewRequest";
import StudentCollaboration from "./StudentCollaboration";

function UserDashboard() {
  const [page, setPage] = useState("announcements");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      window.location.href = "/user/login";
    } else {
      setUser(storedUser);
    }
  }, []);

  if (!user) return null;

  const renderPage = () => {
    if (page === "request") return <NewRequest />;
    if (page === "collab") return <StudentCollaboration />;
    return <UserAnnouncements />;
  };

  return (
    <div className="flex min-h-screen">
      <UserSidebar setPage={setPage}
  activePage={page}
  user={user}/>

      <div className="flex-1 p-6 bg-white">
        <h1 className="text-xl font-semibold mb-4">
          Welcome, {user.name} 👋
        </h1>

        {renderPage()}
      </div>
    </div>
  );
}

export default UserDashboard;

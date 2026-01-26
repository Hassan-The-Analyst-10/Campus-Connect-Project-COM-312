import { useEffect, useState } from "react";

function UserAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/announcements/")
      .then(res => res.json())
      .then(data => setAnnouncements(data));
  }, []);

  return (
    <div className="mb-6">
      <h2 className="font-semibold">Announcements</h2>
      {announcements.map(a => (
        <div key={a.id} className="border p-2 mb-2">
          <b>{a.title}</b>
          <p>{a.message}</p>
        </div>
      ))}
    </div>
  );
}

export default UserAnnouncements;

import { useState } from "react";

function AdminAnnouncements() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const postAnnouncement = async () => {
    await fetch("http://127.0.0.1:5000/api/announcements/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        message,
        created_by: 1
      }),
    });

    alert("Announcement posted");
    setTitle("");
    setMessage("");
  };

  return (
    <>
      <h2 className="text-xl font-bold text-green-600 mb-4">
        Post Announcement
      </h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={postAnnouncement}
        className="bg-green-600 text-white px-4 py-2"
      >
        Post
      </button>
    </>
  );
}

export default AdminAnnouncements;

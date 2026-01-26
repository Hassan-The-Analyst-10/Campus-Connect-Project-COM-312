import { useEffect, useState } from "react";

function AdminRequests() {
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    fetch("http://127.0.0.1:5000/api/requests/")
      .then((res) => res.json())
      .then((data) => setRequests(data));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://127.0.0.1:5000/api/requests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    loadRequests();
  };

  return (
    <>
      <h2 className="text-xl font-bold text-green-600 mb-4">
        Student Requests
      </h2>

      {requests.map((r) => (
        <div key={r.id} className="border p-3 mb-2">
          <b>{r.title}</b>
          <p>{r.description}</p>
          <p>Status: {r.status}</p>

          <select
            className="border p-1 mt-2"
            onChange={(e) => updateStatus(r.id, e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      ))}
    </>
  );
}

export default AdminRequests;

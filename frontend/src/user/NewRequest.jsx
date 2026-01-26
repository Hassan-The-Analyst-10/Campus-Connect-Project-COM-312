import { useState } from "react";

function NewRequest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitRequest = async () => {
    await fetch("http://127.0.0.1:5000/api/requests/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        user_id: 1   // student id (demo)
      })
    });

    alert("Request submitted");
  };

  return (
    <div>
      <h2 className="font-semibold">New Service Request</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={submitRequest}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}

export default NewRequest;

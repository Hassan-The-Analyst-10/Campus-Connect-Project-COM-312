function StudentCollaboration() {
  return (
    <>
      <h2 className="text-xl font-bold text-green-600 mb-4">
        Student Collaboration
      </h2>

      <div className="border p-4 mb-4">
        💬 Group Chat (Coming Soon)
      </div>

      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          🎤 Voice Call
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          🎥 Video Call
        </button>
      </div>
    </>
  );
}

export default StudentCollaboration;

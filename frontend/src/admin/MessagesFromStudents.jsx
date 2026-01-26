function MessagesFromStudents() {
  return (
    <>
      <h2 className="text-xl font-bold text-green-600 mb-4">
        Messages from Students
      </h2>

      <div className="border p-4 h-64 mb-4 overflow-y-scroll">
        💬 Student messages will appear here
      </div>

      <input
        className="border p-2 w-full"
        placeholder="Type reply..."
      />
    </>
  );
}

export default MessagesFromStudents;

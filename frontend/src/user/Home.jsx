import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-white">
        <h2 className="text-3xl font-bold text-green-600">
          Welcome to CampusConnect
        </h2>
      </div>
    </>
  );
}

export default Home;

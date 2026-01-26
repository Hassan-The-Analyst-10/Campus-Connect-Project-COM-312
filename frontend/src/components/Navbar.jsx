import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">CampusConnect</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/user/login">Sign In</Link>
        <Link to="/user/register">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;

import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/user/dashboard";
      } else {
        alert(data.message);
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    alert("Google login coming soon 🚀");
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-green-200 via-blue-200 to-purple-200">
      
      <form
        onSubmit={login}
        className="bg-white/95 backdrop-blur-lg shadow-xl rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-1">
          Campus Connect
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Student Login Portal
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="student@university.ac.ke"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md font-medium transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={googleLogin}
          className="border w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            Sign in with Google
          </span>
        </button>
      </form>
    </div>
  );
}

export default Login;

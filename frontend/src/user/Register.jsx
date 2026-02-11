import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "student",
        }),
      });

      if (res.ok) {
        alert("Registered successfully 🎉");
        window.location.href = "/user/login";
      } else {
        alert("Registration failed");
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-green-200 via-blue-200 to-purple-200">

      <form
        onSubmit={register}
        className="bg-white/95 backdrop-blur-lg shadow-xl rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-1">
          Campus Connect
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Student Registration
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Zakira Abdi Ali"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md font-medium transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <a
            href="/user/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;

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

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/user/dashboard";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-200 to-purple-200">
      <form
        onSubmit={register}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-1">
          Campus Connect
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Student Registration
        </p>

        <input
          className="border rounded-md p-2 w-full mb-4"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="border rounded-md p-2 w-full mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="border rounded-md p-2 w-full mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white w-full py-2 rounded-md"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/user/login" className="text-green-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;

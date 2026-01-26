import { useState } from "react";

const ADMINS = [
  { email: "registrar@campus.com", password: "reg123", role: "Registrar" },
  { email: "dean@campus.com", password: "dean123", role: "Dean" },
  { email: "it@campus.com", password: "it123", role: "IT Support" },
];

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    const admin = ADMINS.find(
      (a) => a.email === email && a.password === password
    );

    if (!admin) {
      alert("Invalid admin credentials");
      return;
    }

    localStorage.setItem("admin", JSON.stringify(admin));
    window.location.replace("/admin");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form className="border p-6 w-80" onSubmit={login}>
        <h2 className="text-xl font-bold text-green-600 mb-4">
          Admin Login
        </h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white w-full py-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;

import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/user/dashboard";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form onSubmit={login} className="border p-6 w-80">
        <h2 className="text-xl text-green-600 font-bold mb-4">Student Login</h2>

        <input className="border p-2 w-full mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-3" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="bg-green-600 text-white w-full py-2">Login</button>
      </form>
    </div>
  );
}

export default Login;

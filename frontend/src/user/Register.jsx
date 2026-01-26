import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        role: "student"
      })
    });

    if (res.ok) {
      alert("Registered successfully");
      window.location.href = "/user/login";
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form onSubmit={register} className="border p-6 w-80">
        <h2 className="text-xl text-green-600 font-bold mb-4">Student Register</h2>

        <input className="border p-2 w-full mb-3" placeholder="Name" onChange={e => setName(e.target.value)} />
        <input className="border p-2 w-full mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-3" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="bg-green-600 text-white w-full py-2">Register</button>
      </form>
    </div>
  );
}

export default Register;

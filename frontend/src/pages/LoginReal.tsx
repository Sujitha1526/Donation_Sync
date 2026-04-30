import { useState } from "react";
import { loginUser } from "../api";

export default function LoginReal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await loginUser({ email, password });

    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.user.role);

    alert("Login success");
    window.location.href = "/";
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Login</h1>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await loginUser(form);

    console.log("LOGIN RESPONSE 👉", res); // 🔥 ADD THIS

    if (!res.token) {
      alert(res.message || "Login failed");
      return;
    }

    login(res.user, res.token);

    switch (res.user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "donor":
        navigate("/donor");
        break;
      case "organization":
        navigate("/organization");
        break;
      case "volunteer":
        navigate("/volunteer");
        break;
      default:
        navigate("/");
    }

  } catch (err) {
    console.error(err);
    alert("Backend error");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl space-y-6">

        <h1 className="text-3xl font-bold text-white text-center">
          DonationSync
        </h1>

        <p className="text-center text-gray-400">
          Login to your account
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
        >
          Login
        </button>

        <p className="text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
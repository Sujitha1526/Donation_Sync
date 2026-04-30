import { useState } from "react";
import { registerUser } from "../api";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const handleSubmit = async () => {
    const res = await registerUser(form);

    if (res.message) {
      alert("Registered successfully");
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">

      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl space-y-6">

        <h1 className="text-3xl font-bold text-white text-center">
          Create Account
        </h1>

        <input
          placeholder="Name"
          className="w-full p-3 rounded-lg bg-black/40 text-white border border-gray-600"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-black/40 text-white border border-gray-600"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-black/40 text-white border border-gray-600"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full p-3 rounded-lg bg-black/40 text-white border border-gray-600"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="donor">Donor</option>
          <option value="organization">Organization</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 transition text-white font-semibold"
        >
          Register
        </button>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
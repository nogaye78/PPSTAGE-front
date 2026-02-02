import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await authAPI.post("/auth/jwt/create/", {
        email: formData.email,
        password: formData.password,
      });

      setStatus({ type: "success", message: "Connexion réussie ✅" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur connexion:", error.response || error);
      const errMsg = error.response?.data?.non_field_errors?.[0] || "";

      if (errMsg === "No active account found with the given credentials") {
        setStatus({ type: "error", message: "Adresse email ou mot de passe incorrect ❌" });
      } else {
        setStatus({ type: "error", message: "Erreur lors de la connexion ❌" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/80 font-sans px-4">
      <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-[420px]">
        <h2 className="text-gray-700 text-lg mb-8 font-bold text-center border-b pb-4">
          Se connecter
        </h2>

        {status.message && (
          <div
            className={`p-3 mb-6 rounded text-sm text-center font-bold ${
              status.type === "success"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b border-gray-300 pb-2 focus:border-black outline-none transition-all"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-b border-gray-300 pb-2 focus:border-black outline-none transition-all"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#45484b] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white py-3 rounded-md font-bold shadow-lg flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Pas de compte ?
          <Link
            to="/register"
            className="text-yellow-500 font-bold ml-2 hover:underline"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

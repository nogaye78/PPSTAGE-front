import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/auth";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authAPI.post("/auth/jwt/create/", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      setStatus({ type: "success", message: "Connexion réussie ✅ Bienvenue !" });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.error("❌ Erreur de connexion:", error.response || error);
      setStatus({
        type: "error",
        message:
          error.response?.data?.detail ||
          error.response?.data?.non_field_errors?.[0] ||
          "Email ou mot de passe incorrect ❌",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/80 font-sans px-4">
      <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-[420px]">
        <h2 className="text-gray-700 text-lg mb-8 font-bold text-center border-b pb-4">
          Connexion Admin
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
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border-b border-gray-300 pb-2 focus:border-black outline-none transition-all"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot passe"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border-b border-gray-300 pb-2 pr-10 focus:border-black outline-none transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#45484b] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white py-3 rounded-md font-bold shadow-lg"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-8 text-center text-sm space-y-2">
          <Link
            to="/forgot-password"
            className="text-yellow-500 font-bold hover:underline block"
          >
            Mot de passe oublié ?
          </Link>
          <p className="text-gray-600">
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
    </div>
  );
};

export default Login;

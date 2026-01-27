import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setStatus({ type: "error", message: "Veuillez accepter les termes ❗" });
      return;
    }

    try {
      await API.post("register/", formData); // ✅ slash final obligatoire
      setStatus({ type: "success", message: "Inscription réussie 🎉 Redirection..." });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.error || "Erreur d'inscription ❌",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/80 font-sans px-4">
      <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-[420px]">
        <h2 className="text-gray-700 text-lg mb-8 font-bold text-center border-b pb-4">
          Créer un compte Admin
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
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            onChange={handleChange}
            className="w-full border-b border-gray-300 pb-2 focus:border-black outline-none transition-all"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border-b border-gray-300 pb-2 focus:border-black outline-none transition-all"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-gray-600 text-sm cursor-pointer hover:text-black"
            >
              Accepter les termes et conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#45484b] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white py-3 rounded-md font-bold shadow-lg"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Déjà un compte ?
          <Link
            to="/login"
            className="text-yellow-500 font-bold ml-2 hover:text-yellow-600 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

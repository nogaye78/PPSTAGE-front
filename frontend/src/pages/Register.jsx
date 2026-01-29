import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/auth";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
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
      const response = await authAPI.post("/auth/users/", {
        email: formData.email,
        password: formData.password,
        re_password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      console.log("✅ Inscription réussie:", response.data);
      setStatus({
        type: "success",
        message: "Inscription réussie 🎉 Vous pouvez maintenant vous connecter.",
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("❌ Erreur d'inscription:", error.response || error);
      setStatus({
        type: "error",
        message:
          error.response?.data?.email?.[0] ||
          error.response?.data?.password?.[0] ||
          error.response?.data?.non_field_errors?.[0] ||
          "Erreur d'inscription ❌",
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
            name="first_name"
            placeholder="Prénom"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border-b border-gray-300 pb-2 focus:border-black outline-none transition-all"
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder="Nom"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border-b border-gray-300 pb-2 focus:border-black outline-none transition-all"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b border-gray-300 pb-2 focus:border-black outline-none transition-all"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
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

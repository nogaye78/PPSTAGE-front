import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "", // Django JWT utilise username, pas email par défaut
    password: "",
  });
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("login/", formData);

      // Stockage du token
      if (rememberMe) {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
      } else {
        sessionStorage.setItem("access", res.data.access);
        sessionStorage.setItem("refresh", res.data.refresh);
      }

      setMessage("Connexion réussie ✅");
      console.log(res.data);

      // Redirection vers le dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Email ou mot de passe incorrect ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/80 font-sans">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm text-[#45484b] font-bold">
          R
        </div>
        <span className="text-white font-bold text-xl uppercase tracking-tighter">
          Red Product
        </span>
      </div>

      <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-[420px]">
        <h2 className="text-gray-700 text-md mb-8">
          Connectez-vous en tant que Admin
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-red-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            className="w-full border-b border-gray-200 pb-2 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-b border-gray-200 pb-2 focus:outline-none"
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="text-gray-600 text-sm">
              Gardez-moi connecté
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#45484b] text-white py-3 rounded-md font-medium"
          >
            Se connecter
          </button>
        </form>
      </div>

      <div className="mt-6 text-center space-y-2">
        <Link
          to="/forgot-password"
          className="text-yellow-500 font-bold block"
        >
          Mot de passe oublié?
        </Link>
        <p className="text-white text-sm">
          Vous n'avez pas de compte?
          <Link to="/register" className="text-yellow-500 font-bold ml-1">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

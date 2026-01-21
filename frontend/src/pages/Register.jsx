import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setMessage("Veuillez accepter les termes et conditions ❗");
      return;
    }

    try {
      const res = await API.post("register/", formData);
      setMessage("Inscription réussie 🎉 Vous pouvez vous connecter.");
      console.log(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Erreur lors de l'inscription ❌ Vérifiez vos informations.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/80 font-sans">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-[#45484b]"></div>
        </div>
        <span className="text-white font-bold text-xl uppercase tracking-tighter">
          Red Product
        </span>
      </div>

      <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-[420px]">
        <h2 className="text-gray-700 text-md mb-8">
          Inscrivez-vous en tant que Admin
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-red-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            name="username"
            placeholder="Nom"
            value={formData.username}
            onChange={handleChange}
            className="w-full border-b border-gray-200 pb-2 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
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
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-gray-600 text-sm">
              Accepter les termes et la politique
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#45484b] text-white py-3 rounded-md font-medium"
          >
            S'inscrire
          </button>
        </form>
      </div>

      <p className="mt-6 text-white text-sm">
        Vous avez déjà un compte?
        <Link to="/login" className="text-yellow-500 font-bold ml-1">
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("password_reset/", { email });
      setStatus({ type: "success", message: "Lien de réinitialisation envoyé par email 📧" });
    } catch (error) {
      setStatus({ type: "error", message: "Erreur lors de l'envoi de l'email ❌" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/80 font-sans px-4">
      <div className="flex items-center gap-2 mb-8 text-white">
        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm text-[#45484b] font-bold">R</div>
        <span className="font-bold text-xl uppercase tracking-tighter">Red Product</span>
      </div>

      <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-[420px]">
        <h2 className="text-gray-700 font-medium text-lg mb-4">Mot de passe oublié?</h2>
        <p className="text-gray-600 text-sm mb-8 leading-relaxed">Entrez votre adresse e-mail ci-dessous pour recevoir les instructions.</p>

        {status.message && (
          <div className={`p-3 mb-6 rounded text-sm text-center font-medium ${
            status.type === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          <input type="email" placeholder="Votre e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-gray-200 pb-2 focus:outline-none" required />
          <button type="submit" className="w-full bg-[#45484b] hover:bg-[#2d2f31] transition-colors duration-300 text-white py-3 rounded-md font-medium shadow-md">
            Envoyer
          </button>
        </form>
      </div>

      <p className="mt-6 text-white text-sm">
        Revenir à la <Link to="/login" className="text-yellow-500 font-bold ml-1 hover:underline">connexion</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
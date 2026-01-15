import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  bg-gray-500/50 font-sans px-4">
      <div className="flex items-center gap-2 mb-8 text-white">
        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
           <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-[#45484b]"></div>
        </div>
        <span className="font-bold text-xl uppercase tracking-tighter">Red Product</span>
      </div>

      <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-[420px]">
        <h2 className="text-gray-700 font-medium text-lg mb-4">Mot de passe oublié?</h2>
        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          Entrez votre adresse e-mail ci-dessous et nous vous envoyons des instructions sur la façon de modifier votre mot de passe.
        </p>
        
        <form className="space-y-10">
          <input type="email" placeholder="Votre e-mail" className="w-full border-b border-gray-200 pb-2 focus:outline-none" />
          <button className="w-full bg-[#45484b] text-white py-3 rounded-md font-medium">Envoyer</button>
        </form>
      </div>
      
      <p className="mt-6 text-white text-sm">
        Revenir à la <Link to="/login" className="text-yellow-500 font-bold ml-1">connexion</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
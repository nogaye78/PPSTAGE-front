import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/80 font-sans">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
           <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-[#45484b]"></div>
        </div>
        <span className="text-white font-bold text-xl uppercase tracking-tighter">Red Product</span>
      </div>

      <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-[420px]">
        <h2 className="text-gray-700 text-md mb-8">Inscrivez-vous en tant que Admin</h2>
        <form className="space-y-8">
          <input type="text" placeholder="Nom" className="w-full border-b border-gray-200 pb-2 focus:outline-none" />
          <input type="email" placeholder="E-mail" className="w-full border-b border-gray-200 pb-2 focus:outline-none" />
          <input type="password" placeholder="Mot de passe" className="w-full border-b border-gray-200 pb-2 focus:outline-none" />
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" className="w-4 h-4 border-gray-300 rounded" />
            <label htmlFor="terms" className="text-gray-600 text-sm">Accepter les termes et la politique</label>
          </div>

          <button className="w-full bg-[#45484b] text-white py-3 rounded-md font-medium">S'inscrire</button>
        </form>
      </div>
      <p className="mt-6 text-white text-sm">
        Vous avez déjà un compte? <Link to="/login" className="text-yellow-500 font-bold ml-1">Se connecter</Link>
      </p>
    </div>
  );
};

export default Register;
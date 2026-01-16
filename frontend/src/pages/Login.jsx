import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  bg-gray-900/80 font-sans">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm text-[#45484b] font-bold">R</div>
        <span className="text-white font-bold text-xl uppercase tracking-tighter">Red Product</span>
      </div>

      <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-[420px]">
        <h2 className="text-gray-700 text-md mb-8">Connectez-vous en tant que Admin</h2>
        <form className="space-y-8">
          <input type="email" placeholder="E-mail" className="w-full border-b border-gray-200 pb-2 focus:outline-none" />
          <input type="password" placeholder="Mot de passe" className="w-full border-b border-gray-200 pb-2 focus:outline-none" />
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4 border-gray-300 rounded" />
            <label htmlFor="remember" className="text-gray-600 text-sm">Gardez-moi connecté</label>
          </div>

          <button className="w-full bg-[#45484b] text-white py-3 rounded-md font-medium">Se connecter</button>
        </form>
      </div>
      
      <div className="mt-6 text-center space-y-2">
        <Link to="/forgot-password" size="sm" className="text-yellow-500 font-bold block">Mot de passe oublié?</Link>
        <p className="text-white text-sm">
          Vous n'avez pas de compte? <Link to="/register" className="text-yellow-500 font-bold ml-1">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Hotel } from 'lucide-react';

const Sidebar = ({ user }) => {
  // Valeur par défaut si user non fourni
  const defaultUser = {
    name: "Utilisateur",
    avatar: "https://i.pravatar.cc/150?u=default",
    status: "hors ligne",
  };
  
  const { name, avatar, status } = user || defaultUser;

  return (
    <div className="w-64 h-screen bg-gray-900/80 text-white flex flex-col fixed left-0 top-0 overflow-hidden z-30">
      
      {/* Logo */}
      <div className="p-6 flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full shadow-md">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[18px] border-b-[#45484b]"></div>
        </div>
        <span className="font-bold text-lg uppercase tracking-wider">Red Product</span>
      </div>

      {/* Section principale */}
      <p className="px-6 text-xs text-gray-400 uppercase mb-4">Principal</p>

      {/* Navigation */}
      <nav className="flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive ? 'bg-white text-black font-bold shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:translate-x-1'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/hotels"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive ? 'bg-white text-black font-bold shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:translate-x-1'
            }`
          }
        >
          <Hotel size={20} />
          <span>Liste des hôtels</span>
        </NavLink>
      </nav>

      {/* Profil utilisateur */}
      <div className="p-4 border-t border-gray-600 flex items-center gap-3 mt-4">
        <div className="relative group">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full border border-gray-500 shadow-sm object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
              status === 'en ligne' ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{name}</p>
          <p className={`text-xs ${status === 'en ligne' ? 'text-green-400' : 'text-gray-400'}`}>
            {status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

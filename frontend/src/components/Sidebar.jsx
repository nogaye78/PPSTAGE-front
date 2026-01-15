import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Hotel } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#45484b] text-white flex flex-col fixed left-0 top-0 overflow-hidden z-30">
      <div className="p-6 flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
           <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-[#45484b]"></div>
        </div>
        <span className="font-bold text-lg uppercase tracking-wider">Red Product</span>
      </div>

      <p className="px-6 text-xs text-gray-400 uppercase mb-4">Principal</p>

      <nav className="flex-1">
        <NavLink 
          to="/dashboard" 
          className={({isActive}) => `flex items-center gap-3 px-6 py-3 transition-colors ${isActive ? 'bg-white text-black font-bold' : 'text-gray-300 hover:bg-gray-700'}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/hotels" 
          className={({isActive}) => `flex items-center gap-3 px-6 py-3 transition-colors ${isActive ? 'bg-white text-black font-bold' : 'text-gray-300 hover:bg-gray-700'}`}
        >
          <Hotel size={20} />
          <span>Liste des hôtels</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-600 flex items-center gap-3">
        <div className="relative">
          <img src="https://i.pravatar.cc/150?u=mouhamet" alt="Profile" className="w-10 h-10 rounded-full border border-gray-500" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#45484b] rounded-full"></div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">Mouhamet Badiane</p>
          <p className="text-xs text-green-400">en ligne</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; // <--- CETTE LIGNE EST INDISPENSABLE
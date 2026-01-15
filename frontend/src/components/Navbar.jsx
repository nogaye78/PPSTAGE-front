import React from 'react';
import { Search, Bell, LogOut } from 'lucide-react';

const Navbar = ({ title }) => {
  return (
    <nav className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-20">
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Recherche" className="pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm w-64 focus:outline-none" />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <Bell size={22} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-md font-bold">3</span>
          </div>
          <img src="https://i.pravatar.cc/150?u=mouhamet" alt="User" className="w-8 h-8 rounded-full border" />
          <LogOut size={22} className="text-gray-600 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; // <--- VÉRIFIEZ BIEN CETTE LIGNE AUSSI
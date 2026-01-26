import React from 'react';
import { Search, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title, searchTerm, onSearchChange, notificationCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ici tu peux aussi supprimer le token, le localStorage, etc.
    localStorage.removeItem("user"); // par exemple
    navigate("/login"); // redirection vers page de connexion
  };

  return (
    <nav className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-20">
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>

      <div className="flex items-center gap-6">
        {/* Barre de recherche */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Recherche par ville ou hôtel..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm w-64 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative cursor-pointer">
            <Bell size={22} className="text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-md font-bold">
                {notificationCount}
              </span>
            )}
          </div>

          <img
            src="https://i.pravatar.cc/150?u=mouhamet"
            alt="User"
            className="w-8 h-8 rounded-full border"
          />

          {/* Bouton déconnexion */}
          <LogOut 
            size={22} 
            className="text-gray-600 cursor-pointer" 
            onClick={handleLogout} 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

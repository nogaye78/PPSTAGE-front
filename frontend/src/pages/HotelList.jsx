import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import HotelModal from '../components/HotelModal';

const HotelList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // On initialise avec une liste vide ou vos premiers hôtels
  const [hotels, setHotels] = useState([]);

  const addNewHotel = (newHotel) => {
    setHotels([newHotel, ...hotels]); // Ajoute le nouvel hôtel au début de la liste
  };

  return (
    <div className="flex min-h-screen bg-[#f0f2f5]">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Navbar title="Liste des hôtels" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold">Hôtels <span className="text-gray-400 ml-2">{hotels.length}</span></h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-black text-black rounded-md hover:bg-gray-50 font-medium transition-all"
            >
              <span className="text-xl">+</span> Créer un nouveau hôtel
            </button>
          </div>

          {hotels.length === 0 ? (
            <div className="text-center py-20 text-gray-400 border-2 border-dashed rounded-xl">
              Aucun hôtel ajouté. Cliquez sur le bouton pour commencer.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-44 object-cover" />
                  <div className="p-4">
                    <p className="text-[10px] text-orange-600 font-bold uppercase tracking-tight mb-1 truncate">{hotel.location}</p>
                    <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">{hotel.name}</h3>
                    <p className="text-sm text-gray-700 font-medium">{hotel.price} par nuit</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isModalOpen && (
          <HotelModal 
            onClose={() => setIsModalOpen(false)} 
            onAddHotel={addNewHotel} 
          />
        )}
      </main>
    </div>
  );
};

export default HotelList;
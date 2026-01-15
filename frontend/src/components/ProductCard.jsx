import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import HotelModal from '../components/HotelModal';

const HotelList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hotels = [
    { id: 1, name: "Hôtel Terrou-Bi", location: "Boulevard Martin Luther King Dakar, 11500", price: "25.000 XOF", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { id: 2, name: "King Fahd Palace", location: "Rte des Almadies, Dakar", price: "20.000 XOF", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { id: 3, name: "Radisson Blu Hotel", location: "Rte de la Corniche O, Dakar 16868", price: "22.000 XOF", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400" },
    { id: 4, name: "Pullman Dakar Teranga", location: "Place de l'Indépendance, 10 Rue Pl. 29, Dakar", price: "30.000 XOF", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Navbar title="Liste des hôtels" />
        
        <div className="p-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-medium text-gray-800">Hôtels</h2>
              <span className="text-gray-400 text-lg">{hotels.length}</span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all font-medium text-sm"
            >
              <span className="text-xl">+</span>
              Créer un nouveau hôtel
            </button>
          </div>

          {/* Grid Hôtels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
                <img src={hotel.img} alt={hotel.name} className="w-full h-40 object-cover" />
                <div className="p-4 space-y-2">
                  <p className="text-[10px] text-orange-700 font-medium">{hotel.location}</p>
                  <h3 className="font-bold text-gray-800">{hotel.name}</h3>
                  <p className="text-xs text-gray-600">{hotel.price} par nuit</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Le Formulaire surgissant */}
        <HotelModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  );
};

export default HotelList;
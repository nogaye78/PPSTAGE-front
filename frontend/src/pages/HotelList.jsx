import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import HotelModal from '../components/HotelModal';
// import HotelDetailsModal from '../components/HotelDetailsModal';

const HotelList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [editingHotel, setEditingHotel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(0);

  const [hotels, setHotels] = useState(() => {
    const savedHotels = localStorage.getItem("hotels");
    return savedHotels ? JSON.parse(savedHotels) : [];
  });

  useEffect(() => {
    localStorage.setItem("hotels", JSON.stringify(hotels));
  }, [hotels]);

  const addNewHotel = (newHotel) => {
    setHotels([newHotel, ...hotels]);
    setNotifications(prev => prev + 1); // 🔔 Nouvelle notification
  };

  const updateHotel = (updatedHotel) => {
    setHotels(hotels.map(h => h.id === updatedHotel.id ? updatedHotel : h));
  };

  const deleteHotel = (hotelId) => {
    setHotels(hotels.filter(h => h.id !== hotelId));
  };

  // 🔍 Filtrage par nom OU ville
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f0f2f5]">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Navbar
          title="Liste des hôtels"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          notificationCount={notifications}
        />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div>
              <h2 className="text-xl font-semibold">Hôtels</h2>
              <p className="text-sm text-gray-400">{filteredHotels.length} hôtel(s)</p>
            </div>
            <button 
              onClick={() => { setEditingHotel(null); setIsModalOpen(true); }}
              className="flex items-center gap-2 px-5 py-2 bg-transparent border border-black text-black rounded-lg hover:bg-gray-50 font-medium transition-all"
            >
              <span className="text-xl">+</span> Créer un nouveau hôtel
            </button>
          </div>

          {filteredHotels.length === 0 ? (
            <div className="text-center py-24 text-gray-400 border-2 border-dashed rounded-2xl bg-white">
              Aucun hôtel trouvé.
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="block mx-auto mt-4 text-sm text-blue-600 hover:underline"
                >
                  Réinitialiser la recherche
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {filteredHotels.map((hotel) => (
                <div 
                  key={hotel.id} 
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1"
                >
                  <div className="relative">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-44 object-cover cursor-pointer"
                      onClick={() => setSelectedHotel(hotel)}
                    />

                    {/* Boutons visibles au hover */}
                    <div className="absolute inset-0 flex items-start justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                      <div className="flex gap-2">
                        <button 
                          className="bg-white text-blue-600 text-xs font-semibold px-3 py-1 rounded-md shadow hover:bg-blue-50"
                          onClick={() => { setEditingHotel(hotel); setIsModalOpen(true); }}
                        >
                          Modifier
                        </button>
                        <button 
                          className="bg-white text-red-600 text-xs font-semibold px-3 py-1 rounded-md shadow hover:bg-red-50"
                          onClick={() => deleteHotel(hotel.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] text-orange-600 font-bold uppercase tracking-tight mb-1 truncate">
                      {hotel.location}
                    </p>
                    <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-gray-700 font-medium">
                      {hotel.price} par nuit
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isModalOpen && (
          <HotelModal 
            onClose={() => setIsModalOpen(false)} 
            onAddHotel={editingHotel ? updateHotel : addNewHotel} 
            hotel={editingHotel}
          />
        )}

        {selectedHotel && (
          <HotelDetailsModal
            hotel={selectedHotel}
            onClose={() => setSelectedHotel(null)}
          />
        )}
      </main>
    </div>
  );
};

export default HotelList;

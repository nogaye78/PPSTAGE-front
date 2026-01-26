import React, { useState } from 'react';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

const HotelModal = ({ onClose, onAddHotel }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    price: '',
    currency: 'F XOF',
    image: null
  });

  // --- MODIFICATION ICI : Utilisation de FileReader pour le Base64 ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // reader.result contient l'image sous forme de chaîne de caractères
        setFormData({ ...formData, image: reader.result });
      };

      reader.readAsDataURL(file); // Convertit le fichier en base64
    }
  };
  // ----------------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) {
      return alert("Veuillez remplir le nom et ajouter une photo");
    }
    
    onAddHotel({
      id: Date.now(),
      name: formData.name,
      location: formData.address,
      price: `${formData.price} ${formData.currency}`,
      image: formData.image // C'est maintenant une chaîne Base64 permanente
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-dashed flex items-center gap-4">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h2 className="uppercase font-bold text-gray-700 text-sm tracking-widest">
            Créer un nouveau hôtel
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Nom de l'hôtel" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 outline-none" 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Adresse" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 outline-none" 
              onChange={e => setFormData({...formData, address: e.target.value})} 
            />
            <input 
              type="email" 
              placeholder="E-mail" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 outline-none" 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Téléphone" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 outline-none" 
              onChange={e => setFormData({...formData, phone: e.target.value})} 
            />
            <input 
              type="number" 
              placeholder="Prix par nuit" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-gray-200 outline-none" 
              onChange={e => setFormData({...formData, price: e.target.value})} 
            />
            <select 
              className="p-2 border rounded-lg bg-white outline-none" 
              onChange={e => setFormData({...formData, currency: e.target.value})}
            >
              <option>F XOF</option>
              <option>USD ($)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Ajouter une photo</label>
            <label className="border-2 border-dashed border-gray-200 rounded-xl py-10 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 relative h-48 overflow-hidden">
              {formData.image ? (
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              ) : (
                <>
                  <ImageIcon size={40} className="text-gray-300 mb-2" />
                  <span className="text-gray-400 text-sm">Cliquez pour parcourir vos fichiers</span>
                </>
              )}
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange} 
              />
            </label>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              className="bg-[#555] text-white px-10 py-2.5 rounded-lg hover:bg-black transition-colors font-medium shadow-lg"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelModal;
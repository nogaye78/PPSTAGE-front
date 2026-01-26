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
  const [preview, setPreview] = useState(null); // Pour affichage avant upload
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) return alert("Veuillez remplir le nom et ajouter une photo");

    setLoading(true);

    // Préparer FormData pour le backend
    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.address);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('price', formData.price);
    data.append('currency', formData.currency);
    data.append('image', formData.image);

    try {
      const res = await fetch('http://localhost:8000/api/hotels/', {
        method: 'POST',
        body: data
      });

      if (!res.ok) throw new Error('Erreur lors de l’upload');

      const hotel = await res.json(); // le backend renvoie l'objet avec image.url Cloudinary
      onAddHotel(hotel);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement de l'hôtel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-dashed flex items-center gap-4">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
          <h2 className="uppercase font-bold text-gray-700 text-sm tracking-widest">Créer un nouveau hôtel</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <input type="text" placeholder="Nom de l'hôtel" className="p-2 border rounded-lg" onChange={e => setFormData({...formData, name: e.target.value})} />
            <input type="text" placeholder="Adresse" className="p-2 border rounded-lg" onChange={e => setFormData({...formData, address: e.target.value})} />
            <input type="email" placeholder="E-mail" className="p-2 border rounded-lg" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="text" placeholder="Téléphone" className="p-2 border rounded-lg" onChange={e => setFormData({...formData, phone: e.target.value})} />
            <input type="text" placeholder="Prix par nuit" className="p-2 border rounded-lg" onChange={e => setFormData({...formData, price: e.target.value})} />
            <select className="p-2 border rounded-lg bg-white" onChange={e => setFormData({...formData, currency: e.target.value})}>
              <option>F XOF</option>
              <option>USD ($)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Ajouter une photo</label>
            <label className="border-2 border-dashed border-gray-200 rounded-xl py-10 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 relative overflow-hidden">
              {preview ? (
                <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <ImageIcon size={40} className="text-gray-300 mb-2" />
                  <span className="text-gray-400">Cliquez pour parcourir vos fichiers</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-[#555] text-white px-10 py-2.5 rounded-lg hover:bg-black transition-colors font-medium">
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelModal;

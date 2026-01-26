import React, { useState } from 'react';
import API from '../services/api'; // 👈 Assure-toi que le chemin vers ton fichier API.js est correct

const HotelModal = ({ onClose, onAddHotel }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    price: '',
    currency: 'F XOF',
    image: null
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 5 MB");
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file)); // Pour afficher la miniature
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) return setError("Le nom est requis");
    if (!formData.image) return setError("L'image est requise");

    setLoading(true);

    // Préparation des données
    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.address);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('price', formData.price);
    data.append('currency', formData.currency);
    data.append('image', formData.image);

    try {
      // ✅ On utilise l'instance Axios API.js
      // L'URL sera automatiquement : https://red-product-backend-w5ko.onrender.com/api/hotels/
      // Le Token JWT sera ajouté automatiquement par l'intercepteur de API.js
      const response = await API.post('hotels/', data);

      onAddHotel(response.data);
      onClose();
    } catch (err) {
      console.error("Erreur Backend:", err.response?.data);
      
      // Gestion des erreurs spécifiques
      if (err.response?.status === 401) {
        setError("Session expirée ou non autorisée. Veuillez vous reconnecter.");
      } else {
        setError(err.response?.data?.detail || "Une erreur est survenue lors de l'enregistrement.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Ajouter un nouvel hôtel</h2>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Nom de l'hôtel *" className="p-2 border rounded" onChange={handleInputChange} required />
            <input name="address" type="text" placeholder="Adresse" className="p-2 border rounded" onChange={handleInputChange} />
            <input name="email" type="email" placeholder="Email" className="p-2 border rounded" onChange={handleInputChange} />
            <input name="phone" type="text" placeholder="Téléphone" className="p-2 border rounded" onChange={handleInputChange} />
            <input name="price" type="number" placeholder="Prix par nuit" className="p-2 border rounded" onChange={handleInputChange} />
            <select name="currency" className="p-2 border rounded" onChange={handleInputChange} value={formData.currency}>
              <option value="F XOF">F XOF</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
            {preview ? (
              <img src={preview} alt="Preview" className="h-32 w-full object-contain mb-2" />
            ) : (
              <p className="text-gray-500 text-sm">Cliquez pour ajouter une photo</p>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2 text-sm" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100" disabled={loading}>
              Annuler
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300" disabled={loading}>
              {loading ? 'Envoi en cours...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelModal;
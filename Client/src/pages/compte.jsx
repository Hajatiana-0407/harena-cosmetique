import { LogOut, ShoppingBagIcon, ShoppingCartIcon, Camera, Edit2, Save, X } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import api from '../API/url';

const BASE_URL = api.defaults.baseURL.replace('/api/', '/');

export default function ComptePage() {
const [client, setClient] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
const [photoUrl, setPhotoUrl] = useState(null);

// États pour l'édition
const [isEditing, setIsEditing] = useState(false);
const [formData, setFormData] = useState({
nom: '',
prenom: '',
telephone: '',
adresse: ''
});
const [selectedPhoto, setSelectedPhoto] = useState(null);
const [photoPreview, setPhotoPreview] = useState(null);
const fileInputRef = useRef(null);

useEffect(() => {
try {
const raw = localStorage.getItem('client');
const parsed = raw ? JSON.parse(raw) : null;
setClient(parsed);

if (parsed) {
setFormData({
nom: parsed.nom || '',
prenom: parsed.prenom || '',
telephone: parsed.telephone || '',
adresse: parsed.adresse || ''
});
}

if (parsed?.photo) {
if (parsed.photo === 'default-avatar.jpg') {
setPhotoUrl('/public/images/pdp.jpg'); // Fallback to existing default
} else {
setPhotoUrl(`${BASE_URL}/image/avatars/${parsed.photo}`);
}
} else {
setPhotoUrl('/public/images/pdp.jpg');
}
} catch (e) {
console.error('Invalid client data in storage', e);
setError("Impossible de charger les informations du client.");
} finally {
setLoading(false);
}
}, []);

// Clean up photo preview on unmount
useEffect(() => {
return () => {
if (photoPreview) {
URL.revokeObjectURL(photoPreview);
}
};
}, [photoPreview]);

const handleLogout = () => {
try {
localStorage.removeItem('client');
localStorage.removeItem('token');
} catch (_) { }
window.dispatchEvent(new Event('authChange'));
window.location.href = '/';
};

const handlePhotoSelect = (event) => {
const file = event.target.files[0];
if (!file) return;

// Validate file type
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
if (!allowedTypes.includes(file.type)) {
setError('Format de fichier non autorisé. Utilisez JPG, PNG ou WEBP');
fileInputRef.current.value = '';
return;
}

// Validate file size (max 5MB)
if (file.size > 5 * 1024 * 1024) {
setError('Le fichier est trop volumineux (max 5MB)');
fileInputRef.current.value = '';
return;
}

setSelectedPhoto(file);

// Create preview
const previewUrl = URL.createObjectURL(file);
setPhotoPreview(previewUrl);
setError('');
};

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({
...prev,
[name]: value
}));
};

const handleUpdateProfile = async (e) => {
e.preventDefault();
setError('');
setSuccess('');

const submitFormData = new FormData();
submitFormData.append('nom', formData.nom);
submitFormData.append('prenom', formData.prenom);
submitFormData.append('telephone', formData.telephone);
submitFormData.append('adresse', formData.adresse);

if (selectedPhoto) {
submitFormData.append('photo', selectedPhoto);
}

try {
const response = await api.put(`/api/client/${client.id}/update`, submitFormData, {
headers: {
'Content-Type': 'multipart/form-data',
}
});

if (response.data.success) {
const updatedClient = { ...client, ...formData };
if (response.data.client.photo) {
updatedClient.photo = response.data.client.photo;
const newPhotoUrl = response.data.client.photoUrl || (response.data.client.photo === 'default-avatar.jpg' ? '/public/images/pdp.jpg' : `${BASE_URL}/image/avatars/${response.data.client.photo}`);
setPhotoUrl(newPhotoUrl);
}
localStorage.setItem('client', JSON.stringify(updatedClient));
setClient(updatedClient);
setSuccess('Profil mis à jour avec succès !');
setIsEditing(false);
setSelectedPhoto(null);
setPhotoPreview(null);
if (fileInputRef.current) {
fileInputRef.current.value = '';
}
} else {
setError(response.data.message || 'Erreur lors de la mise à jour');
}
} catch (err) {
console.error('Update error:', err);
setError('Une erreur est survenue lors de la mise à jour');
}
};


if (loading) {
return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
<div className="text-center">
<div className="animate-pulse text-gray-700">Chargement du compte...</div>
</div>
</div>
);
}

if (!client) {
return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
<h2 className="text-2xl font-bold text-gray-800 mb-2">Accès refusé</h2>
<p className="text-gray-600 mb-6">Vous devez être connecté pour accéder à cette page.</p>
<a href="/login" className="px-5 py-2 rounded bg-[#5C4033] text-white hover:bg-[#7B4B3A] transition-colors">Se connecter</a>
</div>
);
}

return (
<section className="min-h-screen bg-gray-50 px-4 text-gray-900">
<div className="max-w-7xl mx-auto bg-transparent p-2 sm:p-8 md:p-10">
{/* Header */}
<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
<div className="flex-1 w-full">
<div className="flex flex-col sm:flex-row bg-blue-50 shadow-md p-5 sm:justify-between gap-4">
<div className='flex gap-5 items-end'>
{/* Photo de profil */}
<div className="relative group">
<img
src={isEditing && photoPreview ? photoPreview : photoUrl}
alt="Photo de profil"
className="w-28 h-28 rounded-2xl object-cover ring-2 ring-[#5C4033]"
onError={(e) => {
e.target.src = '/public/images/pdp.jpg';
}}
/>
{isEditing && (
<label
htmlFor="photo-input"
className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
>
<Camera className="h-8 w-8 text-white" />
</label>
)}
<input
ref={fileInputRef}
id="photo-input"
type="file"
accept="image/jpeg,image/jpg,image/png,image/webp"
onChange={handlePhotoSelect}
className="hidden"
/>
</div>
<div className='text-left'>
<h1 className="text-xl md:text-2xl xl:text-black pb-2 font-bold text-[#5C4033]">
{client?.prenom} {client?.nom}
</h1>
<p className="text-gray-600 break-all text-2xl">{client?.email}</p>
</div>
</div>
<div className="flex gap-2 sm:gap-3 mb-2">
<a
href="/catalogue"
className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors"
title="Catalogue"
>
<ShoppingCartIcon className="h-6 w-6" />
</a>
<button
onClick={handleLogout}
className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
title="Se déconnecter"
>
<LogOut className="h-6 w-6" />
</button>
</div>
</div>

{error && (
<div className="mt-4 p-3 rounded bg-red-50 text-red-700 text-sm border border-red-200">
{error}
</div>
)}

{success && (
<div className="mt-4 p-3 rounded bg-green-50 text-green-700 text-sm border border-green-200">
{success}
</div>
)}


<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
{/* Informations personnelles */}
<div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
<div className="flex justify-between items-center mb-4">
<h2 className="text-lg font-semibold text-[#5C4033]">Mes informations</h2>
<button
onClick={() => setIsEditing(!isEditing)}
className="text-[#5C4033] hover:text-[#7B4B3A] transition-colors p-1 rounded hover:bg-gray-100"
title={isEditing ? "Annuler" : "Modifier"}
>
{isEditing ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
</button>
</div>

{isEditing ? (
<form onSubmit={handleUpdateProfile} className="space-y-4">
<div className="grid grid-cols-2 gap-4">
<div>
<label className="block text-xs text-gray-500 mb-1">Nom</label>
<input
type="text"
name="nom"
value={formData.nom}
onChange={handleInputChange}
className="w-full p-2 border border-gray-300 rounded focus:ring-[#5C4033] focus:border-[#5C4033]"
required
/>
</div>
<div>
<label className="block text-xs text-gray-500 mb-1">Prénom</label>
<input
type="text"
name="prenom"
value={formData.prenom}
onChange={handleInputChange}
className="w-full p-2 border border-gray-300 rounded focus:ring-[#5C4033] focus:border-[#5C4033]"
required
/>
</div>
</div>
<div>
<label className="block text-xs text-gray-500 mb-1">Téléphone</label>
<input
type="tel"
name="telephone"
value={formData.telephone}
onChange={handleInputChange}
className="w-full p-2 border border-gray-300 rounded focus:ring-[#5C4033] focus:border-[#5C4033]"
/>
</div>
<div>
<label className="block text-xs text-gray-500 mb-1">Adresse</label>
<input
type="text"
name="adresse"
value={formData.adresse}
onChange={handleInputChange}
className="w-full p-2 border border-gray-300 rounded focus:ring-[#5C4033] focus:border-[#5C4033]"
/>
</div>
{selectedPhoto && (
<div>
<label className="block text-xs text-gray-500 mb-1">Photo sélectionnée</label>
<p className="text-sm text-green-600">Nouvelle photo: {selectedPhoto.name}</p>
</div>
)}
<div className="flex justify-end pt-2">
<button
type="submit"
className="flex items-center gap-2 px-4 py-2 bg-[#5C4033] text-white rounded hover:bg-[#7B4B3A] transition-colors"
>
<Save className="h-4 w-4" /> Enregistrer
</button>
</div>
</form>
) : (
<div className="space-y-3 text-sm">
<div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
<span className="text-gray-500">Nom complet</span>
<span className="font-medium">{client?.nom} {client?.prenom}</span>
</div>
<div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
<span className="text-gray-500">Email</span>
<span className="font-medium break-all">{client?.email}</span>
</div>
<div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
<span className="text-gray-500">Téléphone</span>
<span className="font-medium">{client?.telephone || 'Non renseigné'}</span>
</div>
<div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
<span className="text-gray-500">Adresse</span>
<span className="font-medium text-right">{client?.adresse || 'Non renseignée'}</span>
</div>
<div className="flex justify-between gap-4 pt-1">
<span className="text-gray-500">Inscrit le</span>
<span className="font-medium text-right">{client?.date || '—'}</span>
</div>
</div>
)}
</div>


{/* Activité / Raccourcis */}
<div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
<h2 className="text-lg font-semibold text-[#5C4033] mb-4">Mes activités</h2>
<ul className="space-y-3 text-sm">
<li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
<span className="text-gray-600">Historique des commandes</span>
<a href="#historique" className="text-[#5C4033] hover:underline font-medium">Voir</a>
</li>
<li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
<span className="text-gray-600">Mes avis</span>
<a href="/" className="text-[#5C4033] hover:underline font-medium">Gérer</a>
</li>
<li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
<span className="text-gray-600">Mes favoris</span>
<a href="/" className="text-[#5C4033] hover:underline font-medium">Voir</a>
</li>
<li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
<span className="text-gray-600">Messages</span>
<a href="/messenger" className="text-[#5C4033] hover:underline font-medium flex items-center gap-1">
Accéder <span className="text-xs">→</span>
</a>
</li>
</ul>
</div>
</div>

{/* Historique des commandes */}
<div id="historique" className="mt-8 rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
<h2 className="text-lg font-semibold text-[#5C4033] mb-4">Historique des commandes</h2>
<div className="text-center py-8 text-gray-500">
Aucune commande récente.
</div>
</div>

</div>
</div>
</div>
</section>
);
}

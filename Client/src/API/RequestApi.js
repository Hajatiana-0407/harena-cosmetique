import api from './url';

const RequestApi = () => {
  const fetchProduits = async () => {
    const response = await api.get('api/produits');
    return response.data;
  };

  const fetchProduitsInv = async () => {
    // Fetch products, potentially filtered or sorted for "New" items
    // For now, we fetch all and let the component handle it or return a subset
    const response = await api.get('api/produits');
    // Return the last 3 items as "new" for example, or just the list
    // If the API doesn't support sorting, we can do it here if needed.
    // Assuming the backend returns them in some order.
    return response.data; 
  };

  const fetchCategories = async () => {
    const response = await api.get('api/categories');
    return response.data;
  };

  const fetchTemoignages = async () => {
    const response = await api.get('api/temoignages');
    return response.data;
  };

  const validatePromoCode = async (code) => {
    try {
      const response = await api.post('api/promo/validate', { code });
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erreur lors de la validation du code promo' };
    }
  };

  return {
    fetchProduits,
    fetchProduitsInv,
    fetchCategories,
    fetchTemoignages,
    validatePromoCode
  };
};

export default RequestApi;

import api from './url';

const RequestApi = () => {
  const fetchProduits = async () => {
    const response = await api.get('/produits');
    return response.data;
  };

  const fetchProduitsInv = async () => {
    // Fetch products, potentially filtered or sorted for "New" items
    // For now, we fetch all and let the component handle it or return a subset
    const response = await api.get('/produits');
    // Return the last 3 items as "new" for example, or just the list
    // If the API doesn't support sorting, we can do it here if needed.
    // Assuming the backend returns them in some order.
    return response.data; 
  };

  const fetchCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
  };

  return {
    fetchProduits,
    fetchProduitsInv,
    fetchCategories
  };
};

export default RequestApi;

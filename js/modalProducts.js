document.addEventListener('DOMContentLoaded', () => {
    import('./utils/modal.js').then(module => {
      const  { openModal } = module;
      openModal();
    })
  
    import('./utils/fetchProducts.js').then(module => {
      const { fetchProductsModal } = module;
      // Llamar a la función para obtener los productos
      fetchProductsModal();
    });
  });  
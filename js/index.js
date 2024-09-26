document.addEventListener('DOMContentLoaded', () => {
    // Imports de funciones/utilidades
    import('./utils/fetchProducts.js').then(module => {
      const { fetchProducts } = module;
      // Llamar a la función para obtener los productos
      fetchProducts();
    });

    import('./utils/modal.js').then(module => {
      const  { modalFunction } = module;
      modalFunction();
    });

    import('./utils/modal.js').then(module => {
      const  { openModal } = module;
      document.addEventListener('DOMContentLoaded', openModal);
    })

    // Imports de componentes
    import('../components/headerComponent.js');
    import('../components/cardComponent.js');

    const headerComponent = document.querySelector('header-component');
    const fechaActual = document.getElementById('today');
  
  
    // Manejo de navegación desde el header
    if (headerComponent) {
      headerComponent.addEventListener('navigate', (event) => {
        if (event.detail === 'login' || event.detail === 'register') {
          // Redirigir a register.html si se detecta la intención de login o registro
          window.location.assign('/pages/register.html');
        }
      });
    }
  
    // Mostrar la fecha actual
    if (fechaActual) {
      const today = new Date();
      const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
      fechaActual.textContent = today.toLocaleDateString('es-ES', opciones);
    }
});
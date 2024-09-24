document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('products-container');
    const productoDelDiaContainer = document.getElementById('daily-product-container');
    const headerComponent = document.querySelector('header-component');
    const fechaActual = document.getElementById('today');
  
    // Función para obtener productos desde la API
    async function fetchProducts() {
      try {
        // URL corregida de la API
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
  
        const data = await response.json();
        const products = data.meals;  // Ajustar dependiendo de la estructura de los datos
  
        if (products && products.length > 0) {
          // Seleccionar un Producto del Día aleatorio
          const productoDelDia = products[Math.floor(Math.random() * products.length)];
          renderProductoDelDia(productoDelDia);
  
          // Renderizar el resto de productos
          renderProducts(products);
        } else {
          productGrid.innerHTML = '<p>No se encontraron productos.</p>';
        }
      } catch (error) {
        console.error('Error:', error);
        productGrid.innerHTML = '<p>No se pudieron cargar los productos.</p>';
      }
    }
  
    // Función para renderizar el Producto del Día
    function renderProductoDelDia(product) {
      productoDelDiaContainer.innerHTML = ''; // Limpiar el contenedor
  
      const productCard = document.createElement('product-card');
      productCard.setAttribute('stock', 'Stock: ' + Math.floor(Math.random() * 60));
      productCard.setAttribute('image', product.strMealThumb);
      productCard.setAttribute('title', product.strMeal);
      productCard.setAttribute('description', product.strInstructions.substring(0, 100) + '...');
      productCard.setAttribute('show-add-button', 'true');
      productCard.setAttribute('show-del-button', 'false');
  
      productoDelDiaContainer.appendChild(productCard);
    }
  
    // Función para renderizar los productos en el grid
    function renderProducts(products) {
      productGrid.innerHTML = ''; // Limpiar el grid antes de renderizar
  
      products.forEach(product => {
        const productCard = document.createElement('product-card');
        productCard.setAttribute('stock', 'Stock: ' + Math.floor(Math.random() * 60));
        productCard.setAttribute('image', product.strMealThumb);
        productCard.setAttribute('title', product.strMeal);
        productCard.setAttribute('description', product.strInstructions.substring(0, 100) + '...');
        productCard.setAttribute('show-add-button', 'true');
  
        productGrid.appendChild(productCard);
      });
    }
  
    // Llamar a la función para obtener los productos
    fetchProducts();
  
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
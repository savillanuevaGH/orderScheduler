document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const modalProductsContainer = document.getElementById('modal-products-container');
    const spanClose = document.querySelector('.modal .close');
    const openModalBtn = document.getElementById('openModalBtn');
    openModalBtn.addEventListener('click', openModal);
  
    // Función para abrir el modal
    function openModal() {
      modal.style.display = 'block';
    }
  
    // Función para cerrar el modal
    function closeModal() {
      modal.style.display = 'none';
    }
  
    // Cerrar el modal al hacer clic en el botón de cerrar
    spanClose.addEventListener('click', closeModal);
  
    // Función para obtener productos desde la API y mostrarlos en el modal
    async function fetchProducts() {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
  
        const data = await response.json();
        const products = data.meals;
  
        if (products && products.length > 0) {
          renderProducts(products);
        } else {
          modalProductsContainer.innerHTML = '<p>No se encontraron productos.</p>';
        }
      } catch (error) {
        console.error('Error:', error);
        modalProductsContainer.innerHTML = '<p>No se pudieron cargar los productos.</p>';
      }
    }
  
    // Función para renderizar los productos dentro del modal
    function renderProducts(products) {
      modalProductsContainer.innerHTML = ''; // Limpiar antes de renderizar
  
      products.forEach(product => {
        const productCard = document.createElement('product-card');
        productCard.setAttribute('image', product.strMealThumb);
        productCard.setAttribute('title', product.strMeal);
        productCard.setAttribute('description', product.strInstructions.substring(0, 100) + '...');
        productCard.setAttribute('show-add-button', 'true');
  
        modalProductsContainer.appendChild(productCard);
      });
    }
  
    // Llamar a la función para obtener productos
    fetchProducts();
  });  
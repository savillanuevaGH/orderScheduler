// fetchProducts.js
export async function fetchProducts() {
    const productGrid = document.getElementById('products-container');
    const productoDelDiaContainer = document.getElementById('daily-product-container');

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
  
      // Función para renderizar el Producto del Día
    function renderProductoDelDia(product) {
      productoDelDiaContainer.innerHTML = ''; // Limpiar el contenedor
    
      const productCard = document.createElement('product-card');
      productCard.setAttribute('stock', Math.floor(Math.random() * 60));
      productCard.setAttribute('image', product.strMealThumb);
      productCard.setAttribute('title', product.strMeal);
      productCard.setAttribute('type', product.strCategory);
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
        productCard.setAttribute('stock', Math.floor(Math.random() * 60));
        productCard.setAttribute('image', product.strMealThumb);
        productCard.setAttribute('title', product.strMeal);
        productCard.setAttribute('type', product.strCategory);
        productCard.setAttribute('description', product.strInstructions.substring(0, 100) + '...');
        productCard.setAttribute('show-add-button', 'true');
        productCard.setAttribute('show-del-button', 'false');
    
        productGrid.appendChild(productCard);
      });
    }
};

export async function fetchProductsModal() {
    const modal = document.getElementById('productModal');
    const modalProductsContainer = document.getElementById('modal-products-container');

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
  
    // Función para renderizar los productos dentro del modal
    function renderProducts(products) {
      modalProductsContainer.innerHTML = ''; // Limpiar antes de renderizar
  
      products.forEach(product => {
        const productCard = document.createElement('product-card');
        productCard.setAttribute('stock', Math.floor(Math.random() * 60));
        productCard.setAttribute('image', product.strMealThumb);
        productCard.setAttribute('title', product.strMeal);
        productCard.setAttribute('type', product.strCategory);
        productCard.setAttribute('description', product.strInstructions.substring(0, 100) + '...');
        productCard.setAttribute('show-add-button', 'true');
        productCard.setAttribute('show-del-button', 'false');
  
        modalProductsContainer.appendChild(productCard);
      });
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const modalContainer = document.getElementById('modal-container');
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
          modalContainer.innerHTML = '<p>No se encontraron productos.</p>';
        }
      } catch (error) {
        console.error('Error:', error);
        modalContainer.innerHTML = '<p>No se pudieron cargar los productos.</p>';
      }
    }
  
    // Función para renderizar los productos dentro del modal
    function renderProducts(products) {
      modalContainer.innerHTML = ''; // Limpiar antes de renderizar
  
      products.forEach(product => {
        const productContainer = document.createElement('div');
        const productStock = Math.floor(Math.random() * 60);
        const productTitle = product.strMeal;
        const productDescription = product.strInstructions.substring(0, 30) + '...';
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const buttons = document.createElement('div');

        editBtn.innerText = 'Editar';
        deleteBtn.innerHTML= 'Eliminar';

        buttons.innerHTML = `
        <button class="btn" id="edit-btn-${product.idMeal}" style="background-color: darkgrey">EDITAR</button>
        <button class="btn" id="delete-btn-${product.idMeal}" style="background-color: tomato">ELIMINAR</button>
        `;

        productContainer.innerHTML = `
        <h5>Stock:<br/><p style="color: firebrick";>${productStock}</p></h5>
        <h5>Producto:<br/><p style="color: skyblue";>${productTitle}</p></h5>
        <h5>Descripción:<br/><p style="color: gray";>${productDescription}</p></h5>
        `;

        productContainer.appendChild(buttons);

        productContainer.classList.add('product-list');

  
        modalContainer.appendChild(productContainer);
      });
    }
  
    // Llamar a la función para obtener productos
    fetchProducts();
});
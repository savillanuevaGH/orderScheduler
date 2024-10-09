export function modalFunction() {
  const modal = document.getElementById('week-day-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const addFavoriteBtn = document.querySelector('#add-favorite-button');
  const addProductBtn = document.getElementById('add-product-button');
  let currentProductCard = null;

  // Escuchar el evento personalizado "open-modal"
  document.addEventListener('open-modal', (event) => {
    currentProductCard = event.detail.card; // Guardar la referencia al product-card
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    addFavoriteBtn.classList.remove('favorite-added');
  });

  // Agregar a favoritos, cambia el color del botón
  addFavoriteBtn.addEventListener('click', () => {
    addFavoriteBtn.classList.toggle('favorite-added');
    if (addFavoriteBtn.classList.contains('favorite-added')) {
      alert(`Producto "${currentProductCard.getAttribute('title')}" agregado a Favoritos`);
    }
  });

  // Mapeo de dias de la semana a enteros
  const dayIndexMapping = {
    'Lunes': 1,
    'Martes': 2,
    'Miércoles': 3,
    'Jueves': 4,
    'Viernes': 5
  };

  // Al seleccionar el día, utiliza el mapeo
  addProductBtn.addEventListener('click', () => {
    const selectedWeek = document.querySelector('#week-select').value;
    const selectedDayText = document.querySelector('#day-select').value;
    const observationText = document.querySelector('#observation').value;

    const selectedDay = dayIndexMapping[selectedDayText];

    // Actualizar el product-card seleccionado
    if (currentProductCard) {
      currentProductCard.setWeekDay(selectedWeek, selectedDay, selectedDayText);
      
      // Guardar el producto actualizado en localStorage
      const productData = {
        title: currentProductCard.getAttribute('title'),
        image: currentProductCard.getAttribute('image'),
        description: currentProductCard.getAttribute('description'),
        type: currentProductCard.getAttribute('type'),
        week: parseInt(selectedWeek, 10),
        day: selectedDay,
        observation: observationText,
        isFavorite: addFavoriteBtn.classList.contains('favorite-added')
      };

      let storedProducts = JSON.parse(localStorage.getItem('storedProducts')) || [];
      storedProducts.push(productData);
      localStorage.setItem('storedProducts', JSON.stringify(storedProducts));
    }

    modal.style.display = 'none';
    alert(`Producto "${currentProductCard.getAttribute('title')}" agregado a la Semana ${selectedWeek}, Día ${selectedDay}`);
  });
};

export function openModal() {
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
        productCard.setAttribute('stock', 'Stock: ' + Math.floor(Math.random() * 60));
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

export async function historyModal() {
    const historyModal = document.getElementById('historyModal');
    const historyContainer = document.getElementById('history-container');

    
  if (window.location.pathname === '/pages/pedidos.html' ||  window.location.pathname === '/pages/profile.html') {
    // Agregar evento al botón para abrir el modal del historial de pedidos
    document.getElementById('openHistoryModalBtn').addEventListener('click', openHistoryModal);

    // Agregar evento al botón para cerrar el modal del historial de pedidos
    document.getElementById('close-history').addEventListener('click', closeHistoryModal);
  };

     // Función para abrir el modal del historial de pedidos
    function openHistoryModal() {
    historyModal.style.display = 'block';
    loadHistory();
  }

    // Función para cerrar el modal del historial de pedidos
    function closeHistoryModal() {
    historyModal.style.display = 'none';
  }

    // Agregar evento al botón para abrir el modal del historial de pedidos
    document.getElementById('openHistoryModalBtn').addEventListener('click', openHistoryModal);

    // Agregar evento al botón para cerrar el modal del historial de pedidos
    document.getElementById('close-history').addEventListener('click', closeHistoryModal);

    // Función para cargar el historial de productos
    function loadHistory() {
    const productHistoryList = JSON.parse(localStorage.getItem('productHistory')) || [];

    historyContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar

    if (productHistoryList.length === 0) {
      historyContainer.innerHTML = '<h6>No hay productos en el historial...</h6>';
      return;
    }

    productHistoryList.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('history-item');
      productCard.innerHTML = `
        <h5>${product.title}</h5>
        <p>${product.description}</p>
        <p>Semana: ${product.week}, Día: ${product.day}</p>
        <p>Fecha de eliminación: ${product.removalDate}</p>
        <p>${product.isFavorite ? 'Agregado a favoritos' : 'No agregado a favoritos'}</p>
        <p>${product.type}</p>
      `;
      historyContainer.appendChild(productCard);
    });
  }
};
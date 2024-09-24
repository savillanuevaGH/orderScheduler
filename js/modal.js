document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('week-day-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const addFavoriteBtn = document.querySelector('#add-favorite-button');
  const addProductBtn = document.getElementById('add-product-button');
  const historyModal = document.getElementById('historyModal');
  const historyContainer = document.getElementById('history-container');
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

  // Función para abrir el modal del historial de pedidos
  function openHistoryModal() {
    historyModal.style.display = 'block';
    loadHistory();
  }

  // Función para cerrar el modal del historial de pedidos
  function closeHistoryModal() {
    historyModal.style.display = 'none';
  }

  if (window.location.pathname === '/pages/pedidos.html' ||  window.location.pathname === '/pages/profile.html') {
    // Agregar evento al botón para abrir el modal del historial de pedidos
    document.getElementById('openHistoryModalBtn').addEventListener('click', openHistoryModal);

    // Agregar evento al botón para cerrar el modal del historial de pedidos
    document.getElementById('close-history').addEventListener('click', closeHistoryModal);
  };

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

  // Función para cargar el historial de productos
  function loadHistory() {
    const productHistoryList = JSON.parse(localStorage.getItem('productHistory')) || [];

    historyContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar

    if (productHistoryList.length === 0) {
      historyContainer.innerHTML = '<h5>No hay productos en el historial...</h5>';
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
      `;
      historyContainer.appendChild(productCard);
    });
  }
});
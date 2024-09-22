document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('week-day-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const addProductBtn = document.getElementById('add-product-button');
  let currentProductCard = null;

  // Escuchar el evento personalizado "open-modal"
  document.addEventListener('open-modal', (event) => {
    currentProductCard = event.detail.card; // Guardar la referencia al product-card
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

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

    const selectedDay = dayIndexMapping[selectedDayText];

    // Actualizar el product-card seleccionado
    if (currentProductCard) {
      currentProductCard.setWeekDay(selectedWeek, selectedDay);
      
      // Guardar el producto actualizado en localStorage
      const productData = {
        title: currentProductCard.getAttribute('title'),
        image: currentProductCard.getAttribute('image'),
        description: currentProductCard.getAttribute('description'),
        week: parseInt(selectedWeek, 10),
        day: selectedDay
      };

      let storedProducts = JSON.parse(localStorage.getItem('storedProducts')) || [];
      storedProducts.push(productData);
      localStorage.setItem('storedProducts', JSON.stringify(storedProducts));
    }

    modal.style.display = 'none';
    alert(`Producto "${currentProductCard.getAttribute('title')}" agregado a la Semana ${selectedWeek}, Día ${selectedDay}`);
  });
});
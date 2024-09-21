document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('week-day-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const addProductBtn = document.getElementById('add-product-button');
  const weekSelect = document.getElementById('week-select');
  const daySelect = document.getElementById('day-select');
  let currentCardTitle = '';

  // Escuchar el evento personalizado "open-modal" para mostrar el modal
  document.addEventListener('open-modal', (event) => {
    currentCardTitle = event.detail.cardTitle;
    modal.style.display = 'flex'; // Mostrar el modal cuando se dispare el evento
  });

  // Cerrar el modal
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // Ocultar el modal al hacer clic en "Cerrar"
  });

  addProductBtn.addEventListener('click', () => {
    const selectedWeek = document.querySelector('#week-select').value;
    const selectedDay = document.querySelector('#day-select').value;
    
    // Encontrar el product-card correspondiente
    const productCard = document.querySelector('product-card'); // Ajusta el selector si tienes varios cards
    
    // Actualizar el día y la semana en el componente
    if (productCard) {
      productCard.setWeekDay(selectedWeek, selectedDay);
    }

    modal.style.display = 'none';
  
    // Mostrar mensaje de éxito
    alert(`Producto "${currentCardTitle}" agregado a la Semana ${selectedWeek}, Día ${selectedDay}`);
  });  
});


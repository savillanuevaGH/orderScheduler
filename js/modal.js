document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('week-day-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const addProductBtn = document.getElementById('add-product-button');
  let currentCard = null; 
  let currentCardTitle = '';

  // Escuchar el evento personalizado "open-modal" para mostrar el modal
  document.addEventListener('open-modal', (event) => {
    currentCardTitle = event.detail.cardTitle; //Guarda el titulo de la card
    currentCard = event.detail.card; // Guardar la referencia a la card
    modal.style.display = 'flex'; // Mostrar el modal cuando se dispare el evento
  });

  // Cerrar el modal
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // Ocultar el modal al hacer clic en "Cerrar"
  });

  addProductBtn.addEventListener('click', () => {
    const selectedWeek = document.querySelector('#week-select').value;
    const selectedDay = document.querySelector('#day-select').value;

    // Actualizar el día y la semana en la tarjeta seleccionada
    if (currentCard) {
      currentCard.setWeekDay(selectedWeek, selectedDay);
    }

    modal.style.display = 'none';
  
    // Mostrar mensaje de éxito
    alert(`Producto ${currentCardTitle} a la Semana ${selectedWeek}, Día ${selectedDay}`);
  });  
});
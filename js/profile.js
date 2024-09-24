document.addEventListener('DOMContentLoaded', () => {
    const historyModal = document.getElementById('historyModal');
    const historyContainer = document.getElementById('history-container');
    // Selecionar los elementos HTML
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const inputs = document.querySelectorAll('input[type="text"]');

    // Función para habilitar la edición de los inputs
    function enableEditing() {
    inputs.forEach((input) => {
        input.readOnly = false;
    });
    saveBtn.style.display = 'block'; // Mostrar el botón de guardar cambios
    }

    // Función para guardar los cambios
    function saveChanges() {
    // Recopilar los valores de los inputs
    const userData = {};
    inputs.forEach((input) => {
        userData[input.id] = input.value;
    });

    // Enviar los datos al servidor o realizar la lógica de negocio aquí
    console.log(userData);

    // Deshabilitar la edición de los inputs
    inputs.forEach((input) => {
        input.readOnly = true;
    });
    saveBtn.style.display = 'none'; // Ocultar el botón de guardar cambios
    }

    // Agregar eventos a los botones
    editBtn.addEventListener('click', enableEditing);
    saveBtn.addEventListener('click', saveChanges);

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
      `;
      historyContainer.appendChild(productCard);
    });
  }
})
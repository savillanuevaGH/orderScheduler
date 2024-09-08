document.addEventListener('DOMContentLoaded', () => {
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const weekProductsContainer = document.getElementById('week-products');
  
    daysOfWeek.forEach(day => {
      // Crear el contenedor de la sección
      const section = document.createElement('section');
      section.className = 'day-section';
  
      // Crear el encabezado del día
      const header = document.createElement('h5');
      header.textContent = day;
      section.appendChild(header);
  
      // Crear el contenedor de productos
      const productsContainer = document.createElement('div');
      productsContainer.className = 'products-container';
      section.appendChild(productsContainer);
  
      // Agregar un producto de ejemplo
      const productCard = document.createElement('product-card');
      productsContainer.appendChild(productCard);
  
      // Crear los botones de acción
      const actionButtons = document.createElement('div');
      actionButtons.className = 'action-buttons';
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.id = 'dlt-btn'
      deleteButton.addEventListener('click', () => {
        alert(`Eliminar producto del ${day}`);
      });
      actionButtons.appendChild(deleteButton);
  
      const statusButton = document.createElement('button');
      statusButton.textContent = 'Ver estado';
      statusButton.id = 'sts-btn'
      statusButton.addEventListener('click', () => {
        alert(`Ver estado del producto del ${day}`);
      });
      actionButtons.appendChild(statusButton);
  
      section.appendChild(actionButtons);
  
      // Agregar la sección al contenedor de la semana
      weekProductsContainer.appendChild(section);
    });
  });
  
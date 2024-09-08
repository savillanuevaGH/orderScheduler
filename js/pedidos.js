document.addEventListener('DOMContentLoaded', () => {
  const weekProductsContainer = document.getElementById('week-products');
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  days.forEach(day => {
    const section = document.createElement('section');
    section.innerHTML = `
      <h5>${day}</h5>
      <div class="products-container">
        <product-card
          image="https://via.placeholder.com/300"
          title="Producto Dia ${day}"
          description="Descripción del producto para el dia ${day}"
        ></product-card>
        <button class="remove-button">Eliminar producto</button>
        <button class="status-button">Ver estado</button>
      </div>
    `;
    weekProductsContainer.appendChild(section);
  });
});
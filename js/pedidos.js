document.addEventListener('DOMContentLoaded', () => {
  const weekProductsContainer = document.getElementById('week-products');
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  for(let aux = 1; aux <= 4; aux++) {
    const title = document.createElement('h4');
    title.textContent = 'Semana ' + aux;
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.classList.add('editBtn');

    const heading = document.createElement('div');
    heading.classList.add('heading');
    heading.appendChild(title);
    heading.appendChild(editBtn);

    const weekContainer = document.createElement('div');
    weekContainer.classList.add('week-products');
    weekProductsContainer.appendChild(heading);

    days.forEach(day => {
      const section = document.createElement('section');
      section.classList.add('day-section');
      
      const dayName = document.createElement('h5');
      dayName.textContent = day;
  
      const productsContainer = document.createElement('div');
      productsContainer.classList.add('products-container');
  
      const productCard = document.createElement('product-card');
      productCard.setAttribute('image', 'https://via.placeholder.com/300');
      productCard.setAttribute('title', 'Producto del día ' + day);
      productCard.setAttribute('description', 'Descripción del producto del día ' + day);
  
      // Añadir elementos al contenedor de productos
      productsContainer.appendChild(productCard);
  
      // Añadir encabezado y contenedor de productos a la sección
      section.appendChild(dayName);
      section.appendChild(productsContainer);
  
      // Añadir la sección al contenedor de la semana
      weekContainer.appendChild(section);
    });
  
    // Añadir el contenedor de la semana al contenedor principal
    weekProductsContainer.appendChild(weekContainer);
  }
});
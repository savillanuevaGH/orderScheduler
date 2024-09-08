document.addEventListener('DOMContentLoaded', () => {
  const weekProductsContainer = document.getElementById('week-products');
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  days.forEach(day => {
    const section = document.createElement('section');
    section.classList.add('day-section');
    
    const heading = document.createElement('h5');
    heading.textContent = day;

    const productsContainer = document.createElement('div');
    productsContainer.classList.add('products-container');

    const productCard = document.createElement('product-card');
    productCard.setAttribute('image', 'https://via.placeholder.com/300');
    productCard.setAttribute('title', 'Producto del día ' + day);
    productCard.setAttribute('description', 'Descripción del producto del día ' + day);

    const dltBtn = document.createElement('button');
    dltBtn.classList.add('remove-button');
    dltBtn.innerText = 'Eliminar Producto';

    const stsBtn = document.createElement('button');
    stsBtn.classList.add('status-button');
    stsBtn.innerText = 'Ver Estado';

    // Añadir elementos al contenedor de productos
    productsContainer.appendChild(productCard);
    productsContainer.appendChild(dltBtn);
    productsContainer.appendChild(stsBtn);

    // Añadir encabezado y contenedor de productos a la sección
    section.appendChild(heading);
    section.appendChild(productsContainer);

    // Añadir sección al contenedor principal
    weekProductsContainer.appendChild(section);
  });
});

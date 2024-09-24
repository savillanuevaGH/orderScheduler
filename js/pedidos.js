document.addEventListener('DOMContentLoaded', () => {
  const weekProductsContainer = document.getElementById('week-products');
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  // Mapeo de días a índices
  const dayIndexMapping = {
    'Lunes': 1,
    'Martes': 2,
    'Miércoles': 3,
    'Jueves': 4,
    'Viernes': 5
  };

  // Recuperar los productos del localStorage
  let storedProducts = JSON.parse(localStorage.getItem('storedProducts')) || [];
  console.log('Productos almacenados:', storedProducts);

  if (storedProducts.length === 0) {
    weekProductsContainer.innerHTML = '<p>No hay productos agregados.</p>';
    return; // Salir si no hay productos
  }

  for (let aux = 1; aux <= 4; aux++) {
    const title = document.createElement('h4');
    title.textContent = 'Semana ' + aux;

    const weekContainer = document.createElement('div');
    weekContainer.classList.add('week-products');
    weekContainer.setAttribute('data-week', aux);

    const heading = document.createElement('div');
    heading.classList.add('heading');
    heading.appendChild(title);

    let hasProducts = false; // Variable para verificar si hay productos en la semana

    // Crear secciones para los días de la semana
    days.forEach((day) => {
      const dayIndex = dayIndexMapping[day];
      const section = document.createElement('section');
      section.classList.add('day-section');
      section.setAttribute('data-day', dayIndex);

      const dayName = document.createElement('h5');
      dayName.textContent = day;

      const productsContainer = document.createElement('div');
      productsContainer.classList.add('products-container');

      // Filtrar los productos para el día y la semana actual
      const productsForDay = storedProducts.filter(product => 
        product.week === aux && product.day === dayIndex
      );
      console.log(`Productos para Semana ${aux}, Día ${day}:`, productsForDay);

      if (productsForDay.length > 0) {
        hasProducts = true;
        productsForDay.forEach(product => {
          // Crea una productCard y asigna los datos recuperados de localStorage
          const productCard = document.createElement('product-card');
          productCard.setAttribute('stock', 'Stock: ' + Math.floor(Math.random() * 60));
          productCard.setAttribute('title', product.title);
          productCard.setAttribute('image', product.image);
          productCard.setAttribute('description', product.description);
          productCard.setAttribute('show-add-button', 'false');
          productCard.setAttribute('show-del-button', 'true');

          // Manejo del botón de eliminar
          productCard.shadowRoot.querySelector('.del-button').addEventListener('click', () => {
            // Confirmar la eliminación
            if (confirm(`¿Eliminar el producto ${product.title}?`)) {
              // Eliminar del localStorage
              storedProducts = storedProducts.filter(p => p.title !== product.title);
              localStorage.setItem('storedProducts', JSON.stringify(storedProducts));
              
              // Remover del DOM
              productCard.remove();
              
              // Si ya no quedan productos en esta sección, eliminarla
              if (productsContainer.children.length === 0) {
                section.remove();
              }
              
              // Si ya no quedan productos en la semana, eliminar el contenedor de la semana
              if (!weekContainer.querySelector('.day-section')) {
                weekContainer.remove();
              }
            }
          });

          productsContainer.appendChild(productCard);
        });
      }

      // Añadir encabezado y contenedor de productos a la sección
      section.appendChild(dayName);
      section.appendChild(productsContainer);

      // Solo añadir la sección si hay productos
      if (productsForDay.length > 0) {
        weekContainer.appendChild(section);
      }
    });

    // Solo añadir el contenedor de la semana si tiene secciones con productos
    if (hasProducts) {
      weekProductsContainer.appendChild(heading);
      weekProductsContainer.appendChild(weekContainer);
    }
  }

  // Si no hay productos, mostrar un mensaje
  if (storedProducts.length === 0) {
    weekProductsContainer.innerHTML = '<p>No hay productos agregados...</p>';
  }
});
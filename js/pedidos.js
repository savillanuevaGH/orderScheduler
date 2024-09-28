document.addEventListener('DOMContentLoaded', () => {
  const weekProductsContainer = document.getElementById('week-products');
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  import('./utils/modal.js').then(module => {
    const  { modalFunction } = module;
    modalFunction();
  });

  import('./utils/modal.js').then(module => {
    const  { historyModal } = module;
    historyModal();
  });

  import('../components/headerComponent.js');
  import('../components/cardComponent.js');

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
          const productCard = document.createElement('product-card');
          productCard.setAttribute('stock', Math.floor(Math.random() * 60));
          productCard.setAttribute('title', product.title);
          productCard.setAttribute('image', product.image);
          productCard.setAttribute('description', product.description);
          productCard.setAttribute('show-add-button', 'false');
          productCard.setAttribute('show-del-button', 'true');

          productsContainer.appendChild(productCard);

          if (productCard.shadowRoot) {
            productCard.shadowRoot.querySelector('.del-button').addEventListener('click', () => {
              console.log('Evento del-button ejecutado');
              // Confirmar la eliminación
              if (confirm(`¿Eliminar el producto ${product.title}?`)) {
                // Eliminar del localStorage
                storedProducts = storedProducts.filter(p => p.title !== product.title);
                console.log('Productos después de eliminar:', storedProducts);
                localStorage.setItem('storedProducts', JSON.stringify(storedProducts));
                
                // Remover del DOM
                productCard.remove();
                console.log('Productos después de eliminar:', productsContainer.children);
                
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
          }
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
class ProductCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

   // Une el componente con los estilos externos
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/styles/card-component.css');

    // Crear la estructura del componente
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="card">
        <div class="stock">
          <p>Stock: </p>
        </div>
        <img src="https://via.placeholder.com/300" alt="Product Image">
        <div class="card-content">
          <h4 class="card-title">Titulo</h4>
          <p class="card-description">Descripción</p>
          <button class="add-button" id="add-button">+</button>
          <button class="del-button">&times;</button>
        </div>
        <div class="week-day-info" style="display:none;"></div>
        <button class="view-product-btn" style="display:none;">Ver Producto</button>
      </div>
    `;

    shadow.appendChild(linkElem);
    shadow.appendChild(container);
  }

  // Función para eliminar el producto del localStorage
  removeProductFromStorage() {
    const title = this.getAttribute('title');
    const week = this.getAttribute('week');
    const day = this.getAttribute('day');

    // Obtener los productos almacenados en el localStorage
    let storedProducts = JSON.parse(localStorage.getItem('storedProducts')) || [];

    // Filtrar el producto a eliminar
    const productToRemove = storedProducts.find(product => 
      product.title === title && product.week == week && product.day == day
    );

    // Filtrar el producto a eliminar
    storedProducts = storedProducts.filter(product => 
      !(product.title === title && product.week == week && product.day == day)
    );

    // Guardar el producto eliminado en el historial
    if (productToRemove) {
      const removalDate = new Date().toLocaleDateString('es-ES');
      const productHistory = {
        ...productToRemove,
        removalDate: removalDate
      };

      let productHistoryList = JSON.parse(localStorage.getItem('productHistory')) || [];
      productHistoryList.push(productHistory);
      localStorage.setItem('productHistory', JSON.stringify(productHistoryList));
    }

    // Guardar los productos actualizados en localStorage
    localStorage.setItem('storedProducts', JSON.stringify(storedProducts));
  }

  // Función para actualizar la interfaz
  removeCardFromDOM() {
    this.remove(); // Eliminar el elemento del DOM
  }

  setWeekDay(week, day, text) {
    const weekDayInfo = this.shadowRoot.querySelector('.week-day-info');
    const viewProductBtn = this.shadowRoot.querySelector('.view-product-btn');
    const addButton = this.shadowRoot.querySelector('.add-button');
    const delButton = this.shadowRoot.querySelector('.del-button');
    
    // Mostrar la información de la semana y el día
    weekDayInfo.style.display = 'block';
    weekDayInfo.textContent = `Agregado a: Semana ${week}, Día ${text}`;
    
    // Mostrar el botón "Ver Producto" y ocultar el botón "Agregar"
    viewProductBtn.style.display = 'block';
    addButton.style.display = 'none';  // Ocultar el botón "Agregar"
    delButton.style.display = 'none';
    
    viewProductBtn.textContent = 'Ver Producto en Pedidos';
    viewProductBtn.addEventListener('click', () => {
      window.location.href = '/pages/pedidos.html';
    });

    this.setAttribute('week', week);
    this.setAttribute('day', day);
  }

  // Inicializa y configura el cardComponent cuando se conecte al DOM
  connectedCallback() {
    const stockElement = this.shadowRoot.querySelector('.stock');
    const imgElement = this.shadowRoot.querySelector('img');
    const titleElement = this.shadowRoot.querySelector('.card-title');
    const descriptionElement = this.shadowRoot.querySelector('.card-description');
    const addButton = this.shadowRoot.querySelector('.add-button');
    const delButton = this.shadowRoot.querySelector('.del-button');
    const weekDayInfo = this.shadowRoot.querySelector('.week-day-info');
    const viewProductBtn = this.shadowRoot.querySelector('.view-product-btn');

    stockElement.textContent = this.getAttribute('stock' || 'Stock: XX');
    imgElement.src = this.getAttribute('image') || 'https://via.placeholder.com/300';
    titleElement.textContent = this.getAttribute('title') || 'Titulo';
    descriptionElement.textContent = this.getAttribute('description') || 'Descripción';

    const week = this.getAttribute('week');
    const day = this.getAttribute('day');
    if (week && day) {
      weekDayInfo.style.display = 'block';
      weekDayInfo.textContent = `Agregado a: Semana ${week}, Día ${day}`;
      viewProductBtn.style.display = 'block';
      addButton.style.display = 'none';  // Ocultar el botón "Agregar" si ya tiene semana y día
    }

    const showAddButton = this.getAttribute('show-add-button') === 'true';
    addButton.style.display = showAddButton ? 'block' : 'none';

    const showDelButton = this.getAttribute('show-del-button') === 'true';
    delButton.style.display = showDelButton ? 'block' : 'none';

    if (showAddButton) {
      // Funcionalidad del botón agregar
      addButton.addEventListener('click', () => {
        const addProductEvent = new CustomEvent('open-modal', {
          // Envia el cardProduct/Producto seleccionado
          detail: { card: this }
        });
        document.dispatchEvent(addProductEvent);
      });
    }

    // Funcionalidad del botón de eliminar
    if (showDelButton) {
      delButton.addEventListener('click', () => {
        this.removeProductFromStorage(); // Eliminar el producto de localStorage
        this.removeCardFromDOM(); // Eliminar la tarjeta del DOM
      });

      delButton.addEventListener('click', () => {
        // Preguntar si se quiere eliminar el producto
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
          // Eliminar el producto del localStorage
          const storedProducts = JSON.parse(localStorage.getItem('storedProducts'));
          const index = storedProducts.findIndex(p => p.title === this.getAttribute('title'));
          if (index !== -1) {
            storedProducts.splice(index, 1);
            localStorage.setItem('storedProducts', JSON.stringify(storedProducts));
          }
  
          // Eliminar el producto de la vista de pedidos.html
          this.remove();
        }
      });
    }
  }
}

// Registra el componente personalizado, lo cual permite utilizarlo como un elemento personalizado
customElements.define('product-card', ProductCard);
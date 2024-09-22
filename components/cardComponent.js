class ProductCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Crear y agregar el estilo
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/styles/card.css');

    // Crear la estructura del componente
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="card">
        <img src="https://via.placeholder.com/300" alt="Product Image">
        <div class="card-content">
          <h4 class="card-title">Titulo</h4>
          <p class="card-description">Descripción</p>
          <button class="add-button">+</button>
        </div>
        <div class="week-day-info" style="display:none;"></div>
        <button class="view-product-btn" style="display:none;">Ver Producto</button>
      </div>
    `;

    shadow.appendChild(linkElem);
    shadow.appendChild(container);
  }

  setWeekDay(week, day) {
    const weekDayInfo = this.shadowRoot.querySelector('.week-day-info');
    const viewProductBtn = this.shadowRoot.querySelector('.view-product-btn');
    const addButton = this.shadowRoot.querySelector('.add-button');
    
    // Mostrar la información de la semana y el día
    weekDayInfo.style.display = 'block';
    weekDayInfo.textContent = `Agregado a: Semana ${week}, Día ${day}`;
    
    // Mostrar el botón "Ver Producto" y ocultar el botón "Agregar"
    viewProductBtn.style.display = 'block';
    addButton.style.display = 'none';  // Ocultar el botón "Agregar"
    
    viewProductBtn.textContent = 'Ver Producto en Pedidos';
    viewProductBtn.addEventListener('click', () => {
      window.location.href = `/pages/pedidos.html?week=${week}&day=${day}`;
    });

    this.setAttribute('week', week);
    this.setAttribute('day', day);
  }

  connectedCallback() {
    const imgElement = this.shadowRoot.querySelector('img');
    const titleElement = this.shadowRoot.querySelector('.card-title');
    const descriptionElement = this.shadowRoot.querySelector('.card-description');
    const addButton = this.shadowRoot.querySelector('.add-button');
    const weekDayInfo = this.shadowRoot.querySelector('.week-day-info');
    const viewProductBtn = this.shadowRoot.querySelector('.view-product-btn');

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

    if (showAddButton) {
      addButton.addEventListener('click', () => {
        const addProductEvent = new CustomEvent('open-modal', {
          detail: { card: this }
        });
        document.dispatchEvent(addProductEvent);
      });
    }
  }
}

customElements.define('product-card', ProductCard);
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
      </div>
    `;

    shadow.appendChild(linkElem);
    shadow.appendChild(container);
  }

  setWeekDay(week, day) {
    const weekDayInfo = this.shadowRoot.querySelector('.week-day-info');
    weekDayInfo.style.display = 'block';
    weekDayInfo.textContent = `Agregado a: Semana ${week}, Día ${day}`;
    this.setAttribute('week', week);
    this.setAttribute('day', day);
  }

  connectedCallback() {
    const imgElement = this.shadowRoot.querySelector('img');
    const titleElement = this.shadowRoot.querySelector('.card-title');
    const descriptionElement = this.shadowRoot.querySelector('.card-description');
    const addButton = this.shadowRoot.querySelector('.add-button');
    const weekDayInfo = this.shadowRoot.querySelector('.week-day-info');

    imgElement.src = this.getAttribute('image') || 'https://via.placeholder.com/300';
    titleElement.textContent = this.getAttribute('title') || 'Titulo';
    descriptionElement.textContent = this.getAttribute('description') || 'Descripción';

    const week = this.getAttribute('week');
    const day = this.getAttribute('day');
    if (week && day) {
      weekDayInfo.style.display = 'block';
      weekDayInfo.textContent = `Agregado a: Semana ${week}, Día ${day}`;
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
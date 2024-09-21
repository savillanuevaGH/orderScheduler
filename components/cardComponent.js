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

    // Adjuntar el estilo y el contenido al Shadow DOM
    shadow.appendChild(linkElem);
    shadow.appendChild(container);
    
    this.cardContainer = container;
    this.weekDayInfo = this.shadowRoot.querySelector('.week-day-info');
  }

  setWeekDay(week, day) {
    this.weekDayInfo.style.display = 'block';
    this.weekDayInfo.textContent = `Agregado a: Semana ${week}, Día ${day}`;
    this.setAttribute('week', week);
    this.setAttribute('day', day);
  }

  connectedCallback() {
    const imgElement = this.shadowRoot.querySelector('img');
    const titleElement = this.shadowRoot.querySelector('.card-title');
    const descriptionElement = this.shadowRoot.querySelector('.card-description');
    const addButton = this.shadowRoot.querySelector('.add-button');

    // Asignar atributos de la tarjeta
    imgElement.src = this.getAttribute('image') || 'https://via.placeholder.com/300';
    titleElement.textContent = this.getAttribute('title') || 'Titulo';
    descriptionElement.textContent = this.getAttribute('description') || 'Descripción';

    // Mostrar información de la semana y el día si están disponibles
    const week = this.getAttribute('week');
    const day = this.getAttribute('day');
    if (week && day) {
      this.setWeekDay(week, day);
    }

    addButton.addEventListener('click', () => {
      const event = new CustomEvent('open-modal', {
        detail: {
          cardTitle: this.getAttribute('title'),
          card: this // Guardar referencia a esta tarjeta
        }
      });
      document.dispatchEvent(event); // Disparar el evento para abrir el modal
    });
  }    
}

// Definir el nuevo elemento
customElements.define('product-card', ProductCard);
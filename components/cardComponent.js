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
          <img src="https://via.placeholder.com/300" alt="Product Image>
          <div class="card-content">
            <h4 class="card-title">Titulo</h4>
            <p class="card-description">Descripción</p>
          </div>
        </div>
      `;
  
      // Adjuntar el estilo y el contenido al Shadow DOM
      shadow.appendChild(linkElem);
      shadow.appendChild(container);
    }

    connectedCallback() {
      const imgElement = this.shadowRoot.querySelector('img');
      const titleElement = this.shadowRoot.querySelector('.card-title');
      const descriptionElement = this.shadowRoot.querySelector('.card-description');
  
      imgElement.src = this.getAttribute('image') || 'https://via.placeholder.com/300';
      titleElement.textContent = this.getAttribute('title') || 'Titulo';
      descriptionElement.textContent = this.getAttribute('description') || 'Descripción';
    }
  }
  
  // Definir el nuevo elemento
  customElements.define('product-card', ProductCard);
  
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
          <img src="${this.getAttribute('image')}" alt="${this.getAttribute('title')}>
          <div class="card-content">
            <h4 class="card-title">${this.getAttribute('title')}</h4>
            <p class="card-description">${this.getAttribute('description')}</p>
          </div>
        </div>
      `;
  
      // Adjuntar el estilo y el contenido al Shadow DOM
      shadow.appendChild(linkElem);
      shadow.appendChild(container);
    }
  }
  
  // Definir el nuevo elemento
  customElements.define('product-card', ProductCard);
  
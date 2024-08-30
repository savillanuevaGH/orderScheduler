// header-component.js
class HeaderComponent extends HTMLElement {
  constructor() {
    super();

    // Crear un shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Crear el contenedor del header
    const header = document.createElement('header');

    // Agregar el contenido HTML al header
    header.innerHTML = `
      <h2 id="header-title">APP Pedidos i2t</h2>
      <div>
        <button id="login-btn">Entrar</button>
        <button id="register-btn">Registrarse</button>
      </div>
    `;

    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/styles/header-component.css');

    // Adjuntar el contenido y los estilos al shadow root
    shadow.appendChild(linkElem);
    shadow.appendChild(header);

    // Obtener referencias a los botones y el título
    const loginBtn = shadow.getElementById('login-btn');
    const registerBtn = shadow.getElementById('register-btn');
    const headerTitle = shadow.getElementById('header-title');

    const currentPath = window.location.pathname;

    loginBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('navigate', { 
        detail: 'login', 
        bubbles: true, 
        composed: true 
      }));
    });
    
    registerBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('navigate', { 
        detail: 'register', 
        bubbles: true, 
        composed: true 
      }));
    });

    headerTitle.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('navigate', { 
        detail: 'home', 
        bubbles: true, 
        composed: true 
      }));
    });

    // Configurar los botones y el título según la página actual
    if (currentPath === '/index.html' || currentPath === '/') {
      // Si estamos en index.html, los botones navegan a las páginas correspondientes
      loginBtn.addEventListener('click', () => {
        window.location.assign('/pages/register.html');
      });
      
      registerBtn.addEventListener('click', () => {
        window.location.assign('/pages/register.html');
      });

    } else if (currentPath === '/pages/register.html') {
      // Si estamos en register.html, el título navega de vuelta al index.html
      headerTitle.addEventListener('click', () => {
        window.location.assign('/');
      });
    }
  }
}

// Definir el nuevo elemento
customElements.define('header-component', HeaderComponent);

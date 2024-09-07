// header-component.js
class HeaderComponent extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const header = document.createElement('header');
    header.innerHTML = `
      <h2 id="header-title">APP Pedidos i2t</h2>
      <ul class="menu">
        <li>
          <button id="login-btn">Entrar</button>
          <button id="register-btn">Registrarse</button>
        </li>
        <li class="menu-item">
          <button class="dropdown-btn">Pedidos</button>
          <ul class="dropdown-content">
            <li><a href="/pages/pedidos.html">Ver mis pedidos</a></li>
            <li><a href="/pages/pedidos.html">Agregar pedido</a></li>
            <li><a href="/pages/pedidos.html">Quitar Pedido</a></li>
          </ul>
        </li>
      </ul>
    `;

    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/styles/header-component.css');

    shadow.appendChild(linkElem);
    shadow.appendChild(header);

    const loginBtn = shadow.getElementById('login-btn');
    const registerBtn = shadow.getElementById('register-btn');
    const headerTitle = shadow.getElementById('header-title');
    const dropdownBtn = shadow.querySelector('.dropdown-btn');
    const menuItem = dropdownBtn.parentElement;

    loginBtn.addEventListener('click', () => {
      // Guardar selección en sessionStorage
      sessionStorage.setItem('navigateTo', 'login');
      window.location.assign('/pages/register.html');
    });
    
    registerBtn.addEventListener('click', () => {
      // Guardar selección en sessionStorage
      sessionStorage.setItem('navigateTo', 'register');
      window.location.assign('/pages/register.html');
    });

    headerTitle.addEventListener('click', () => {
      window.location.assign('/index.html');
    });

    dropdownBtn.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevenir la propagación para evitar conflictos al cerrar
      menuItem.classList.toggle('active'); // Alternar la clase activa para mostrar/ocultar el menú
    });
  
    // Cerrar el menú desplegable si se hace clic fuera
    document.addEventListener('click', (event) => {
      if (!menuItem.contains(event.target)) {
        menuItem.classList.remove('active');
      }
    });
  }
}

customElements.define('header-component', HeaderComponent);

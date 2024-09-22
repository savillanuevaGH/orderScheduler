class HeaderComponent extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const header = document.createElement('header');
    header.innerHTML = `
      <h2 id="header-title">APP Pedidos i2t</h2>
      <div class="menu-container">
        <button id="menu-toggle" class="menu-toggle">☰</button>
        <ul class="menu">
          <li>
            <button id="login-btn">Entrar</button>
            <button id="register-btn">Registrarse</button>
          </li>
          <li class="menu-item">
            <button class="dropdown-btn">Pedidos</button>
            <ul class="dropdown-content">
              <li><a href="/pages/pedidos.html">Ver mis pedidos</a></li>
              <li><a href="/pages/admin/adminProductos.html" id="adminProducts">Administrar Productos</a></li>
            </ul>
          </li>
        </ul>
      </div>
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
    const menuToggle = shadow.getElementById('menu-toggle');

    loginBtn.addEventListener('click', () => {
      sessionStorage.setItem('navigateTo', 'login');
      window.location.assign('/pages/register.html');
    });
    
    registerBtn.addEventListener('click', () => {
      sessionStorage.setItem('navigateTo', 'register');
      window.location.assign('/pages/register.html');
    });

    headerTitle.addEventListener('click', () => {
      window.location.assign('/index.html');
    });

    dropdownBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      menuItem.classList.toggle('active');
    });

    // Cerrar el menú desplegable si se hace clic fuera
    document.addEventListener('click', (event) => {
      if (!menuItem.contains(event.target)) {
        menuItem.classList.remove('active');
      }
    });

    menuToggle.addEventListener('click', () => {
      const menu = shadow.querySelector('.menu');
      menu.classList.toggle('show');
    });
  }
}

customElements.define('header-component', HeaderComponent);
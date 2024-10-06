class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    // Crea el componenente
    const shadow = this.attachShadow({ mode: 'open' });

    // Crear la estructura del componente
    const header = document.createElement('header');
    header.innerHTML = `
      <div id="header-title"><p id="orderSchedulerIcon" title="Haz click para volver al Inicio"></p><h1>orderScheduler</h1></div>
      <div class="menu-container">
        <button id="menu-toggle" class="menu-toggle">☰</button>
        <ul class="menu">
          <li id="header-buttons">
            <button id="login-btn">Entrar</button>
            <button id="register-btn">Registrarse</button>
            <button id="profile-btn">Mi Perfil</button>
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

    // Une el componente con los estilos externos
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/styles/header-component.css');

    shadow.appendChild(linkElem);
    shadow.appendChild(header);

    // Selecciona los elementos del componente
    const loginBtn = shadow.getElementById('login-btn');
    const registerBtn = shadow.getElementById('register-btn');
    const profileBtn = shadow.getElementById('profile-btn');
    const headerIcon = shadow.getElementById('orderSchedulerIcon');
    const dropdownBtn = shadow.querySelector('.dropdown-btn');
    const menuItem = dropdownBtn.parentElement;
    const menuToggle = shadow.getElementById('menu-toggle');

    // Eventos de los botones del headerComponent
    loginBtn.addEventListener('click', () => {
      sessionStorage.setItem('navigateTo', 'login');
      window.location.assign('/pages/register.html');
    });
    
    registerBtn.addEventListener('click', () => {
      sessionStorage.setItem('navigateTo', 'register');
      window.location.assign('/pages/register.html');
    });

    profileBtn.addEventListener('click', () => {
      window.location.assign('/pages/profile.html')
    })

    headerIcon.addEventListener('click', () => {
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

// Registra el componente personalizado, lo cual permite utilizarlo como un elemento personalizado
customElements.define('header-component', HeaderComponent);
// header-component.js
class HeaderComponent extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const header = document.createElement('header');
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

    shadow.appendChild(linkElem);
    shadow.appendChild(header);

    const loginBtn = shadow.getElementById('login-btn');
    const registerBtn = shadow.getElementById('register-btn');
    const headerTitle = shadow.getElementById('header-title');

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
  }
}

customElements.define('header-component', HeaderComponent);

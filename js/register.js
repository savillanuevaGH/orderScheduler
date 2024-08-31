document.addEventListener('DOMContentLoaded', () => {
  const navigateTo = sessionStorage.getItem('navigateTo'); // Leer la selección
  const loginSection = document.getElementById('login-section');
  const registerSection = document.getElementById('register-section');

  if (navigateTo === 'login') {
    loginSection.classList.add('fade-in');
    loginSection.removeAttribute('hidden');
    registerSection.setAttribute('hidden', 'true');
  } else if (navigateTo === 'register') {
    registerSection.classList.add('fade-in');
    registerSection.removeAttribute('hidden');
    loginSection.setAttribute('hidden', 'true');
  }

  // Limpia el valor después de usarlo, si deseas que se reinicie
  sessionStorage.removeItem('navigateTo');
});

document.addEventListener('DOMContentLoaded', () => {
  import('./utils/modal.js').then(module => {
    const  { historyModal } = module;
    historyModal();
  });

  import('../components/headerComponent.js');
  import('../components/cardComponent.js');

  // Selecionar los elementos HTML
  const editBtn = document.getElementById('edit-btn');
  const saveBtn = document.getElementById('save-btn');
  const inputs = document.querySelectorAll('input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const dniInput = document.querySelector('input[type="number"]');

  let editingEnabled = false;

  // Función para habilitar la edición de los inputs
  function enableEditing() {
    editingEnabled = true;
  inputs.forEach((input) => {
      input.readOnly = false;
      passwordInput.readOnly = false;
      dniInput.readOnly = false;
      
    });
    saveBtn.style.display = 'block'; // Mostrar el botón de guardar cambios
  }

  passwordInput.addEventListener('focus', function() {
    if (editingEnabled) {
      this.type = 'text';
    }
  });
  
  passwordInput.addEventListener('blur', function() {
    this.type = 'password';
  });
  // Función para guardar los cambios
  function saveChanges() {
  // Recopilar los valores de los inputs
  alert('La operación ha culminado con éxito...');
  editingEnabled = false;
  const userData = {};
  inputs.forEach((input) => {
      userData[input.id] = input.value;
      userData[passwordInput.id] = passwordInput.value;
      userData[dniInput.id] = dniInput.value;
  });

  // Enviar los datos al servidor o realizar la lógica de negocio aquí
  console.log(userData);

  // Deshabilitar la edición de los inputs
  inputs.forEach((input) => {
      input.readOnly = true;
      passwordInput.readOnly = true;
      passwordInput.type = 'password';
      dniInput.readOnly = true;
  });
  saveBtn.style.display = 'none'; // Ocultar el botón de guardar cambios
  }

  // Agregar eventos a los botones
  editBtn.addEventListener('click', enableEditing);
  saveBtn.addEventListener('click', saveChanges);
})
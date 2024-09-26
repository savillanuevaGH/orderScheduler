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

  // Función para habilitar la edición de los inputs
  function enableEditing() {
  inputs.forEach((input) => {
      input.readOnly = false;
  });
  saveBtn.style.display = 'block'; // Mostrar el botón de guardar cambios
  }

  // Función para guardar los cambios
  function saveChanges() {
  // Recopilar los valores de los inputs
  const userData = {};
  inputs.forEach((input) => {
      userData[input.id] = input.value;
  });

  // Enviar los datos al servidor o realizar la lógica de negocio aquí
  console.log(userData);

  // Deshabilitar la edición de los inputs
  inputs.forEach((input) => {
      input.readOnly = true;
  });
  saveBtn.style.display = 'none'; // Ocultar el botón de guardar cambios
  }

  // Agregar eventos a los botones
  editBtn.addEventListener('click', enableEditing);
  saveBtn.addEventListener('click', saveChanges);
})
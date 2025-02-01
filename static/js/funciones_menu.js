const navEl = document.querySelector('.nav');
const hamburgerEl = document.querySelector('.hamburger');
const navItemEls = document.querySelectorAll('.nav__item');

hamburgerEl.addEventListener('click', () => {
  navEl.classList.toggle('nav--open');
  hamburgerEl.classList.toggle('hamburger--open');
});

navItemEls.forEach(navItemEl => {
  navItemEl.addEventListener('click', () => {
    navEl.classList.remove('nav--open');
    hamburgerEl.classList.remove('hamburger--open');
  });
});

function generateSubtitles() {
  const subtitleCount = document.getElementById('subtitlesCount').value;
  const subtitleInputsContainer = document.getElementById('subtitleInputs');
  
  // Limpiar inputs existentes
  subtitleInputsContainer.innerHTML = '';

  // Generar nuevos inputs
  for (let i = 1; i <= subtitleCount; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = `subtitle_${i}`;
      input.placeholder = `Subtítulo ${i}`;
      input.maxLength = '300';
      subtitleInputsContainer.appendChild(input);
  }
}

let aiStatus = {
  introduccion: false,
  contenido: false,
  conclusion: false
};

function toggleInstitute(inst){
  let input_a = document.getElementById('universidad'),
  input_b = document.getElementById('area'),
  input_c = document.getElementById('carrera');
  if(inst ==  'uni'){
    input_a.placeholder = 'Universidad'
    input_b.style.display = 'block';
    input_c.style.display = 'block';

  }else{
    input_a.placeholder = 'Unidad Educativa'
    input_b.style.display = 'none';
    input_c.style.display = 'none';
  }

}

function toggleGlobalMode(mode) {
  const inputWrappers = ['intro-wrapper', 'contenido-wrapper', 'conclusion-wrapper'];

  inputWrappers.forEach(function(wrapperId) {
      const wrapper = document.getElementById(wrapperId);
      const inputField = wrapper.querySelector('input');
      const toggleButton = wrapper.querySelector('button'); // Get the related button

      if (mode === 'standard') {
        document.getElementById('contenido-wrapper').style.display = 'block'
          inputField.style.display = '';  // Show all input fields
          toggleButton.textContent = '-'; // Default to "-"
          document.getElementById('subtitlesContainer').style.display = 'none'; // Ocultar subtítulos
      } else if (mode === 'ia' && inputField.id === 'contenido') {
          inputField.style.display = 'none';  // Hide input fields for IA mode
          toggleButton.textContent = '✔';     // Default to "✔"
      } else if (mode === 'ia') {
          document.getElementById('contenido-wrapper').style.display = 'none'
          inputField.style.display = 'none';  // Hide input fields for IA mode
          toggleButton.textContent = '✘';     // Default to "✘"
          document.getElementById('subtitlesContainer').style.display = 'block'; // Mostrar subtítulos
      }
  });
}

function toggleAIUsage(inputId) {
  const toggleButton = document.getElementById(inputId + '-toggle');
  const inputField = document.getElementById(inputId);

  // Toggle between "✔" and "✘"
  if (toggleButton.textContent === '✘') {
      toggleButton.textContent = '✔'; // Set to "✔"
      aiStatus[inputId] = true;
  } else if (toggleButton.textContent === '-') {
      toggleButton.textContent = '+'; // Set to "+"
      inputField.style.display = 'none';  // Hide the input field when checked
  } else if (toggleButton.textContent === '✔') {
      if (inputId === "contenido") {
          return;
      }
      toggleButton.textContent = '✘'; // Set to "✘"
      inputField.style.display = 'none';  // Hide the input field when unchecked
      aiStatus[inputId] = false;
  } else {
      toggleButton.textContent = '-'; // Set to "-"
      inputField.style.display = '';  // Show the input field when unchecked
  }
}

flatpickr("#fecha", {
  dateFormat: "d/m/Y", // Formato dd/mm/yyyy
  onChange: function(selectedDates, dateStr, instance) {
      document.getElementById('fechaDisplay').textContent = dateStr; // Mostrar la fecha seleccionada
  }
});

function loadUniversities() {
  fetch('static/txt/lista_imagenes.txt') // Cambia esto a la ruta de tu archivo
      .then(response => response.text())
      .then(data => {
          const universidades = data.split('\n').map(item => item.trim()); // Dividir por líneas
          const datalist = document.getElementById('universidades');

          // Limpiar el datalist antes de agregar nuevas opciones
          datalist.innerHTML = '';

          // Crear opciones dinámicamente para el datalist
          universidades.forEach(universidad => {
              const option = document.createElement('option');
              option.value = universidad;
              datalist.appendChild(option);
          });
      })
      .catch(error => {
          console.error('Error cargando el archivo:', error);
      });
}

// Llamar a la función para cargar las universidades cuando la página se carga
document.addEventListener('DOMContentLoaded', loadUniversities);
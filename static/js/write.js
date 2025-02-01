document.getElementById('studentCount').addEventListener('change', function() {
    let count = parseInt(this.value);
    let container = document.getElementById('studentContainer');
    let alumnoList = document.getElementById('alumnoList');
    let ciList = document.getElementById('ciList');

    container.innerHTML = ''; 
    alumnoList.innerHTML = ''; 
    ciList.innerHTML = ''; 

    for (let i = 1; i <= count; i++) {
        let studentRow = document.createElement('div');
        studentRow.classList.add('student-row');
        
        let nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = `Nombre del estudiante ${i}`;
        nameInput.id = `studentName${i}`;
        nameInput.name = `input${i}`;
        nameInput.maxLength = 40; 
        nameInput.required = true;
        
        let idInput = document.createElement('input');
        idInput.type = 'text';
        idInput.placeholder = `Cédula estudiante ${i}`;
        idInput.id = `studentId${i}`;
        idInput.name = `id${i}`;
        idInput.maxLength = 10;
        idInput.required = true;

        let nameLi = document.createElement('li');
        nameInput.addEventListener('input', function() {
        let existingLi = alumnoList.querySelector(`#alumno${i}`);
            if (existingLi) {
                existingLi.textContent = this.value;
            } else {
                let newLi = document.createElement('li');
                newLi.id = `alumno${i}`;
                newLi.textContent = this.value;
                alumnoList.appendChild(newLi);
            }
        });


        let idLi = document.createElement('li');
        idInput.addEventListener('input', function() {
            let existingLi = ciList.querySelector(`#ci${i}`);
            if (existingLi) {
                existingLi.textContent = this.value;
            } else {
                let newLi = document.createElement('li');
                newLi.id = `ci${i}`;
                newLi.textContent = this.value;
                ciList.appendChild(newLi);
            }
        });

        studentRow.appendChild(nameInput);
        studentRow.appendChild(idInput);
        container.appendChild(studentRow);
    }
});

document.getElementById('submitButton').addEventListener('click', function() {
    let formData = {
        universidad: document.getElementById('universidad').value,
        area: document.getElementById('area').value,
        carrera: document.getElementById('carrera').value,
        titulo: document.getElementById('titulo').value,
        docente: document.getElementById('docente').value,
        asignatura: document.getElementById('asignatura').value,
        periodo: document.getElementById('periodo').value,
        ciudad: document.getElementById('ciudad').value,
        fecha: document.getElementById('fecha').value,
        estudiantes: {},
        introduccion: document.getElementById('introduccion').value,
        contenido: document.getElementById('contenido').value,
        conclusion: document.getElementById('conclusion').value
    };

    let studentCount = parseInt(document.getElementById('studentCount').value);
    for (let i = 1; i <= studentCount; i++) {
        let name = document.getElementById(`studentName${i}`).value;
        let id = document.getElementById(`studentId${i}`).value;


        if (name && id) {
            formData.estudiantes[`estudiante${i}`] = {
                nombre: name,
                cedula: id
            };
        }
    }

    console.log(JSON.stringify(formData, null, 2)); // imprimir el json ahi esta la variable de JSON olivier
});


document.getElementById('universidad').addEventListener('input', function() {
    document.getElementById('universidadDisplay').textContent = (this.value || 'Universidad').toUpperCase();
});

document.getElementById('area').addEventListener('input', function() {
    const maxLength = 40;
    const inputValue = this.value.substring(0, maxLength).toUpperCase();
    document.getElementById('areaDisplay').textContent = inputValue || 'ÁREA';
});

document.getElementById('carrera').addEventListener('input', function() {
    const maxLength = 40;
    const inputValue = this.value.substring(0, maxLength).toUpperCase();
    document.getElementById('carreraDisplay').textContent = inputValue || 'CARRERA';
});

document.getElementById('titulo').addEventListener('input', function() {
    const maxLength = 60;
    const inputValue = this.value.substring(0, maxLength).toUpperCase();
    document.querySelector('.titulo').textContent = inputValue || 'TITULO';
});

document.getElementById('docente').addEventListener('input', function() {
    const maxLength = 40;
    const inputValue = this.value.substring(0, maxLength).toUpperCase();
    document.getElementById('docenteDisplay').textContent = inputValue || '';
});

document.getElementById('asignatura').addEventListener('input', function() {
    const maxLength = 30;
    const inputValue = this.value.substring(0, maxLength).toUpperCase();
    document.getElementById('asignaturaDisplay').textContent = inputValue || '';
});

document.getElementById('periodo').addEventListener('input', function() {
    const maxLength = 3;
    const inputValue = this.value.substring(0, maxLength).toUpperCase();
    document.getElementById('periodoDisplay').textContent = `periodo: ${inputValue}` || '';
});

document.getElementById('ciudad').addEventListener('input', function() {
    const maxLength = 22;
    const inputValue = this.value.substring(0, maxLength).toUpperCase();
    document.getElementById('ciudadDisplay').textContent = inputValue || '';
});

document.getElementById('fecha').addEventListener('input', function() {
    const inputValue = this.value;
    const formattedDate = convertDateToText(inputValue); // Llamamos a la función de conversión
    document.getElementById('fechaDisplay').textContent = formattedDate || '';
});

function convertDateToText(date) {
    if (date !== '' && date.length === 10) { // Validamos si la fecha es válida y tiene el formato adecuado
        const day = date.substring(0, 2); // Primeros dos caracteres (día)
        const month = date.substring(3, 5); // Caracteres 3-4 (mes)
        const year = date.substring(6, 10); // Últimos cuatro caracteres (año)

        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
                        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        // Convertimos el mes numérico a su equivalente en texto
        const newMonth = months[parseInt(month) - 1];
        
        // Devolvemos la fecha formateada como en el ejemplo de Python
        return `${day} de ${newMonth} de ${year}`;
    }
    return ''; // Si la fecha no es válida, devolvemos una cadena vacía
}
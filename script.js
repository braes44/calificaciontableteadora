document.addEventListener('DOMContentLoaded', () => {
    const pruebas = [
        {
            id: 1,
            titulo: "Encendido del equipo",
            descripcion: "Conectar el equipo a una fuente de alimentación de 220 voltios y encenderlo.",
            criterios: [
                "El tablero del panel de control se enciende correctamente."
            ]
        },
        {
            id: 2,
            titulo: "Velocidad de la torreta",
            descripcion: "Verificar la velocidad de la torreta utilizando un tacómetro calibrado.",
            criterios: [
                "Velocidad mínima: <input type='number' id='velocidad-minima' value='10'> RPM",
                "Velocidad máxima: <input type='number' id='velocidad-maxima' value='70'> RPM"
            ]
        },
        {
            id: 3,
            titulo: "Graduación de peso en la matriz",
            descripcion: "Verificar la graduación de peso a través de los punzones inferiores.",
            criterios: [
                "Peso mínimo: <input type='number' id='peso-minimo' value='95'> mg",
                "Peso máximo: <input type='number' id='peso-maximo' value='473'> mg"
            ]
        },
        {
            id: 4,
            titulo: "Cargas máxima y mínima",
            descripcion: "Definir las cargas mínima y máxima de acuerdo con los criterios establecidos.",
            criterios: [
                "Carga mínima: <input type='number' id='carga-minima' value='5'> kg",
                "Carga máxima: <input type='number' id='carga-maxima' value='30'> kg"
            ]
        },
             {
            id: 5,
            titulo: "Estado de la punzoneria",
            descripcion: "Verificar el estado de la punzoneria usada durante el proceso de tableteado.",
            criterios: [
                "Se debe verificar el estado de la punzoneria, sea acero 316L y se encuentre pulido"
            ]
        },
    ];

    const listaPruebas = document.getElementById('lista-pruebas');

    pruebas.forEach(prueba => {
        const pruebaDiv = crearPrueba(prueba);
        listaPruebas.appendChild(pruebaDiv);
    });
});

function crearPrueba(prueba) {
    const pruebaDiv = document.createElement('div');
    pruebaDiv.className = 'prueba';
    pruebaDiv.dataset.id = prueba.id;

    const criteriosHTML = prueba.criterios
        .map(criterio => `<li>${criterio}</li>`)
        .join("");

    pruebaDiv.innerHTML = `
        <h3>${prueba.titulo}</h3>
        <p>${prueba.descripcion}</p>
        <ul>${criteriosHTML}</ul>
        <div class="calificacion">
            <label for="calificacion-${prueba.id}">Calificación:</label>
            <select id="calificacion-${prueba.id}" name="calificacion-${prueba.id}">
                <option value="cumple">Cumple</option>
                <option value="no-cumple">No Cumple</option>
                <option value="n-a">No Aplica</option>
            </select>
        </div>
        <div class="evidencia">
            <label for="evidencia-${prueba.id}">Subir Evidencia:</label>
            <input type="file" id="evidencia-${prueba.id}" name="evidencia-${prueba.id}" accept="image/*" onchange="mostrarImagen(event, ${prueba.id})">
            <div id="imagen-preview-${prueba.id}" class="imagen-preview"></div>
        </div>
        <div class="certificado">
            <label for="certificado-${prueba.id}">Certificado de Calibración:</label>
            <input type="file" id="certificado-${prueba.id}" name="certificado-${prueba.id}" accept="image/*" onchange="mostrarImagenCertificado(event, ${prueba.id})">
            <div id="certificado-preview-${prueba.id}" class="imagen-preview"></div>
        </div>
    `;

    return pruebaDiv;
}

function mostrarImagen(event, id) {
    const previewDiv = document.getElementById(`imagen-preview-${id}`);
    previewDiv.innerHTML = '';

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = `Evidencia para prueba ${id}`;
            previewDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

function mostrarImagenCertificado(event, id) {
    const previewDiv = document.getElementById(`certificado-preview-${id}`);
    previewDiv.innerHTML = '';

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = `Certificado para prueba ${id}`;
            previewDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

function mostrarLogo() {
    const previewDiv = document.getElementById('logo-preview');
    previewDiv.innerHTML = '';

    const file = document.getElementById('logo-laboratorio').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Logo del laboratorio';
            previewDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

function imprimirPagina() {
    window.print();
}

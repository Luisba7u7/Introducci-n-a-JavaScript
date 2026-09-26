const fs = require('fs');

// Ruta del archivo de notas
const filePath = './notas.json';

/**
 * Agrega una nueva nota al archivo.
 * @param {string} titulo - El título de la nota.
 * @param {string} contenido - El contenido de la nota.
 */
function agregarNota(titulo, contenido) {
    let notas = [];

    // Si el archivo existe, leer las notas existentes
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        notas = JSON.parse(data);
    }

    // Crear la nueva nota
    const nuevaNota = {
        titulo,
        contenido
    };

    // Agregar la nota al arreglo
    notas.push(nuevaNota);

    // Guardar las notas actualizadas en el archivo JSON
    fs.writeFileSync(
        filePath,
        JSON.stringify(notas, null, 2)
    );

    console.log('Nota agregada con éxito.');
}

/**
 * Lista todas las notas guardadas.
 */
function listarNotas() {
    if (fs.existsSync(filePath)) {
        // Leer el archivo
        const data = fs.readFileSync(filePath, 'utf8');

        // Convertir JSON a un arreglo de JavaScript
        const notas = JSON.parse(data);

        console.log('Notas guardadas:');
        console.log(notas);
    } else {
        console.log('No hay notas guardadas.');
    }
}

/**
 * Elimina una nota por su título.
 * @param {string} titulo - El título de la nota a eliminar.
 */
function eliminarNota(titulo) {
    if (fs.existsSync(filePath)) {

        // Leer las notas existentes
        const data = fs.readFileSync(filePath, 'utf8');
        const notas = JSON.parse(data);

        // Mantener solamente las notas cuyo título sea diferente
        const notasRestantes = notas.filter(
            (nota) => nota.titulo !== titulo
        );

        // Guardar las notas restantes
        fs.writeFileSync(
            filePath,
            JSON.stringify(notasRestantes, null, 2)
        );

        console.log(`Nota con título "${titulo}" eliminada.`);
    } else {
        console.log('No hay notas para eliminar.');
    }
}

// Ejemplo de uso

agregarNota('Compras', 'Comprar leche y pan.');
agregarNota('Tarea', 'Terminar tarea del CAMPUS')

listarNotas();

//eliminarNota('Compras');
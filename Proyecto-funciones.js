//Proyecto Funciones en JavaScript

//INSTRUCCIONES
/* 

*Define una función `agregarLibro(titulo)`, que añada un libro a un array llamado `librosLeidos`.
*Define una función `mostrarLibrosLeidos()`, que imprima todos los libros que has leído.
*/

let librosLeidos = [];

function agregarLibro(titulo){
    librosLeidos.unshift(titulo)

}

function mostrarLibrosLeidos(){

    for (let i = 0; i < librosLeidos.length; i++) {

    console.log(librosLeidos[i]); 
    }
}


agregarLibro("Cien años de soledad");
agregarLibro("Don Quijote de la Mancha");
agregarLibro("Un animal salvaje");
agregarLibro("Los juegos del hambre");
agregarLibro("Los juegos del hambre 2");

mostrarLibrosLeidos()
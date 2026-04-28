//Proyecto Objetos en JavaScript

//INSTRUCCIONES
/* 
*Cada libro debe ser un objeto con las siguientes propiedades: titulo: (string) el título del libro, autor: (string) 
el autor del libro, anio: (number) el año de publicación, estado: (string) el estado del libro, que puede ser 'disponible' o 'prestado'.
*También debe tener un método describirLibro: (method) método para imprimir la información básica del libro. Algo como 'Libro titulado [titulo], 
escrito por [autor] en el año [anio], el estado es: [estado].'
*Opcional: agregar una propiedad que contenga la lista de capítulos del libro y métodos que permitan agregar y eliminar capítulos del libro.
*/


class Libro {

    constructor(titulo, autor, anio, estado){

        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.estado = estado;
    }


    //Método para saber la informacion
     describirLibro(){
        console.log("Libro titulado " + this.titulo + ", escrito por " + this.autor +
            ", en el año " + this.anio + ", el estado es: " + this.estado)
        
    }
}

//Primer libro

const libro1 = new Libro(
    "Don Quijote de la Mancha",
    "Miguel de Cervantes",
    1967,
    "prestado"
);

const libro2 = new Libro(
    "Cien años de soledad",
    "Miguel de Cervantes",
    1605,
    "disponible"
);

libro2.describirLibro();


//Evaluador de notas

//Pidiendo la nota
let nota = prompt("Ingrese su nota (0-100):");

if(nota >= 90){
    console.log("Aprueba con Excelente");

}else if(nota >= 75 && nota <= 89){
    console.log("Aprueba con Bien");

}else if(nota >= 60 && nota <= 74){
    console.log("Aprueba con Suficiente");

}else{
    console.log("No Aprueba");
}


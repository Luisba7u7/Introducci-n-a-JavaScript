//Arreglos y ciclos

//INSTRUCCIONES
/* 

*Declara un arreglo llamado frutas con varios tipos de frutas.
*Crea un objeto para almacenar la cantidad de cada tipo de fruta.
*Usa un ciclo for/while para recorrer el arreglo y contar las frutas.
*Imprime en la consola la cantidad de cada tipo de fruta.
Opcional: intenta implementar la solución con el otro ciclo también (for/while).

*/

//Arreglo de frutas
let frutas = ["manzana", "banana", "manzana", "naranja", "banana", "manzana"];

//Objeto para almacenar la cantidad
let conteo = {};


//Usando ciclo for para contar las frutas
for(let i=0; i<frutas.length; i++){
    let fruta = frutas[i];

    if(conteo[fruta]){
        conteo[fruta]++;
    }else{
        conteo[fruta] = 1;
    }
}

//Imprimiendo resultados
console.log(conteo);


//Usando el ciclo while

let i = 0;
conteo = {}

while(i < frutas.length){
    let fruta2 =frutas[i];

    if(conteo[fruta2]){
        conteo[fruta2]++;
    }else{
        conteo[fruta2] = 1;
    }

    i++;
}

console.log(conteo);


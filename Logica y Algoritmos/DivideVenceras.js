function findMax(arr) {
    // TODO: Agregar la condición del caso base
    if (arr.length === 1) {
        return arr[0];
    }

    // TODO: Dividir el arreglo en dos mitades
    const mid = Math.floor(arr.length / 2); /* calcular el punto medio */;
    const left = arr.slice(0, mid) /* obtener la primera mitad */
    const right = arr.slice(mid); /* obtener la segunda mitad */

    // TODO: Llamar recursivamente a la función para ambas mitades
    const leftMax = findMax(left)/* llamada recursiva */;
    const rightMax = findMax(right)/* llamada recursiva */;

    // TODO: Combinar las soluciones comparando los máximos
    return Math.max(leftMax, rightMax); /* máximo entre leftMax y rightMax */;
}
// Ejemplo de entrada
const numbers = [3, 8, 2, 10, 5, 7];
console.log(findMax(numbers)); // Salida esperada: 10
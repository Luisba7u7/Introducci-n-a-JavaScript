
const productos = [
    { nombre: "Camiseta", precio: 15, categoria: "Ropa" },
    { nombre: "Laptop", precio: 800, categoria: "Electrónica" },
    { nombre: "Libro", precio: 12, categoria: "Educación" },
    { nombre: "Zapatos", precio: 50, categoria: "Ropa" },
    { nombre: "Celular", precio: 600, categoria: "Electrónica" },
];

const productosDeMenorPrecio= productos.filter((producto) => producto.precio < 100)

const productosOrdenadosPorNombre = productos.sort((a, b) => a.nombre.localeCompare(b.nombre));

const nombresDeProductos = productos.map(producto => producto.nombre)


// Mostrar resultados
console.log("Productos de menor precio:");
console.log(productosDeMenorPrecio);

console.log("Productos ordenados por nombre:");
console.log(productosOrdenadosPorNombre);

console.log("Nombres de los productos:");
console.log(nombresDeProductos);
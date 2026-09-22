const listaDeCompras = [];




const esRepetido = (producto) => listaDeCompras.includes(producto)


function agregarProducto(producto){
    
    if(esRepetido(producto)){
        listaDeCompras.push(producto)
    }else console.log("Este producto ya existe")
    
}

function eliminarProducto(producto){
    listaDeCompras.filter(item => item !== producto)
}

function mostrarLista(){
    console.log(listaDeCompras)
}

agregarProducto("LAPTOP2")
agregarProducto("MOUSE")

mostrarLista()
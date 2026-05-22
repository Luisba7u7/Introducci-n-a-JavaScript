// viajes.js

// Array para guardar los destinos
const destinos = [];

// Función para registrar un destino de viaje
const registrarDestino = (destino, fecha, transporte) => {
    // TODO: Crear un objeto con los datos del destino
    const nuevoViaje = {
        destino: destino,
        fecha: fecha,
        transporte: transporte,
        costo: calcularCosto(destino, transporte)
    };

    destinos.push(nuevoViaje);
};

const costoDestino = {
    "Paris": 500,
    "Londres": 400,
    "New York": 600
}



// Función para calcular el costo del viaje
const calcularCosto = (destino, transporte) => {
  
  let costoBase = costoDestino[destino] || 0;
  
  if (transporte === "Avión") {
        costoBase += 200;
  } else if (transporte === "Tren"){
        costoBase += 100;
  }
  
  return costoBase;
  
};




// Función para mostrar el itinerario de los viajes registrados
const mostrarItinerario = () => {
    for (const viaje of destinos) {
        console.log(`Destino: ${viaje.destino}`);
        console.log(`Fecha: ${viaje.fecha}`);
        console.log(`Transporte: ${viaje.transporte}`);
        console.log(`Costo: $${viaje.costo}`);
        console.log("---------------------------");
    }
};


// Exportar funciones y datos
export {
    registrarDestino,
    mostrarItinerario
};
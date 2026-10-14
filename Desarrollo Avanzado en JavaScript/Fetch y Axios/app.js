//Obteniendo los botones de la pagina
const fetchBtn = document.getElementById("fetch-btn");
const axiosBtn = document.getElementById("axios-btn");

const url = "https://rickandmortyapi.com/api/character"

fetchBtn.addEventListener('click', consumirFetch)
axiosBtn.addEventListener('click', consumirAxios)




function coloresAleatorios(){
   const colores = [
    "#E3F2FD", // Azul claro
    "#E8F5E9", // Verde claro
    "#FFF3E0", // Naranja claro
    "#F3E5F5", // Morado claro
    "#FFEBEE", // Rojo claro
    "#E0F7FA", // Cian claro
    "#FFFDE7", // Amarillo claro
    "#FCE4EC", // Rosa claro
    "#ECEFF1", // Gris azulado
    "#EDE7F6", // Lavanda
    "#E0F2F1", // Verde turquesa claro
    "#FBE9E7"  // Coral claro
    ];

    
    const colorAleatorio = colores[
    Math.floor(Math.random() * colores.length)
    ];

    return colorAleatorio;
}

function consumirFetch (){
    fetch(url)
      .then(response => {
        if(!response.ok){
            throw new Error('Error en la solicitud: ', response.status)
        }
        return response.json();
      })
      .then(data => {
        renderizarDatos(data.results)
      })
      .catch(error => {
        console.error('Hubo un problema con la solicitud: ', error)
      })
}

function consumirAxios(){
    axios.get(url)
    .then(response => {
      const data = response.data;
      renderizarDatos(data.results)
    })
    .catch(error => {
      console.error('Error:', error);
      
    });
}



function renderizarDatos(personajes){
    const dataContainer = document.getElementById("data-container")

    dataContainer.innerHTML = "";

    personajes.forEach(personaje => {
        dataContainer.innerHTML += `
        <section class="container-personajes" style="background-color: ${coloresAleatorios()};">
             <h2>${personaje.name}</h2>

             <div class="datos-personajes">
                <span>${personaje.status}</span>
                <span>${personaje.species}</span>
                <span>${personaje.gender}</span>
             </div>
             <img src="${personaje.image}" alt="Imagen de ${personaje.name}">
        
        </section>
        `
    });
}






// Seleccionar elementos
const form = document.querySelector("form");
const body = document.querySelector("body");
const inputName = document.querySelector("input[type='text']");
const textarea = document.querySelector("textarea");


// Evento submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = inputName.value.trim();
    const comment = textarea.value.trim();

    if (name === "" || comment === "") {
        alert("Completa todos los campos");
        return;
    }

    // Crear comentario
    const commentBox = document.createElement("section");
    commentBox.classList.add("comments-box");

    // Fecha actual
    const date = new Date().toLocaleDateString();

    commentBox.innerHTML = `
        <div class="user">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGm8-Zq94mGM11kBpKhX_Ru5WixZHBQKku6w&s">
            <div>
                <h2>${name}</h2>
                <span>${date}</span>
            </div>
        </div>
        <div>
            <p>${comment}</p>
        </div>
        <button class="delete-btn" style="margin-top:10px; background:red;">
            Eliminar
        </button>
    `;

    // Agregar comentario al contenedor
    body.appendChild(commentBox);

    // Limpiar inputs
    inputName.value = "";
    textarea.value = "";

    // Evento eliminar
    const deleteBtn = commentBox.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        commentBox.remove();
    });
});
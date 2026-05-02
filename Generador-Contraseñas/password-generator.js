/**
 * DOM Elementos
 */
const lengthResult = document.getElementById("result");
const lengthSlider = document.getElementById("mySlider");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const strengthBoxes = Array.from(document.querySelector(".boxs").children);
const strengthResult = document.getElementById("result-strength");
const generateBtn = document.querySelector(".btn-generator");
const passwordDisplay = document.getElementById("password");
const copyBtn = document.getElementById("copyPassword");

/**
 * Actualiza el fondo del control deslizante en función de su valor y actualiza el texto de la longitud.
 */
function updateSlider() {
    const pct = ((lengthSlider.value - lengthSlider.min) / (lengthSlider.max - lengthSlider.min)) * 100;
    lengthSlider.style.background = `linear-gradient(to right, #4caf50 0% ${pct}%, #333 ${pct}% 100%)`;
    lengthResult.textContent = lengthSlider.value;
}

lengthSlider.addEventListener('input', updateSlider);
updateSlider();

/**
 * Funciones de generación de caracteres.
 */
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%{}_-[]";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

/**
 * Controlador principal de generación de contraseñas
 */
function handleGeneratePassword() {
    const length = parseInt(lengthSlider.value);
    const hasUpper = uppercaseCheckbox.checked;
    const hasLower = lowercaseCheckbox.checked;
    const hasNumber = numbersCheckbox.checked;
    const hasSymbol = symbolsCheckbox.checked;

    if (hasUpper || hasLower || hasNumber || hasSymbol) {
        passwordDisplay.textContent = generatePassword(
            hasLower,
            hasUpper,
            hasNumber,
            hasSymbol,
            length
        );
    } else {
        alert("Selecciona al menos una casilla");
    }
}

generateBtn.addEventListener("click", handleGeneratePassword);

/**
 * Genera la cadena de contraseña en función de los criterios seleccionados.
 */
function generatePassword(lower, upper, number, symbol, length) {
    let password = "";
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        (item) => Object.values(item)[0]
    );

    if (typesArr.length === 0) return "";

    // Garantizar al menos un carácter de cada tipo activo.
    typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        password += randomFunc[funcName]();
    });

    // Rellena la longitud restante aleatoriamente.
    while (password.length < length) {
        const randomType = typesArr[Math.floor(Math.random() * typesArr.length)];
        const funcName = Object.keys(randomType)[0];
        password += randomFunc[funcName]();
    }

    // Evaluar y mostrar la seguridad de la contraseña
    const strengthData = getPasswordStrength(password);
    strengthResult.textContent = strengthData[0];
    updateStrengthBoxes(strengthData[1], strengthData[2]);

    // Mezcla los personajes para evitar patrones predecibles.
    return password
        .slice(0, length)
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

/**
 * Evalúa la seguridad de la contraseña generada.
 * Devuelve un array: [Etiqueta de seguridad, Número de casillas resaltadas, Color]
 */
function getPasswordStrength(password) {
    const checks = {
        length8: password.length >= 8,
        length12: password.length >= 12,
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[!@#$%\^&\*\(\)_+\-=\[\]\{\}\|;:,.<>?]/.test(password),
    };

    const typesUsed = [checks.lower, checks.upper, checks.number, checks.symbol].filter(Boolean).length;
    let score = 0;

    if (checks.length8) score++;
    if (checks.length12) score++;
    score += typesUsed;

    if (score <= 2) {
        return ["EASY", 1, "#FF4D4D"];
    } else if (score <= 4) {
        return ["MEDIUM", 3, "#FFC857"];
    } else {
        return ["HARD", 4, "#4CAF50"];
    }
}

/**
 * Actualiza los indicadores visuales de seguridad de la contraseña.
 */
function updateStrengthBoxes(cantidad, color) {
    // Reiniciar todas las cajas primero
    strengthBoxes.forEach(box => {
        box.style.backgroundColor = "transparent";
    });

    // Aplica color al número requerido de casillas
    strengthBoxes.slice(0, cantidad).forEach(box => {
        box.style.backgroundColor = color;
    });
}

/**
 * Muestra un mensaje de notificación de Toastify.
 */
function showNotification(message, backgroundColor) {
    Toastify({
        text: message,
        duration: 2000,
        gravity: "top",
        position: "center",
        style: { background: backgroundColor }
    }).showToast();
}

/**
 * Copia el texto proporcionado al portapapeles del sistema.
 */
function copyToClipboard() {
    const textToCopy = passwordDisplay.textContent;

    if (textToCopy.length !== 0) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification("¡Contraseña copiada!", "#4caf50");
        });
    } else {
        showNotification("Por favor, genera una contraseña", "#FF4D4D");
    }
}

copyBtn.addEventListener("click", copyToClipboard);


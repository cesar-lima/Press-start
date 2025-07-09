const apikeyInput = document.getElementById("apikey");
const gameSelector = document.getElementById("gameSelector");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const response = document.getElementById("response");
const form = document.getElementById("form");

const enviarFormulario = (event) => {
    event.preventDefault(); 
}

form.addEventListener('submit', enviarFormulario);
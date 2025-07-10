const apiKeyInput = document.getElementById("apiKey");
const gameSelector = document.getElementById("gameSelector");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const response = document.getElementById("response");
const form = document.getElementById("form");

const aiQuestion = async (question, game, apiKey) => {
    const model = "gemini-2.0-flash";
    const url = ``;
}

const enviarFormulario = (event) => {
    event.preventDefault();

    const apiKey = apiKeyInput.value;
    const game = gameSelector.value;
    const question = questionInput.value;

    if (apiKey == "" || game == "" || question == "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    askButton.disabled = true;
    askButton.textContent = "Perguntando...";
    askButton.classList.add("loading");

    try {
        aiQuestion(question, game, apiKey)
    } catch (error) {
        alert('Ocorreu um erro', error)
    } finally {
        askButton.disabled = false;
        askButton.textContent = "Perguntar";
        askButton.classList.remove("loading");
    }


}

form.addEventListener('submit', enviarFormulario);
const apiKeyInput = document.getElementById("apiKey");
const gameSelector = document.getElementById("gameSelector");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const response = document.getElementById("response");
const form = document.getElementById("form");

const MarkdownToHTML = (text) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
}

const aiQuestion = async (question, game, apiKey) => {
    const model = "gemini-2.0-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const questionData = `
        ## Especialidade
        Você é um especialista em ser um assistente de meta para o jogo ${game}

        ## Tarefa
        Você deve responder a pergunta do usuário com base no seu conhecimento sobre o jogo, estratégias, buils e dicas

        ## Regras
        - Se você não souber a resposta, responda com 'Desculpe, não sei a resposta para essa pergunta.' e não tente inventar uma resposta
        - Se a pergunta não está relacionada ao jogo, responda com 'Desculpe, esta pergunta não está relacionda ao jogo.'
        - considere a data atual ${new Date().toLocaleDateString()}
        - faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta correta
        - nunca responda itens, builds ou estratégias que você não tenha certeza de que existe no patch atual

        ## Resposta
        - Economize na resposta, seja direto e objetivo, responda apenas o necessário
        - Responda em markdown
        - caso na resposta tenha algum termo em inglês, traduzir para o português
        - Não precisa fazer nenhuma saudação, despedida ou agradecimento, apenas responda a pergunta do usuário

        ## Exemplo de resposta
        Pergunta do usuário: Qual é a melhor build para o campeão X no patch atual?

        Resposta: A melhor build para o campeão X no patch atual é:\n\n **itens:**\n\n coloque os itens aqui\n\n **runas:**\n\n coloque as runas aqui\n\n **estratégia:**\n\n coloque a estratégia aqui\n\n
        ___

        aqui está a pergunta do usuário: ${question}
    `
    const contents = [{
        role: "user",
        parts: [{
            text: questionData
        }]
    }]

    const tools = [{
        google_search: {}
    }]

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })

    const responseData = await response.json();
    return responseData.candidates[0].content.parts[0].text;
}

const enviarFormulario = async (event) => {
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
        const text = await aiQuestion(question, game, apiKey)
        response.querySelector('.response-content').innerHTML = MarkdownToHTML(text);
        response.classList.remove("hidden");
    } catch (error) {
        alert('Ocorreu um erro')
    } finally {
        askButton.disabled = false;
        askButton.textContent = "Perguntar";
        askButton.classList.remove("loading");
    }
}

form.addEventListener('submit', enviarFormulario);
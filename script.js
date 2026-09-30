const textoPergunta = document.querySelector(".texto-pergunta");
const botoesContainer = document.querySelector(".botoes");
const barraPreenchida = document.querySelector(".barra-preenchida");
const areaResultado = document.querySelector(".resultado-escondido");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.querySelector("#botao-reiniciar");
const conteudoMissao = document.querySelector("#conteudo-missao");

const perguntas = [
    {
        enunciado: "Assim que sai da escola, você encontra um chat que responde dúvidas, gera imagens e áudios realistas. Qual é seu primeiro pensamento?",
        alternativas: [
            { texto: "Isso parece assustador.", afirmacao: "Sentiu que a tecnologia pode ser forte e merece cuidado." },
            { texto: "Que incrível! Quero experimentar agora.", afirmacao: "Ficou curioso para usar IA em tarefas do dia a dia." }
        ]
    },
    {
        enunciado: "A professora pede um trabalho sobre IA. Como você começa?",
        alternativas: [
            { texto: "Pesquisa com ferramentas online e usa IA para organizar as ideias.", afirmacao: "Aproveitou a IA como apoio para aprender mais rápido." },
            { texto: "Escreve com base no que já sabe e conversa com os colegas.", afirmacao: "Preferiu usar experiências próprias e evitar copiar sem prestar atenção." }
        ]
    },
    {
        enunciado: "No debate sobre impacto da IA no trabalho, qual sua posição?",
        alternativas: [
            { texto: "A IA pode criar novas oportunidades e fortalecer habilidades humanas.", afirmacao: "Acreditou que a IA pode acompanhar o ser humano e gerar novas profissões." },
            { texto: "Preocupo-me com empregos que podem desaparecer.", afirmacao: "Entendeu que ética e proteção das pessoas são essenciais." }
        ]
    },
    {
        enunciado: "Você precisa criar uma imagem para representar sua ideia de IA. O que faz?",
        alternativas: [
            { texto: "Usa um programa simples de desenho digital.", afirmacao: "Mostrou vontade de aprender ferramentas criativas tradicionais." },
            { texto: "Gera uma imagem com IA.", afirmacao: "Preferiu uma solução rápida e moderna para ilustrar seu projeto." }
        ]
    },
    {
        enunciado: "O trabalho do grupo está igual ao texto gerado pelo chat. Qual é sua atitude?",
        alternativas: [
            { texto: "Deixo do jeito que está, porque foi fácil e parece certo.", afirmacao: "Descobriu que usar só IA pode deixar o trabalho sem a sua voz." },
            { texto: "Revisa o conteúdo e adiciona suas próprias ideias.", afirmacao: "Aprendeu que IA é apoio, não substituto." }
        ]
    }
];

let indiceAtual = 0;
let historiaFinal = "";

function iniciarMissao() {
    indiceAtual = 0;
    historiaFinal = "";
    areaResultado.classList.remove("ativo");
    conteudoMissao.style.display = "block";
    mostraPergunta();
    atualizaProgresso();
}

function mostraPergunta() {
    if (indiceAtual >= perguntas.length) {
        exibirResultado();
        return;
    }

    const pergunta = perguntas[indiceAtual];
    
    // Adiciona efeito suave de fade-in ao trocar as perguntas
    conteudoMissao.classList.remove("fade-in");
    void conteudoMissao.offsetWidth; // Força o reflow para reiniciar a animação
    conteudoMissao.classList.add("fade-in");

    textoPergunta.textContent = pergunta.enunciado;
    botoesContainer.innerHTML = "";

    pergunta.alternativas.forEach((alternativa) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.className = "btn-opcao";
        botao.addEventListener("click", () => respostaSelecionada(alternativa));
        botoesContainer.appendChild(botao);
    });
}

function respostaSelecionada(alternativa) {
    historiaFinal += alternativa.afirmacao + " ";
    indiceAtual += 1;
    atualizaProgresso();
    mostraPergunta();
}

function updateProgresso() {
    const percentual = (indiceAtual / perguntas.length) * 100;
    barraPreenchida.style.width = `${percentual}%`;
}

function atualizaProgresso() {
    const percentual = (indiceAtual / perguntas.length) * 100;
    barraPreenchida.style.width = `${percentual}%`;
}

function exibirResultado() {
    conteudoMissao.style.display = "none";
    textoResultado.textContent = historiaFinal.trim();
    areaResultado.classList.add("ativo");
    barraPreenchida.style.width = "100%";
}

botaoReiniciar.addEventListener("click", iniciarMissao);
iniciarMissao();

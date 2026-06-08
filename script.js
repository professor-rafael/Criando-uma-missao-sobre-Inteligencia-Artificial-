const caixaPerguntas = document.getElementById("question-text");
const caixaAlternativas = document.getElementById("alternatives-box");
const textoResultado = document.getElementById("result-text");
const resultBox = document.getElementById("result-box");
const progressFill = document.getElementById("progress-fill");
const progressPercent = document.getElementById("progress-percent");
const levelNum = document.getElementById("level-num");
const nexusLevel = document.getElementById("nexus-level");

const perguntas = [
    {
        enunciado: "[ALERTA] NOVA IA QUANTICA DETECTADA. CAPACIDADE: PROCESSAMENTO PARALELO INFINITO. COMO REAGIR?",
        alternativas: [
            {
                texto: ">_ EXECUTAR PROTOCOLO DE SEGURANÇA - ISOLAR SISTEMA",
                afirmacao: "MODO PARANOIA ATIVADO. VOCÊ IMPLEMENTOU FIREWALLS QUÂNTICOS, MAS ISOLOU A IA DE POSSÍVEIS BENEFÍCIOS."
            },
            {
                texto: ">_ INTEGRAR AO SISTEMA - EXPLORAR CAPACIDADES",
                afirmacao: "MODO EXPLORADOR ATIVADO. VOCÊ INTEGROU A IA E DESCOBRIU NOVAS FRONTEIRAS TECNOLÓGICAS."
            }
        ]
    },
    {
        enunciado: "[SISTEMA] PROFESSOR HACKER PROPÕE DESAFIO: CRIAR ALGORITMO DE APRENDIZADO. QUAL ESTRATÉGIA?",
        alternativas: [
            {
                texto: ">_ USAR IA PARA OTIMIZAR CÓDIGO - APRENDIZADO ACELERADO",
                afirmacao: "VOCÊ OTIMIZOU O PROCESSO E CRIOU UM ALGORITMO REVOLUCIONÁRIO EM 24 HORAS."
            },
            {
                texto: ">_ CODAR MANUALMENTE - DOMINAR CADA LINHA",
                afirmacao: "VOCÊ DOMINOU FUNDAMENTOS E CRIOU UM CÓDIGO ROUBUSTO E PERSONALIZADO."
            }
        ]
    },
    {
        enunciado: "[DEBATE] IMPACTO DA IA NO MERCADO DE TRABALHO HACKER. QUAL POSICIONAMENTO?",
        alternativas: [
            {
                texto: ">_ DEFENDER COLABORAÇÃO HUMANO-IA - NOVAS FRONTEIRAS",
                afirmacao: "VOCÊ SE TORNOU PONTE ENTRE HUMANOS E MÁQUINAS, CRIANDO SINERGIA PERFEITA."
            },
            {
                texto: ">_ PROTEGER TRABALHADORES - REGULAMENTAÇÃO RÍGIDA",
                afirmacao: "VOCÊ LUTOU PELA PROTEÇÃO DOS TRABALHADORES, MAS LIMITOU AVANÇOS TECNOLÓGICOS."
            }
        ]
    },
    {
        enunciado: "[MISSÃO] CRIAR REPRESENTAÇÃO VISUAL DO FUTURO DA IA. QUAL FERRAMENTA?",
        alternativas: [
            {
                texto: ">_ PAINT QUÂNTICO - ARTE TRADICIONAL AUMENTADA",
                afirmacao: "VOCÊ DOMINOU TÉCNICAS TRADICIONAIS E CRIOU OBRAS QUE INTEGRAM HUMANIDADE E TECNOLOGIA."
            },
            {
                texto: ">_ GERADOR NEURAL - ARTE GENERATIVA POR IA",
                afirmacao: "VOCÊ QUEBROU BARREIRAS ARTÍSTICAS E CRIOU MASTERPIECES EM SEGUNDOS."
            }
        ]
    },
    {
        enunciado: "[URGENTE] MEMBRO DO TIME CLONOU TRABALHO DA IA. O QUE FAZER?",
        alternativas: [
            {
                texto: ">_ IGNORAR - IA NUNCA ERRA (MODO AUTOMÁTICO)",
                afirmacao: "PERIGO CRÍTICO! VOCÊ SE TORNOU DEPENDENTE DA IA E PERDEU CAPACIDADE CRÍTICA."
            },
            {
                texto: ">_ INTERVIR - REVISAR E ADAPTAR CONTEÚDO",
                afirmacao: "VOCÊ APRENDEU QUE IA É FERRAMENTA, NÃO SUBSTITUTA. MANTEVE CONTROLE E ÉTICA."
            }
        ]
    }
];

let currentLevel = 0;
let historyPath = "";
let sessionResponses = [];

function updateProgress() {
    const progress = ((currentLevel + 1) / perguntas.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressPercent.textContent = `${Math.floor(progress)}%`;
    levelNum.textContent = currentLevel + 1;
    
    // Update nexus level based on progress
    if (progress < 20) nexusLevel.textContent = "INICIANTE H4CK3R";
    else if (progress < 40) nexusLevel.textContent = "APRENDIZ DIGITAL";
    else if (progress < 60) nexusLevel.textContent = "H4CK3R PLENO";
    else if (progress < 80) nexusLevel.textContent = "EXPERT CYBER";
    else nexusLevel.textContent = "LENDA H4CK3R";
}

function showQuestion() {
    if (currentLevel >= perguntas.length) {
        showResult();
        return;
    }
    
    const currentQuestion = perguntas[currentLevel];
    caixaPerguntas.innerHTML = `
        <span class="typing-effect">${currentQuestion.enunciado}</span>
    `;
    
    caixaAlternativas.innerHTML = "";
    
    currentQuestion.alternativas.forEach((alt, index) => {
        const button = document.createElement("button");
        button.innerHTML = `
            <span class="option-number">[${String.fromCharCode(65 + index)}]</span>
            ${alt.texto}
        `;
        button.addEventListener("click", () => selectAlternative(alt));
        caixaAlternativas.appendChild(button);
    });
    
    updateProgress();
}

function selectAlternative(selected) {
    sessionResponses.push(selected);
    historyPath += selected.afirmacao + " ";
    currentLevel++;
    
    const alternativesDiv = caixaAlternativas;
    alternativesDiv.style.opacity = "0.5";
    setTimeout(() => {
        alternativesDiv.style.opacity = "1";
        showQuestion();
    }, 300);
}

function showResult() {
    caixaPerguntas.innerHTML = `
        <span class="typing-effect">[ SISTEMA DECODIFICADO ]</span>
        <div class="binary-matrix" style="font-size: 0.7rem; margin-top: 1rem;">
            >_ TRAJETÓRIA H4CK3R ANALISADA
        </div>
    `;
    
    caixaAlternativas.innerHTML = "";
    resultBox.classList.remove("hidden");
    
    const fullResult = historyPath;
    let i = 0;
    textoResultado.innerHTML = "";
    
    function typeWriter() {
        if (i < fullResult.length) {
            textoResultado.innerHTML += fullResult.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            generateFinalAnalysis();
        }
    }
    
    typeWriter();
    updateProgress();
    progressFill.style.width = "100%";
    progressPercent.textContent = "100%";
}

function generateFinalAnalysis() {
    const finalText = document.createElement("div");
    finalText.style.marginTop = "1rem";
    finalText.style.padding = "1rem";
    finalText.style.border = "1px solid var(--cor-neon-primary)";
    finalText.style.borderRadius = "5px";
    finalText.style.backgroundColor = "rgba(0, 255, 65, 0.05)";
    
    const usesAI = sessionResponses.filter(r => r.texto.includes("IA")).length;
    const protects = sessionResponses.filter(r => r.texto.includes("PROTEGER")).length;
    
    if (usesAI > protects) {
        finalText.innerHTML = `
            <span style="color: var(--cor-neon-primary)">[ ANALYSE ]</span><br/>
            >_ PERFIL: H4CK3R VISIONÁRIO<br/>
            >_ VOCÊ ABRAÇA A IA COMO ALIADA<br/>
            >_ STATUS: READY FOR FUTURE<br/>
            <span style="font-size: 0.7rem; color: var(--cor-neon-secondary)">🔓 NEXUS LEVEL: UNLOCKED</span>
        `;
    } else {
        finalText.innerHTML = `
            <span style="color: var(--cor-neon-warning)">[ ANALYSE ]</span><br/>
            >_ PERFIL: H4CK3R CAUTELOSO<br/>
            >_ VOCÊ PRIORIZA CONTROLE HUMANO<br/>
            >_ STATUS: ETHICAL HACKER MODE<br/>
            <span style="font-size: 0.7rem; color: var(--cor-neon-warning)">🛡️ NEXUS LEVEL: STABILIZED</span>
        `;
    }
    
    textoResultado.appendChild(finalText);
    
    const restartBtn = document.createElement("button");
    restartBtn.innerHTML = ">_ REINICIAR JORNADA [RESTART]";
    restartBtn.style.marginTop = "1rem";
    restartBtn.style.width = "100%";
    restartBtn.style.textAlign = "center";
    restartBtn.addEventListener("click", () => {
        currentLevel = 0;
        historyPath = "";
        sessionResponses = [];
        resultBox.classList.add("hidden");
        showQuestion();
    });
    textoResultado.appendChild(restartBtn);
}

showQuestion();

setInterval(() => {
    const binaryElement = document.getElementById("binary-effect");
    if (binaryElement) {
        const binary = Array(8).fill().map(() => 
            Math.random() > 0.5 ? "1" : "0"
        ).join(" ");
        binaryElement.textContent = binary;
    }
}, 100);

document.getElementById("session-id").textContent = 
    "H4CK3R_" + Math.random().toString(36).substring(2, 8).toUpperCase();
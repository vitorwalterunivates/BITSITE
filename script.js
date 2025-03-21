// CALCULADORA

const display = document.getElementById('display');
const botoes = document.querySelectorAll('.botão');

let primeiroNumero = null;
let segundoNumero = null;
let operacao = null;

display.value = '0';
botoes.forEach(botao => {
    let text = botao.textContent;
    
    if (text === 'C') {
        botao.addEventListener('click', () => {
            display.value = '0';
            primeiroNumero = null;
            segundoNumero = null;
            operacao = null;
        });
        return;
    }

    
    if (text === '+' || text === '-' || text === '×' || text === '÷') {
        botao.addEventListener('click', () => {            
            primeiroNumero = parseFloat(display.value);
            operacao = text;
            display.value = '0';
        });
        return;
    }

    if (text === '=') {
        botao.addEventListener('click', () => {
            if (primeiroNumero !== null && operacao !== null) {
                segundoNumero = parseFloat(display.value);
                const resultado = calcular(primeiroNumero, segundoNumero, operacao);
                display.value = resultado;
                primeiroNumero = resultado;
                segundoNumero = null;
                operacao = null;
            }
        });
        return;
    }

    if (text === '.') {
        botao.addEventListener('click', () => {
            if (!display.value.includes('.')) {
                display.value += '.';
            }
        });
        return;
    }

    botao.addEventListener('click', () => {
        const valor = botao.textContent;
        if (valor === '0' && display.value === '0') {
            return;
        }else if (display.value === '0') {
            display.value = valor;
            return;
        }
        display.value += valor;
    });

});


function calcular(num1, num2, operacao) {
    switch (operacao) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '×':
            return num1 * num2;
        case '÷':
            return num1 / num2;
    }

}




// FORMULÁRIO   
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const senha = document.getElementById('senha');
const enviar = document.getElementById('enviar');


enviar.addEventListener('click', () => {

    let check = true;
    const colorError = '3px solid rgba(219, 56, 56, 0.6)';

    if (nome.value.trim() === '') {
        check = false;
        nome.style.border = colorError;
    }else{
        nome.style.border = '3px solid rgba(0, 0, 0, 0)';
    }

    if (!validarEmail()) {
        check = false;
        email.style.border =  colorError;
    }else{
        email.style.border = '3px solid rgba(0, 0, 0, 0)';
    }

    if (!validarTelefone()) {
        check = false;
        telefone.style.border =  colorError;
    }else{
        telefone.style.border = '3px solid rgba(0,0,0,0)';
    }

    if (senha.value.length < 8) {
        check = false;
        senha.style.border =  colorError;
    }else{
        senha.style.border = '3px solid rgba(0,0,0,0)';
    }

    if (check) {
        alert('Formulário enviado com sucesso!');
    }else{
        alert('Por favor, preencha todos os campos corretamente.');
    }

});

function validarEmail(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value);
}

function validarTelefone(){
    const telefoneRegex = /^\d{13}$/;
    return telefoneRegex.test(telefone.value);
}


// JOGO DA VELHA

const botoes_velha = document.getElementsByClassName('botão-velha');
const btt_reset = document.getElementById('botão-velha-reset')
let jogadorAtual = 'X';
let rodada = 0;
let tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

btt_reset.addEventListener('click', reset_game);

for (btt in botoes_velha) {
    botoes_velha[btt].addEventListener('click', bttVelha);
    botoes_velha[btt].addEventListener('mouseover', bttVelhaHover);
    botoes_velha[btt].addEventListener('mouseout', bttVelhaHoverOut);
    botoes_velha[btt].children[0].classList.add('invisivel');
}

function att_text(text){
    label = document.getElementById('label-velha');
    label.textContent = text;
}

function setTabuleiro(numero,jogador) {
    const linha = Math.floor(numero / 3);
    const coluna = numero % 3;
    tabuleiro[linha][coluna] = jogador;
}

function posToNumber(pos){
    let linha = pos[0];
    let coluna = pos[1];
    return linha * 3 + coluna;
}

function mudarJogador() {
    if (jogadorAtual === 'X') {
        jogadorAtual = 'O';
    } else {
        jogadorAtual = 'X';
    }
}

function bttVelhaHover(){

    if (this.disabled === true) {
        return;
    }

    this.children[0].classList.remove('invisivel');
}

function bttVelhaHoverOut(){

    if (this.disabled === true) {
        return;
    }
    
    this.children[0].classList.add('invisivel');
}

function bttVelha() {
    this.disabled = true;
    setTabuleiro(this.id, jogadorAtual);
    this.children[0].src = `images/${jogadorAtual}.png`;
    

    if (checkWin().length > 0) {
        att_text("Jogador " + jogadorAtual + " venceu!");
        end();
        return;
    }

    if (rodada === 8) {
        att_text("Empate!");
        end();
        return;
    }

    mudarJogador();
    changeAllBtts(jogadorAtual);
    rodada++;
    att_text(`Jogador atual: ${jogadorAtual}`);
};

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2] && tabuleiro[i][0] !== '') {
            return [[i, 0], [i, 1], [i, 2]];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (tabuleiro[0][i] === tabuleiro[1][i] && tabuleiro[1][i] === tabuleiro[2][i] && tabuleiro[0][i] !== '') {
            return [[0, i], [1, i], [2, i]];
        }
    }

    if (tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2] && tabuleiro[0][0] !== '') {
        return [[0, 0], [1, 1], [2, 2]];
    }

    if (tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0] && tabuleiro[0][2] !== '') {
        return [[0, 2], [1, 1], [2, 0]];
    }

    return [];
}

function changeAllBtts(jogador) {
    for (btt in botoes_velha) {

        if (botoes_velha[btt].disabled === false) {
            botoes_velha[btt].children[0].src = `images/${jogador}.png`;
        }
    }
}

function end(){

    let positions = checkWin();
    let positionsConverted = [];

    for (pos in positions) {
        positionsConverted.push(posToNumber(positions[pos]));
    }

    if (positionsConverted.length === 0) {
        return;
    }

    for (btt in botoes_velha) {

        botoes_velha[btt].disabled = true;

        if (!positionsConverted.includes(parseInt(botoes_velha[btt].id))) {
            botoes_velha[btt].children[0].classList.add('invisivel');
        }       
    }


}

function reset_game(){
    jogadorAtual = 'X';
    rodada = 0;
    tabuleiro = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    
    ];
    att_text(`Jogador atual: ${jogadorAtual}`);
    for (btt in botoes_velha) {
        botoes_velha[btt].disabled = false;
        botoes_velha[btt].children[0].src = `images/${jogadorAtual}.png`;
        botoes_velha[btt].children[0].classList.add('invisivel');
    }
    
}
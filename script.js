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

    if (nome.value.trim() === '') {
        check = false;
        nome.style.border = '3px solid rgba(255, 0, 0, 0.6)';
    }else{
        nome.style.border = '0px';
    }

    if (!validarEmail()) {
        check = false;
        email.style.border = '3px solid rgba(255, 0, 0, 0.6)';
    }else{
        email.style.border = '0px';
    }

    if (!validarTelefone()) {
        check = false;
        telefone.style.border = '3px solid rgba(255, 0, 0, 0.6)';
    }else{
        telefone.style.border = '0px';
    }

    if (senha.value.length < 8) {
        check = false;
        senha.style.border = '3px solid rgba(255, 0, 0, 0.6)';
    }else{
        senha.style.border = '0px';
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
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let intentosMaximos = 4;



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {

    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`<b>¡Felicidades!</b> Adivinaste el número en <b>${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}</b>.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('adivina').setAttribute('disabled','true');
    } else {
        if (intentos >= intentosMaximos){
            mensajePerdiste();
        

        } else if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es <b>menor</b>');
        } else {
            asignarTextoElemento('p','El número secreto es <b>mayor</b>');
        }

        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','¿Podrás adivinar el número?');
    asignarTextoElemento('p',`Indica un número del <b>1 al ${numeroMaximo}</b>. </br> Solo tienes <b>${intentosMaximos} ${(intentosMaximos === 1) ? 'intento' : 'intentos'}</b>.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);

    document.getElementById('adivina').removeAttribute('disabled');


}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

function mensajePerdiste(){
    asignarTextoElemento ('p', `Se te acabaron los intentos, el número era <b>${numeroSecreto}</b>.`);
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.getElementById('adivina').setAttribute('disabled','true');


}

condicionesIniciales();
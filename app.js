let listaDeNumerosUsados = [];
let numeroSecreto = 0;
let intentos = 1;
let numeroMinimo = 1;
let numeroMaximo = 10;
let intentosMax = 3;

const generarNumeroSecreto = (numeroMinimo = 1, numeroMaximo = 10) => {
  // Genera un número aleatorio entre los límites ingresados
  const nuevoNumeroSecreto = Math.floor(Math.random() * (numeroMaximo - numeroMinimo + 1)) + numeroMinimo;
  // console.log(listaDeNumerosUsados);
  
  // Agrega el número al array de números usados si no lo haya
  if (!listaDeNumerosUsados.includes(nuevoNumeroSecreto)) {
    listaDeNumerosUsados.push(nuevoNumeroSecreto);
    return nuevoNumeroSecreto;
  }
  // Si el array de números usados supera el rango de números permitidos, actualiza textos y botones
  if (listaDeNumerosUsados.length > (numeroMaximo - numeroMinimo)) {
    asignarTextoElemento('.texto__parrafo', `Se han sorteado todos los números posibles en el rango ${numeroMinimo} al ${numeroMaximo}`);
    asignarTextoElemento('.texto__intentos', `¡Cambia los límites para jugar de nuevo!`);
    deshabilitar('#intentar', true);
    deshabilitar('#reiniciar', true);
    deshabilitar('#cambiar-limites', false);
    return;
  }
  // Se llama a si mismo para generar otro número aleatorio si no está incluido en la lista de números usados
  return generarNumeroSecreto(numeroMinimo, numeroMaximo);
}
// Asigna el texto a un elemento
const asignarTextoElemento = (selector, texto) => {
  document.querySelector(selector).innerHTML = texto;
}
// Habilita o deshabilita un elemento
const deshabilitar = (selector, nuevoEstado) => {
  document.querySelector(selector).disabled = nuevoEstado;
}
// Actualiza el texto de los intentos permitidos
const actualizarTextoIntentosPermitidos = (intentosRestantes) => {
  if (intentosRestantes === 0) {
    asignarTextoElemento('.texto__intentos', `¡Intenta de nuevo!`);
    return;
  }
  asignarTextoElemento('.texto__intentos', `Tienes ${intentosRestantes} ${intentosRestantes > 1 ? 'intentos' : 'intento'} para adivinar el número`);
}
// Procesa el intento de adivinar del usuario
const validarIntento = () => {
  if (numeroSecreto === 0) {
    // Se realiza la generación del número aleatorio aquí porque los límites pueden cambiar
    numeroSecreto = generarNumeroSecreto(numeroMinimo, numeroMaximo);
    // console.log(numeroSecreto);
  }
  // Si se genera el número aleatorio
  if (numeroSecreto) {
    deshabilitarLimites();
    deshabilitar('#cambiar-limites', false);
    const numeroIngresado = +document.querySelector('#numeroUsuario').value;
    if (numeroIngresado !== numeroSecreto) {
      actualizarTextoIntentosPermitidos(intentosMax - intentos);
      intentos++;
      document.querySelector('#numeroUsuario').value = '';
      if (intentos > intentosMax) {
        asignarTextoElemento('.texto__parrafo', `No has conseguido adivinar el número`);
        deshabilitar('#reiniciar', false);
        deshabilitar('#intentar', true);
        return;
      }
      asignarTextoElemento(
        '.texto__parrafo', 
        `El número secreto es ${numeroSecreto > numeroIngresado ? 'mayor' : 'menor'} que ${numeroIngresado}`
      );
    } else {
      asignarTextoElemento('.texto__parrafo', `¡Has acertado el número en ${intentos} ${intentos > 1 ? 'intentos' : 'intento'}!`);
      asignarTextoElemento('.texto__intentos', `¡Juega de nuevo!`);
      deshabilitar('#reiniciar', false);
      deshabilitar('#intentar', true);
    }
  }
}
// Procesa el cambio de límite mínimo desde el usuario
const cambiarMinimo = () => {
  numeroMinimo = +document.querySelector('#numeroMinimo').value || 1;
  if (numeroMinimo >= numeroMaximo) {
    alert('El mínimo no puede ser mayor o igual que el máximo');
    numeroMinimo = numeroMaximo - 1;
    document.querySelector('#numeroMinimo').value = numeroMinimo;
  }
  asignarTextoElemento('.texto__parrafo', `Indica un número del ${numeroMinimo} al ${numeroMaximo}`);
}
// Procesa el cambio de límite máximo desde el usuario
const cambiarMaximo = () => {
  numeroMaximo = +document.querySelector('#numeroMaximo').value || 10;
  if (numeroMaximo <= numeroMinimo) {
    alert('El máximo no puede ser menor o igual que el mínimo');
    numeroMaximo = numeroMinimo + 1;
    document.querySelector('#numeroMaximo').value = numeroMaximo;
  }
  asignarTextoElemento('.texto__parrafo', `Indica un número del ${numeroMinimo} al ${numeroMaximo}`);
}
// Procesa el cambio de intentos máximo desde el usuario
const cambiarIntentosPermitidos = () => {
  intentosMax = +document.querySelector('#intentosMax').value || intentosMax;
  if (intentosMax > numeroMaximo) {
    alert(`El número de intentos no puede ser mayor que el máximo permitido: ${numeroMaximo}`);
    intentosMax = numeroMaximo;
    document.querySelector('#intentosMax').value = intentosMax;
    return;
  }
  asignarTextoElemento('.texto__intentos', `Elegiste ${intentosMax} ${intentosMax > 1 ? 'intentos' : 'intento'} para adivinar el número`);
}

const habilitarLimites = () => {
  document.querySelector('#numeroMinimo').disabled = false;
  document.querySelector('#numeroMaximo').disabled = false;
  document.querySelector('#intentosMax').disabled = false;
}
// Procesa el clic del botón cambiar límites
const cambiarLimites = () => {
  habilitarLimites();
  iniciarBotonesAndTextos();
  listaDeNumerosUsados = [];
  numeroSecreto = 0;
  intentos = 1;
}

const deshabilitarLimites = () => {
  document.querySelector('#numeroMinimo').disabled = true;
  document.querySelector('#numeroMaximo').disabled = true;
  document.querySelector('#intentosMax').disabled = true;
}

const asignarLimites = () => {
  document.querySelector('#numeroMinimo').value = numeroMinimo;
  document.querySelector('#numeroMaximo').value = numeroMaximo;
  document.querySelector('#intentosMax').value = intentosMax;
}

const iniciarBotonesAndTextos = () => {
  deshabilitar('#intentar', false);
  deshabilitar('#reiniciar', true);
  deshabilitar('#cambiar-limites', true);
  asignarTextoElemento('h1', 'Adivina el número secreto');
  asignarTextoElemento('.texto__parrafo', `Indica un número del ${numeroMinimo} al ${numeroMaximo}`);
  asignarTextoElemento('.texto__intentos', `${intentosMax} ${intentosMax > 1 ? 'intentos' : 'intento'} para adivinar el número`);
}

// Procesa el clic del botón reiniciar
const reiniciar = () => {
  iniciarBotonesAndTextos();
  document.querySelector('#numeroUsuario').value = '';
  numeroSecreto = generarNumeroSecreto(numeroMinimo, numeroMaximo);
  intentos = 1;
}

const iniciarJuego = () => {
  asignarLimites();
  iniciarBotonesAndTextos();
}

iniciarJuego();
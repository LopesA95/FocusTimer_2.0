//action.js

import * as el from "./elements.js";
import * as sounds from "./sounds.js";
import state from "./state.js";
import * as timer from "./timer.js";

const { cafeteriaAudio, chuvaAudio, florestaAudio, lareiraAudio } = {
  cafeteriaAudio: new Audio('./assets/Cafeteria.wav'),
  chuvaAudio: new Audio('./assets/Chuva.wav'),
  florestaAudio: new Audio('./assets/Floresta.wav'),
  lareiraAudio: new Audio('./assets/Lareira.wav')
};

// Define o loop para as músicas
cafeteriaAudio.loop = true;
chuvaAudio.loop = true;
florestaAudio.loop = true;
lareiraAudio.loop = true;

export function toggleRunning() {
  state.isRunning = document.documentElement.classList.toggle('running')

  timer.countdown()
  sounds.buttonPressAudio.play()

}

export function reset() {
  state.isRunning = false
  document.documentElement.classList.remove('running')
  timer.updateDisplay()
  sounds.buttonPressAudio.play()
}

export function set() {
  el.minutes.setAttribute('contenteditable', true)
  el.minutes.focus()

}

// Função para tocar ou pausar a música
function toggleMusic(audio, button) {
  if (audio.paused) {
    audio.play();
    button.classList.add('selected');
  } else {
    audio.pause();
    button.classList.remove('selected');
  }
}

// Mapeia os botões para suas respectivas músicas
const buttonMusicMap = {
  'ph-tree-evergreen': florestaAudio,
  'ph-coffee': cafeteriaAudio,
  'ph-cloud-rain': chuvaAudio,
  'ph-flame': lareiraAudio
};

// Captura o clique dos botões
const buttons = document.querySelectorAll('[data-action="toggleMusic"]');
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    const buttonClass = button.classList[1]; // Obtém a segunda classe do botão
    const audio = buttonMusicMap[buttonClass]; // Obtém a música correspondente ao botão
    toggleMusic(audio, button); // Toca ou pausa a música correspondente
  });
});
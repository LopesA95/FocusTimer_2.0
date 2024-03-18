// event.js

import * as actions from './actions.js';
import { controls, minutes } from "./elements.js"; // Importe o elemento minutes
import state from './state.js';
import { updateDisplay } from './timer.js';

export function registerControls() {
  controls.addEventListener('click', (event) => {
    const action = event.target.dataset.action
    if (typeof actions[action] != "function") {
      return
    }

    actions[action]()
  });

  // Adicione a manipulação de eventos para os botões "up" e "down"
  const upButton = document.querySelector('[data-action="up"]');
  const downButton = document.querySelector('[data-action="down"]');

  upButton.addEventListener('click', () => {
    incrementMinutes(2); // Incrementa o tempo em 2 minutos
  });

  downButton.addEventListener('click', () => {
    decrementMinutes(2); // Decrementa o tempo em 2 minutos
  });
}

function incrementMinutes(increment) {
  let currentMinutes = parseInt(minutes.textContent);
  let newMinutes = currentMinutes + increment;
  updateMinutes(newMinutes);
}

function decrementMinutes(decrement) {
  let currentMinutes = parseInt(minutes.textContent);
  let newMinutes = currentMinutes - decrement;
  if (newMinutes < 0) {
    newMinutes = 0;
  }
  updateMinutes(newMinutes);
}

function updateMinutes(newMinutes) {
  state.minutes = newMinutes;
  state.seconds = 0;
  updateDisplay();
}

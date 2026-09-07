'use strict';
// The full examples remain readable when JavaScript is unavailable.
document.querySelectorAll('[data-scenarios]').forEach((group) => {
  const picker = group.querySelector('.scenario-picker');
  const buttons = [...picker.querySelectorAll('button')];
  const panels = [...group.querySelectorAll('.scenario-panel')];
  const activate = (button) => {
    buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    panels.forEach((panel) => { panel.hidden = panel.id !== button.getAttribute('aria-controls'); });
  };
  picker.hidden = false;
  buttons.forEach((button) => button.addEventListener('click', () => activate(button)));
  activate(buttons[0]);
});

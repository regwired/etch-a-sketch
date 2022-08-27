const grid = document.querySelector('.grid');
const sizeInput = document.querySelector('#size-input');
const colorInput = document.querySelector('#color-input');
const rainbowInput = document.querySelector('#rainbow-input');
const clearInput = document.querySelector('#clear-input');
const sizeLabel = document.querySelector('#size-label');

const bgColor = '#ffffff';
let color = colorInput.value;
let rainbowMode = false;

function createCell() {
  const cell = document.createElement('div');
  cell.style.backgroundColor = bgColor;
  
  ['mouseover','mousedown'].forEach((eventType) => {
    cell.addEventListener( eventType, (e) => {
      if (!(e.buttons === 1)) return; // If not left click

      e.preventDefault();
      if (rainbowMode) {
        e.target.style.backgroundColor = `hsl(${Math.floor(Math.random() * 361)}, 100%, 50%)`;
      }
      else {
        e.target.style.backgroundColor = color;
      }
    });
  });
  return cell;
}

function createGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size ** 2; i++) {
    grid.appendChild(createCell());
  }
}

function resizeGrid(size) {
  grid.replaceChildren(); //Removes all children
  createGrid(size);
}

rainbowInput.addEventListener('click', () => {
  rainbowMode = !rainbowMode;
  rainbowInput.classList.toggle('off');
});

colorInput.addEventListener('input', (e) => color = e.target.value);

clearInput.addEventListener('click', () => {
  const cells = grid.childNodes;
  cells.forEach((cell) => cell.style.backgroundColor = bgColor);
});

sizeInput.addEventListener('input', (e) => {
  const size = e.target.value;
  sizeLabel.textContent = `${size} x ${size}`;
  resizeGrid(size);
});

window.onload = () => createGrid(sizeInput.value);
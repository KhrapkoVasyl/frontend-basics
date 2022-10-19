// first task

const elToChange = document.getElementById('el-to-change');
const nextElement = document.querySelector('#el-to-change').nextElementSibling;

const styles = [
  { backgroundColor: 'yellow', color: '#000' },
  { backgroundColor: 'blue', color: '#fff' },
  { backgroundColor: 'black', color: '#fff' },
  { backgroundColor: 'purple', color: '#fff' },
  { backgroundColor: 'salmon', color: '#000' },
  { backgroundColor: 'lightgreen', color: '#000' },
];

elToChange.addEventListener('click', () => {
  if (elToChange.classList.contains('el-to-change--first-state')) {
    elToChange.classList.remove('el-to-change--first-state');
    return elToChange.classList.add('el-to-change--second-state');
  }

  if (elToChange.classList.contains('el-to-change--second-state')) {
    return elToChange.classList.remove('el-to-change--second-state');
  }

  elToChange.classList.add('el-to-change--first-state');
});

nextElement.addEventListener('click', () => {
  const randomStyleNumber = Math.floor(Math.random() * styles.length);
  const { backgroundColor, color } = styles[randomStyleNumber];
  nextElement.style.backgroundColor = backgroundColor;
  nextElement.style.color = color;
});

// second task

const imgHandleParams = {
  outerImgContainer: document.querySelector('.outer-img-container'),
  imgContainer: document.querySelector('.img-container'),
  addImgButton: document.querySelector('.add-img-button'),
  enlargeImgButton: document.querySelector('.enlarge-img-button'),
  reduceImgButton: document.querySelector('.reduce-img-button'),
  removeImgButton: document.querySelector('.remove-img-button'),
  imgContainerHTML: `
  <a href="https://www.paris.fr/" target="_blank">
    <img
      class="image"
      src="./images/paris.jpg"
      alt="Париж"
      title="Париж"
    />
  </a>`,
  imgContainerClassName: 'img-container',
  DEFAULT_SCALE: 1,
  MIN_SCALE: 0.2,
  MAX_SCALE: 4,
  SCALE_STEP: 0.2,
  currScale: 1,
};

const getLastImgContainer = () =>
  imgHandleParams.outerImgContainer.querySelector('div:last-child');

const setDefaultScaleToConatinerEl = container => {
  const elToSetDefaultScale = container.querySelector('a');
  imgHandleParams.currScale = imgHandleParams.DEFAULT_SCALE;
  elToSetDefaultScale.style.transform = `scale(${imgHandleParams.currScale})`;
};

// Add image
imgHandleParams.addImgButton.addEventListener('click', () => {
  const lastImageContainer = getLastImgContainer();
  if (lastImageContainer) setDefaultScaleToConatinerEl(lastImageContainer);

  const appendElement = document.createElement('div');
  appendElement.innerHTML = imgHandleParams.imgContainerHTML;
  appendElement.classList.add(imgHandleParams.imgContainerClassName);
  imgHandleParams.outerImgContainer.appendChild(appendElement);
});

// Remove image
imgHandleParams.removeImgButton.addEventListener('click', () => {
  const lastImageContainer = getLastImgContainer();
  if (!lastImageContainer) return;

  imgHandleParams.currScale = imgHandleParams.DEFAULT_SCALE;
  imgHandleParams.outerImgContainer.removeChild(lastImageContainer);
});

// Enlarge image
imgHandleParams.enlargeImgButton.addEventListener('click', () => {
  const lastImageContainer = getLastImgContainer();
  if (!lastImageContainer) return;

  const nextScaleValue = imgHandleParams.currScale + imgHandleParams.SCALE_STEP;
  if (imgHandleParams.MAX_SCALE < nextScaleValue) return;
  imgHandleParams.currScale = nextScaleValue;
  const elToChangeScale = lastImageContainer.querySelector('a');
  elToChangeScale.style.transform = `scale(${imgHandleParams.currScale})`;
});

// Reduce image
imgHandleParams.reduceImgButton.addEventListener('click', () => {
  const lastImageContainer = getLastImgContainer();
  if (!lastImageContainer) return;

  const nextScaleValue = imgHandleParams.currScale - imgHandleParams.SCALE_STEP;
  if (imgHandleParams.MIN_SCALE > nextScaleValue) return;
  imgHandleParams.currScale = nextScaleValue;
  const elToChangeScale = lastImageContainer.querySelector('a');
  elToChangeScale.style.transform = `scale(${imgHandleParams.currScale})`;
});

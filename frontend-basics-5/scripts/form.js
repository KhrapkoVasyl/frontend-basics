const form = document.querySelector('.form');

const formValidationRegexps = {
  fullName: /^[А-ЯЇІЄҐ][а-яїієґ']+\s[А-ЯЇІЄҐ]\.[А-ЯЇІЄҐ]\.$/,
  variant: /^(0[1-9]|[1-9][0-9])$/,
  group: /^[А-ЯЇІЄҐ]{2}-[0-9][1-9]$/,
  phone: /^\([0-9]{3}\)-[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
  ID_сard: /^[А-ЯЇІЄҐ]{2}\s№[0-9]{6}$/,
};

const clearInvalidFields = (keysArr) => {
  for (const key of keysArr) {
    const inputElement = form.querySelector(`#${key}`);
    inputElement.classList.remove('invalid-input');
  }
};

const showInvalidFields = (invalidFields) => {
  for (const field of invalidFields) {
    const inputElement = form.querySelector(`#${field}`);
    inputElement.classList.add('invalid-input');
  }
};

const removeShowingResult = () => {
  const formResult = document.querySelector('.form-result');
  formResult.innerHTML = '';
};

const showResult = (formDataValues) => {
  const resHtml = `
  <p><b>Введені дані:</b></p>
    <ul>
      <li>ПІБ: ${formDataValues.fullName}</li>
      <li>Варіант: ${formDataValues.variant}</li>
      <li>Група: ${formDataValues.group}</li>
      <li>Телефон: ${formDataValues.phone}</li>
      <li>ID-card: ${formDataValues.ID_сard}</li>
    </ul>
    <button id="button-close">Закрити</button>
  `;
  const resultWindowWidth = 300;
  const resultWindowHeight = 250;

  const resultWindow = window.open(
    '/frontend-basics-5/form-result',
    '',
    `width=${resultWindowWidth}px, height=${resultWindowHeight}px`
  );
  resultWindow.setTimeout(() => (resultWindow.document.title = 'form-result'));
  resultWindow.moveBy(
    window.screen.availWidth / 2 - resultWindowWidth / 2,
    window.screen.availHeight / 2 - resultWindowHeight / 2
  );
  resultWindow.document.write(`<div>${resHtml}<div>`);
  const buttonClose = resultWindow.document.getElementById('button-close');
  buttonClose.addEventListener('click', () => {
    resultWindow.close();
  });
};

const validateFormField = (key, value) =>
  formValidationRegexps[key].test(value);

const checkFormData = (formData) => {
  const formDataValues = {};
  const invalidFields = [];
  for (const [key, value] of formData) {
    formDataValues[key] = value;
    const isValid = validateFormField(key, value);
    if (!isValid) invalidFields.push(key);
  }
  clearInvalidFields(Object.keys(formDataValues));
  if (invalidFields.length !== 0) {
    removeShowingResult();
    showInvalidFields(invalidFields);
    return;
  }
  showResult(formDataValues);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  checkFormData(formData);
});

(() => {
  const form = document.forms.details;

  const formFields = [...form.elements].filter((input) => input.type !== 'submit');

  const validationRules = {
    emptyField: 'field is required',
    name: {
      error: 'Enter text only',
      rule: /^[A-Za-z ]*$/
    },
    surname: {
      error: 'Enter text only',
      rule: /^[A-Za-z ]*$/
    },
    email: {
      error: 'Email is invalid',
      rule: /^\w+@\w+\.\w+$/
    },
    phone: {
      error: 'Enter numbers only',
      rule: /^[+]*[0-9][+ 0-9]*$/
    },
    password: {
      error: 'Password must be at least 8 characters length and contain at least 1 special character',
      rule: /^(?=.{8,})(?=.*[@#$%^&+=\*]).*$/
    }
  };


  const inputEventHandler = (e) => {
    const currentField = e.target;
    const fieldName = e.target.name;
    const inputValue = e.target.value;
    const regEx = new RegExp(validationRules[fieldName].rule);
    if (!inputValue.length && currentField.nextElementSibling) {
      currentField.nextElementSibling.remove();
      currentField.removeAttribute('error');
      return;
    }
    if (inputValue.length && !regEx.test(inputValue)) {
      if (currentField.nextElementSibling) {
        currentField.nextElementSibling.remove();
      }
        const errorMessage = document.createElement('span');
        errorMessage.classList.add('error');
        errorMessage.innerText = validationRules[fieldName].error;
        currentField.after(errorMessage);
        currentField.setAttribute('error', true);

      } else if (regEx.test(inputValue) && currentField.nextElementSibling) {
          currentField.nextElementSibling.remove();
          currentField.removeAttribute('error');
        }
    };


  const submitButtonHandler = (e) => {
    e.preventDefault();
    formFields.map((formField) => {
      if (!formField.value.length && !formField.hasAttribute('error')) {
        const errorMessage = document.createElement('span');
        errorMessage.classList.add('error');
        errorMessage.innerText = `${formField.name} ${validationRules.emptyField}`;
        formField.setAttribute('error', true);
        formField.after(errorMessage);
      }
    });

  };

  formFields.map((formField) => {
    formField.addEventListener('input', inputEventHandler);
  });

  form.addEventListener('submit', submitButtonHandler);

})();
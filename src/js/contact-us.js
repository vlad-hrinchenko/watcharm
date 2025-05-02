import JustValidate from 'just-validate';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phone');
  const prefix = '+380-';

  if (!phoneInput.value.startsWith(prefix)) {
    phoneInput.value = prefix;
  }

  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value.startsWith(prefix)) {
      phoneInput.value = prefix;
    }
    setTimeout(() => {
      phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
    }, 0);
  });

  phoneInput.addEventListener('keydown', (e) => {
    if (
      phoneInput.selectionStart <= prefix.length &&
      (e.key === 'Backspace' || e.key === 'Delete')
    ) {
      e.preventDefault();
    }
  });

  phoneInput.addEventListener('input', () => {
    let value = phoneInput.value.replace(/\D/g, '');

    if (value.startsWith('380')) {
      value = value.slice(3);
    }

    value = value.slice(0, 9);

    let formatted = '';
    if (value.length >= 1) formatted = value.slice(0, 2);
    if (value.length >= 3) formatted = `${value.slice(0, 2)}-${value.slice(2, 5)}`;
    if (value.length >= 6) formatted = `${value.slice(0, 2)}-${value.slice(2, 5)}-${value.slice(5, 7)}`;
    if (value.length >= 8) formatted = `${value.slice(0, 2)}-${value.slice(2, 5)}-${value.slice(5, 7)}-${value.slice(7, 9)}`;

    phoneInput.value = prefix + formatted;
  });

  const validation = new JustValidate('.contact-us-form', {
    errorLabelStyle: {
      color: '#e63946',
      fontSize: '13px',
    },
  });

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Please enter your name',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Email is required',
      },
      {
        rule: 'email',
        errorMessage: 'Email is not valid',
      },
    ])
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Phone number is required',
      },
      {
        validator: (value) => {
          return /^\+380-\d{2}-\d{3}-\d{2}-\d{2}$/.test(value);
        },
        errorMessage: 'Phone format must be +380-XX-XXX-XX-XX',
      },
    ])
    .addField('#comment', [
      {
        rule: 'required',
        errorMessage: 'Please leave a comment',
      },
    ])
    .onSuccess((event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            iziToast.success({
              title: 'Sent',
              message: 'Thank you! We will contact you soon.',
              position: 'topRight',
            });
            form.reset();
            form.querySelector('#phone').value = '+380-';
          } else {
            return response.json().then((data) => {
              throw new Error(data.error || 'Form submission failed.');
            });
          }
        })
        .catch((error) => {
          iziToast.error({
            title: 'Error',
            message: error.message,
            position: 'topRight',
          });
        });
    });
});



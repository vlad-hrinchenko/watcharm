const buttonTop = document.querySelector('.rollup');

window.addEventListener('scroll', function() {
  const windowScrollTop = window.scrollY;
  if (windowScrollTop > 100) {
    !buttonTop.classList.contains('is-active')
      ? buttonTop.classList.add('is-active')
      : null;
  } else {
    buttonTop.classList.contains('is-active')
      ? buttonTop.classList.remove('is-active')
      : null;
  }
});

buttonTop.addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
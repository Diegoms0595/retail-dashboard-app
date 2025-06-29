// Side Menu
document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => {
        console.error(`Error al cargar ${file}:`, err);
        el.innerHTML = "<!-- Error al cargar archivo -->";
      });
  });
});



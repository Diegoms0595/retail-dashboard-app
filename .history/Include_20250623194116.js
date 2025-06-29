function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => {
        console.error(err);
        el.innerHTML = "<!-- No se pudo cargar el archivo -->";
      });
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);

// Side menu 
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


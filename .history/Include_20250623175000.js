
function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => {
        if (res.ok) return res.text();
        throw new Error(`Error al cargar ${file}`);
      })
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

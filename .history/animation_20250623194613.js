document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menuToggle');
  const sidebarLinks = document.getElementById('sidebarLinks');

  if (menuToggle && sidebarLinks) {
    menuToggle.addEventListener('click', () => {
      sidebarLinks.classList.toggle('show');
    });
  }
});

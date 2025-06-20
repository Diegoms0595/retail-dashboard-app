document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('addToBagBtn');
  const msg = document.getElementById('message');

  if (btn) {
    btn.addEventListener('click', () => {
      msg.textContent = 'Item added to bag!';
      setTimeout(() => msg.textContent = '', 2000);
    });
  }
});

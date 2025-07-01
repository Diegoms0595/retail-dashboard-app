
document.addEventListener("DOMContentLoaded", () => {
    
    // tab changing
    const tabBag = document.getElementById('cart-tab-bag');
    const tabFavo = document.getElementById('cart-tab-favorite');
    const bagWrapper = document.getElementById('cart-products-wrapper');
    const favoWrapper = document.getElementById('cart-favo-wrapper');

    tabBag.addEventListener('click', () => {
        bagWrapper.classList.remove('hidden');
        favoWrapper.classList.add('hidden');

        tabBag.classList.add('active-tab');
        tabFavo.classList.remove('active-tab');
    });

    tabFavo.addEventListener('click', () => {
        bagWrapper.classList.add('hidden');
        favoWrapper.classList.remove('hidden');

        tabBag.classList.remove('active-tab');
        tabFavo.classList.add('active-tab');
    });

  
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let subtotal = 0;
  let shipping = 0;
  let total = 0;

  if (cart.length === 0) {
    const emptyMessage = document.getElementById('empty-cart-wrapper');
    emptyMessage.style.display = 'flex';
    const continueButton = document.getElementById('cart-continue-button');
    continueButton.disabled = true;
    continueButton.style.cursor = 'auto';
  } else {
      const cartProductWraper = document.getElementById('cart-products-wrapper');
      cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const productDiv = document.createElement("div");
        productDiv.classList.add("cart-item");
          
        const itemLeftArea = document.createElement("div");
        itemLeftArea.classList.add("cart-item-left");
          
        const image = document.createElement("img");
        image.src = item.image;
        image.classList.add("cart-item-image");

        const itemNames = document.createElement("div");
        itemNames.classList.add("cart-item-names");

        const name = document.createElement("p");
        name.textContent = item.name;
        const price = document.createElement("p");
        price.textContent = `\$${item.price.toFixed(2)}`;
          
        itemNames.appendChild(name);
        itemNames.appendChild(price);

        itemLeftArea.appendChild(image);
        itemLeftArea.appendChild(itemNames);
          
        const itemRightArea = document.createElement("div");
        itemRightArea.classList.add("cart-item-right");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.classList.add("cart-item-delete");
        deleteButton.addEventListener("click", () => {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        });

        const size = document.createElement("p");
        size.textContent = item.size;
        
        const color = document.createElement('div');
        color.style.backgroundColor = item.colorCode;
        color.classList.add('cart-item-color');

        const quantityWrapper = document.createElement("div");
        quantityWrapper.classList.add("cart-quantity-groups");
          console.log("クラス名:", quantityWrapper.className);
        const quantity = document.createElement("p");
        quantity.textContent = item.quantity;

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.classList.add('cart-quantity-button');
        plusBtn.addEventListener("click", () => {
          item.quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          quantity.textContent = item.quantity;
          location.reload();
        });

        const minusBtn = document.createElement("button");
        minusBtn.textContent = "−";
        minusBtn.classList.add('cart-quantity-button');
        minusBtn.addEventListener("click", () => {
          if (item.quantity > 1) {
            item.quantity -= 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            quantity.textContent = item.quantity;
          } else {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
          location.reload();
        });

        quantityWrapper.appendChild(plusBtn);
        quantityWrapper.appendChild(quantity);
        quantityWrapper.appendChild(minusBtn);
          
        itemRightArea.appendChild(deleteButton);
        itemRightArea.appendChild(size);
        itemRightArea.appendChild(color);
        itemRightArea.appendChild(quantityWrapper);
        
        productDiv.appendChild(itemLeftArea);
        productDiv.appendChild(itemRightArea);
        cartProductWraper.appendChild(productDiv);
      });

      shipping += 15;
  }
      total = shipping + subtotal;
      document.getElementById('cart-subtotal-value').textContent = `\$${subtotal.toFixed(2)}`;
      document.getElementById('cart-shipping-value').textContent = `\$${shipping.toFixed(2)}`;
      document.getElementById('cart-total-value').textContent = `\$${total.toFixed(2)}`;
});

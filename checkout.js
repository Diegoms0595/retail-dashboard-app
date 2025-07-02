document.addEventListener('DOMContentLoaded', function () {

    // tab Setting
    const tabs = document.querySelectorAll('#checkout-data-tabs p');
    const sections = document.querySelectorAll('[data-section]');
    const buttons = document.querySelectorAll('.checkout-processing-button');

    function showSection(target) {
        sections.forEach(section => {
            if (section.getAttribute('data-section') === target) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });

        tabs.forEach(tab => {
            if (tab.getAttribute('data-content') === target) {
                tab.classList.remove('deactive-tab');
            } else {
                tab.classList.add('deactive-tab');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-content');
            showSection(target);
        });
    });

    buttons.forEach(button => {
        if (button.id !== 'checkout-button') {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-goto');
                showSection(target);
            });
        }
    });

    const allInputs = document.querySelectorAll('input, button');

    // checkout button 
    document.getElementById('checkout-button').addEventListener('click', () => {
        allInputs.forEach(el => el.disabled = true);
        const orderData = {
            firstName: document.getElementById('checkout-payment-first-name').value,
            lastName: document.getElementById('checkout-payment-last-name').value,
            cardNumber: document.getElementById('checkout-payment-card-no').value,
            email: document.getElementById('checkout-information-email').value,
            phone: document.getElementById('checkout-information-phone').value,
            address: {
                country: document.getElementById('checkout-information-country').value,
                state: document.getElementById('checkout-information-state').value,
                city: document.getElementById('checkout-information-city').value,
                postalCode: document.getElementById('checkout-information-pc').value
            },
            cart: JSON.parse(localStorage.getItem('cart')) || []
        };

        fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('cart');
                window.location.href = 'complete.html';
            } else {
                alert('Something went wrong...');
                allInputs.forEach(el => el.disabled = false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // orders
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0
    let subtotal = 0;
    let shipping = 0;
    let total = 0;

    if (cart.length === 0) {
        const emptyMessage = document.getElementById('empty-cart-wrapper');
        emptyMessage.style.display = 'flex';
        const continueButton = document.getElementById('checkout-button');
        continueButton.disabled = true;
        continueButton.style.cursor = 'auto';
    } else {
        const productWraper = document.getElementById('checkout-order-products-wrapper');
        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            count += item.quantity;
            const productDiv = document.createElement("div");
            productDiv.classList.add("checkout-item");
            
            const image = document.createElement("img");
            image.src = item.image;
            image.classList.add("checkout-item-image");

            const itemMiddleArea = document.createElement("div");
            itemMiddleArea.classList.add("checkout-item-middle");

            const name = document.createElement("p");
            name.textContent = item.name;
            const sizeColor = document.createElement("p");
            sizeColor.textContent = `${item.colorName}/${item.size}`
            const quantity = document.createElement("p");
            quantity.textContent = `(${item.quantity})`;

            itemMiddleArea.appendChild(name);
            itemMiddleArea.appendChild(sizeColor);
            itemMiddleArea.appendChild(quantity);

            const itemRightArea = document.createElement("div");
            itemRightArea.classList.add("checkout-item-right");

            const change = document.createElement("a");
            change.textContent = 'change';
            change.href = 'cart.html';
            change.classList.add("checkout-item-change");

            const price = document.createElement("p");
            price.textContent = `\$${item.price.toFixed(2)}`;
            
            itemRightArea.appendChild(change);
            itemRightArea.appendChild(price);
            
            productDiv.appendChild(image);
            productDiv.appendChild(itemMiddleArea);
            productDiv.appendChild(itemRightArea);
            productWraper.appendChild(productDiv);
        });

        shipping += 15;
    }
    total = shipping + subtotal;
    document.getElementById('checkout-order-count-value').textContent = `(${count})`;
    document.getElementById('checkout-subtotal-value').textContent = `\$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-shipping-value').textContent = `\$${shipping.toFixed(2)}`;
    document.getElementById('checkout-total-value').textContent = `\$${total.toFixed(2)}`;
});

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const container = document.getElementById('orderItems');
const totalEl = document.getElementById('totalPrice');
const placeOrderBtn = document.getElementById('placeOrderBtn');

let total = 0;

// show order summary
cart.forEach(item => {
  total += item.price * item.qty;

  const div = document.createElement('div');
  div.classList.add('order-item');

  div.innerHTML = `
    <span>${item.name} (${item.size || ''}) x${item.qty}</span>
    <span>₹${item.price * item.qty}</span>
  `;

  container.appendChild(div);
});

totalEl.textContent = "₹" + total;


// button click
placeOrderBtn.addEventListener('click', function () {
  const name = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const pincode = document.getElementById('pincode').value.trim();

  if (!name || !phone || !address || !city || !pincode) {
    alert("Please fill all shipping details");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  alert("Order placed successfully 🎉");

  localStorage.removeItem('cart');
  window.location.href = "index.html";
});

let selectedSize = "";
let qty = 1;

// Get selected product
const product = JSON.parse(localStorage.getItem('selectedProduct'));

// Safety check
if (!product || !product.name || !product.price || !product.img) {
    alert("Product data missing");
    window.location.href = "index.html";
}

// Fill detail page
document.getElementById('detailImg').src = product.img;
document.getElementById('detailName').textContent = product.name;
document.getElementById('detailDesc').textContent = product.desc;
document.getElementById('detailPrice').textContent = "₹" + product.price;
document.getElementById('qty').textContent = qty;


// ✅ SIZE SELECT
document.querySelectorAll('.size').forEach(sizeEl => {
    sizeEl.addEventListener('click', () => {
        document.querySelectorAll('.size').forEach(s => s.classList.remove('active'));
        sizeEl.classList.add('active');
        selectedSize = sizeEl.textContent;
    });
});


// ✅ QTY CHANGE
function changeQty(change) {
    qty += change;
    if (qty < 1) qty = 1;
    document.getElementById('qty').textContent = qty;
}


// ✅ ADD TO CART
document.getElementById('addToCartBtn').addEventListener('click', () => {
    if (!selectedSize) {
        alert("Please select size");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(item =>
        item.name === product.name &&
        item.size === selectedSize
    );

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            ...product,
            qty,
            size: selectedSize
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Added to cart 🛒");
});


// ✅ BUY NOW BUTTON
document.querySelectorAll('.btn') .addEventListener('click', () => {
    if (!selectedSize) {
        alert("Please select size");
        return;
    }

    let cart = [{
        ...product,
        qty,
        size: selectedSize
    }];

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "checkout.html";
});


// ✅ BACK BUTTON
function goBack() {
    window.history.back();
}

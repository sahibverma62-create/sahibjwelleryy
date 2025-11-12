// ========================================
// Sahib Jewellers - Cart Management
// ========================================

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = getProductById(productId);
    
    if (!product) {
        showAlert('Product not found', 'error');
        return false;
    }

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
    showAlert('Item added to cart!', 'success');
    return true;
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    displayCart();
    showAlert('Item removed from cart', 'success');
}

// Update item quantity in cart
function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart(cart);
            displayCart();
        }
    }
}

// Get cart total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Display cart
function displayCart() {
    const cart = getCart();
    const cartTable = document.getElementById('cartTable');
    const cartTotal = document.getElementById('cartTotal');
    const cartBody = document.getElementById('cartBody');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotalContainer = document.getElementById('cartTotalContainer');

    if (!cartBody) return;

    if (cart.length === 0) {
        if (cartTable) cartTable.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartTotalContainer) cartTotalContainer.style.display = 'none';
        if (cartTotal) cartTotal.textContent = formatCurrency(0);
        return;
    }

    if (cartTable) cartTable.style.display = 'table';
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartTotalContainer) cartTotalContainer.style.display = 'block';

    cartBody.innerHTML = cart.map(item => `
        <tr>
            <td>
                <img src="${item.image}" alt="${item.name}" class="cart-item-image"
                     onerror="this.src='https://via.placeholder.com/80?text=Jewelry'">
            </td>
            <td>${item.name}</td>
            <td>${formatCurrency(item.price)}</td>
            <td>
                <div class="quantity-control">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" min="1" 
                           onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </td>
            <td>${formatCurrency(item.price * item.quantity)}</td>
            <td>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
            </td>
        </tr>
    `).join('');

    if (cartTotal) {
        cartTotal.textContent = formatCurrency(getCartTotal());
    }
}

// Clear cart
function clearCart() {
    saveCart([]);
    displayCart();
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cartBody')) {
        displayCart();
    }
});


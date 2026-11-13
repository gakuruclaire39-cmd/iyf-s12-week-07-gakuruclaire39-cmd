// Centralized state - only cart is saved, products are fixed
const state = {
    products: [
        { id: 1, name: "Mandazi (pack of 6)", price: 120, image: "https://picsum.photos/seed/mandazi/200" },
        { id: 2, name: "Chapati (pack of 5)", price: 150, image: "https://picsum.photos/seed/chapati/200" },
        { id: 3, name: "Tea leaves 250g", price: 180, image: "https://picsum.photos/seed/tea/200" }
    ],
    cart: [], // { productId, quantity }
    history: [] // for undo bonus
};

const STORAGE_KEY = 'shoppingCart';

// --- Persistence ---
function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try { state.cart = JSON.parse(saved); } catch {}
    }
}

function pushHistory() {
    state.history.push(JSON.stringify(state.cart));
    if (state.history.length > 10) state.history.shift();
}

// --- State Updates (clean functions) ---
function addToCart(productId) {
    pushHistory();
    const existing = state.cart.find(item => item.productId === productId);
    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }
    saveCart();
    renderCart();
}

function updateQuantity(productId, quantity) {
    pushHistory();
    if (quantity <= 0) {
        removeFromCart(productId, false);
        return;
    }
    const item = state.cart.find(i => i.productId === productId);
    if (item) item.quantity = quantity;
    saveCart();
    renderCart();
}

function removeFromCart(productId, saveHistory = true) {
    if (saveHistory) pushHistory();
    state.cart = state.cart.filter(item => item.productId !== productId);
    saveCart();
    renderCart();
}

function clearCart() {
    pushHistory();
    state.cart = [];
    saveCart();
    renderCart();
}

function undoLastChange() {
    if (state.history.length === 0) return;
    state.cart = JSON.parse(state.history.pop());
    saveCart();
    renderCart();
}

// --- Derived values (not stored) ---
function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + (product.price * item.quantity);
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

// --- Render ---
function renderProducts() {
    const container = document.getElementById('products');
    container.innerHTML = state.products.map(p => `
        <div class="product">
            <img src="${p.image}" alt="${p.name}">
            <strong>${p.name}</strong>
            <span>Ksh ${p.price}</span>
            <button onclick="window.addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const countEl = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');

    if (state.cart.length === 0) {
        container.innerHTML = '<p style="padding:1rem 0;color:#666">Cart is empty</p>';
    } else {
        container.innerHTML = state.cart.map(item => {
            const product = state.products.find(p => p.id === item.productId);
            return `
            <div class="cart-item">
                <div><strong>${product.name}</strong><br><small>Ksh ${product.price}</small></div>
                <div class="qty-controls">
                    <button class="secondary" onclick="window.updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="secondary" onclick="window.updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                    <button class="secondary" onclick="window.removeFromCart(${item.productId})">x</button>
                </div>
            </div>`;
        }).join('');
    }

    countEl.textContent = getCartCount();
    totalEl.textContent = getCartTotal();
}

// Expose for HTML onclick
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// Init
loadCart();
renderProducts();
renderCart();
document.getElementById('clear-btn').addEventListener('click', clearCart);
document.getElementById('undo-btn').addEventListener('click', undoLastChange);

// ===== MENU DATABASE =====
const menuData = [
  // Appetizers
  { id: 1, name: 'Paneer Tikka', category: 'appetizers', price: 250, emoji: '🍗', description: 'Spiced cottage cheese', type: 'veg', rating: 4.5 },
  { id: 2, name: 'Spring Rolls', category: 'appetizers', price: 180, emoji: '🥒', description: 'Crispy vegetable rolls', type: 'veg', rating: 4.3 },
  { id: 3, name: 'Garlic Bread', category: 'appetizers', price: 120, emoji: '🍞', description: 'Buttery garlic bread', type: 'veg', rating: 4.2 },
  { id: 4, name: 'Chicken Tikka', category: 'appetizers', price: 320, emoji: '🍗', description: 'Grilled chicken pieces', type: 'non-veg', rating: 4.6 },
  { id: 20, name: 'Samosa', category: 'appetizers', price: 50, emoji: '📦', description: 'Crispy potato pastry', type: 'veg', rating: 4.4 },
  
  // Main Course
  { id: 5, name: 'Butter Chicken', category: 'mains', price: 380, emoji: '🍛', description: 'Creamy tomato sauce chicken', type: 'non-veg', rating: 4.7 },
  { id: 6, name: 'Biryani', category: 'mains', price: 320, emoji: '🍚', description: 'Fragrant rice with meat/veg', type: 'non-veg', rating: 4.5 },
  { id: 7, name: 'Dal Makhni', category: 'mains', price: 220, emoji: '🫕', description: 'Creamy black lentils', type: 'veg', rating: 4.4 },
  { id: 8, name: 'Naan', category: 'mains', price: 60, emoji: '🥖', description: 'Traditional Indian bread', type: 'veg', rating: 4.3 },
  { id: 9, name: 'Paneer Butter Masala', category: 'mains', price: 280, emoji: '🍛', description: 'Paneer in creamy sauce', type: 'veg', rating: 4.6 },
  { id: 10, name: 'Fish Curry', category: 'mains', price: 420, emoji: '🐟', description: 'Spicy fish gravy', type: 'non-veg', rating: 4.4 },
  { id: 21, name: 'Tandoori Chicken', category: 'mains', price: 350, emoji: '🍗', description: 'Grilled chicken in tandoor', type: 'non-veg', rating: 4.5 },
  
  // Desserts
  { id: 11, name: 'Gulab Jamun', category: 'desserts', price: 150, emoji: '🍶', description: 'Sweet milk dumplings', type: 'veg', rating: 4.5 },
  { id: 12, name: 'Kheer', category: 'desserts', price: 120, emoji: '🍲', description: 'Rice pudding with nuts', type: 'veg', rating: 4.2 },
  { id: 13, name: 'Ice Cream', category: 'desserts', price: 100, emoji: '🍦', description: 'Vanilla or chocolate', type: 'veg', rating: 4.4 },
  { id: 14, name: 'Rasgulla', category: 'desserts', price: 140, emoji: '🎾', description: 'Soft cheese balls in syrup', type: 'veg', rating: 4.3 },
  
  // Beverages
  { id: 15, name: 'Coca Cola', category: 'beverages', price: 60, emoji: '🥤', description: 'Cold cola drink', type: 'veg', rating: 4.0 },
  { id: 16, name: 'Mango Lassi', category: 'beverages', price: 120, emoji: '🥛', description: 'Yogurt based drink', type: 'veg', rating: 4.6 },
  { id: 17, name: 'Iced Tea', category: 'beverages', price: 80, emoji: '🧊', description: 'Chilled tea drink', type: 'veg', rating: 4.1 },
  { id: 18, name: 'Fresh Orange Juice', category: 'beverages', price: 100, emoji: '🍊', description: 'Fresh squeezed juice', type: 'veg', rating: 4.5 },
  { id: 19, name: 'Coffee', category: 'beverages', price: 70, emoji: '☕', description: 'Hot coffee', type: 'veg', rating: 4.2 },
];

// ===== GLOBAL VARIABLES =====
let cart = [];
let currentFilter = 'all';
let promoDiscount = 0;
let viewMode = 'grid';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  displayMenu('all');
  updateTime();
  setInterval(updateTime, 1000);
  loadCart();
  setupEventListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Close modal on outside click
  window.onclick = (event) => {
    const confirmModal = document.getElementById('confirmModal');
    const promoModal = document.getElementById('promoModal');
    const settingsModal = document.getElementById('settingsModal');

    if (event.target === confirmModal) closeModal('confirmModal');
    if (event.target === promoModal) closeModal('promoModal');
    if (event.target === settingsModal) closeModal('settingsModal');
  };

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('confirmModal');
      closeModal('promoModal');
      closeModal('settingsModal');
    }
  });
}

// ===== TIME DISPLAY =====
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('timeDisplay').textContent = `${hours}:${minutes}`;
}

// ===== MENU DISPLAY =====
function displayMenu(category) {
  const menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = '';

  const filtered = category === 'all' ? menuData : menuData.filter(item => item.category === category);

  if (filtered.length === 0) {
    menuDiv.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #95A5A6;">No items found</div>';
    return;
  }

  filtered.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = `menu-item ${item.type}`;
    itemDiv.innerHTML = `
      <div class="item-image">${item.emoji}</div>
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-category">${item.category.toUpperCase()}</div>
        <div class="item-description">${item.description}</div>
        <div class="item-rating">⭐ ${item.rating}</div>
        <div class="item-footer">
          <span class="item-price">₹${item.price}</span>
          <button class="add-btn" onclick="addToCart(${item.id})">➕ Add</button>
        </div>
      </div>
    `;
    menuDiv.appendChild(itemDiv);
  });
}

// ===== FILTER CATEGORY =====
function filterCategory(category) {
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.closest('.filter-btn').classList.add('active');

  const categoryNames = {
    'all': 'All Items',
    'appetizers': 'Appetizers 🥒',
    'mains': 'Main Course 🍛',
    'desserts': 'Desserts 🍰',
    'beverages': 'Beverages 🥤'
  };

  document.getElementById('menuTitle').textContent = `📋 ${categoryNames[category]}`;
  displayMenu(category);
}

// ===== SEARCH ITEMS =====
function searchItems() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = '';

  if (searchTerm.trim() === '') {
    displayMenu(currentFilter);
    return;
  }

  const filtered = menuData.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );

  if (filtered.length === 0) {
    menuDiv.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #95A5A6;">No items found for "${searchTerm}"</div>`;
    return;
  }

  filtered.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = `menu-item ${item.type}`;
    itemDiv.innerHTML = `
      <div class="item-image">${item.emoji}</div>
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-category">${item.category.toUpperCase()}</div>
        <div class="item-description">${item.description}</div>
        <div class="item-rating">⭐ ${item.rating}</div>
        <div class="item-footer">
          <span class="item-price">₹${item.price}</span>
          <button class="add-btn" onclick="addToCart(${item.id})">➕ Add</button>
        </div>
      </div>
    `;
    menuDiv.appendChild(itemDiv);
  });
}

// ===== SET VIEW MODE =====
function setViewMode(mode) {
  viewMode = mode;
  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const menuGrid = document.getElementById('menu');
  if (mode === 'grid') {
    menuGrid.className = 'menu-grid';
  } else {
    menuGrid.className = 'menu-list';
  }
}

// ===== CART OPERATIONS =====
function addToCart(itemId) {
  const item = menuData.find(m => m.id === itemId);
  const existingItem = cart.find(c => c.id === itemId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCart();
  saveCart();
  showNotification(`✅ ${item.name} added to cart!`, 'success');
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCart();
  saveCart();
  showNotification('❌ Item removed from cart', 'warning');
}

function updateQuantity(itemId, change) {
  const item = cart.find(c => c.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCart();
      saveCart();
    }
  }
}

function updateCart() {
  const cartDiv = document.getElementById('cartItems');

  if (cart.length === 0) {
    cartDiv.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <p class="empty-text">No items added yet</p>
        <p class="empty-subtext">Add items from the menu</p>
      </div>
    `;
  } else {
    cartDiv.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-name">${item.emoji} ${item.name}</div>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
          <span class="cart-item-price">₹${item.price * item.quantity}</span>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
        </div>
      </div>
    `).join('');
  }

  calculateTotal();
}

function calculateTotal() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = Math.round(subtotal * promoDiscount / 100);
  const afterDiscount = subtotal - discount;
  const tax = Math.round(afterDiscount * 0.1);
  const total = afterDiscount + tax;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById('itemCount').textContent = itemCount;
  document.getElementById('subtotal').textContent = subtotal;
  document.getElementById('discount').textContent = discount;
  document.getElementById('tax').textContent = tax;
  document.getElementById('total').textContent = total;
  document.getElementById('cartValue').textContent = total;
  document.getElementById('totalItems').textContent = itemCount;
}

function clearCart() {
  if (cart.length === 0) {
    showNotification('⚠️ Cart is already empty', 'warning');
    return;
  }

  if (confirm('🗑️ Are you sure you want to clear the entire cart?')) {
    cart = [];
    promoDiscount = 0;
    updateCart();
    saveCart();
    showNotification('✅ Cart cleared', 'success');
  }
}

// ===== PAYMENT & ORDER =====
function payNow() {
  if (cart.length === 0) {
    showNotification('⚠️ Please add items before paying', 'error');
    return;
  }

  const total = document.getElementById('total').textContent;
  const specialRequests = document.getElementById('specialRequests').value;

  const confirmDiv = document.getElementById('confirmDetails');
  confirmDiv.innerHTML = `
    <strong>📋 Order Summary</strong><br><br>
    <strong>Items:</strong> ${cart.map(item => `${item.name} x${item.quantity}`).join(', ')}<br>
    <strong>Total Items:</strong> ${cart.reduce((sum, item) => sum + item.quantity, 0)}<br><br>
    <strong>💰 Payment Details:</strong><br>
    Subtotal: ₹${document.getElementById('subtotal').textContent}<br>
    Discount: -₹${document.getElementById('discount').textContent}<br>
    Tax: +₹${document.getElementById('tax').textContent}<br>
    <strong>Total: ₹${total}</strong><br><br>
    ${specialRequests ? `<strong>📝 Special Requests:</strong><br>${specialRequests}<br><br>` : ''}
    <strong>💳 Payment Methods Available:</strong><br>
    💳 UPI | 💰 Cash | 🏦 Card
  `;

  openModal('confirmModal');
}

function confirmOrder() {
  const total = document.getElementById('total').textContent;

  closeModal('confirmModal');

  alert(`✅ Order Confirmed!\n\n💰 Total: ₹${total}\n\nThank you for ordering with SmartTable!\n\nYour order will be prepared shortly.`);

  // Reset cart after payment
  cart = [];
  promoDiscount = 0;
  updateCart();
  saveCart();
  document.getElementById('specialRequests').value = '';
  document.getElementById('searchInput').value = '';

  showNotification('✅ Payment successful! Order placed.', 'success');
}

function callWaiter() {
  showNotification('📞 Waiter has been called! They will be with you shortly.', 'success');
  console.log('Waiter called at:', new Date().toLocaleTimeString());
}

// ===== PROMO CODES =====
function applyPromo() {
  openModal('promoModal');
  document.getElementById('promoCode').focus();
}

function submitPromo() {
  const code = document.getElementById('promoCode').value.toUpperCase().trim();

  const promoCodes = {
    'WELCOME15': 15,
    'SAVE20': 20,
    'SPECIAL10': 10,
    'ENJOY25': 25,
    'FLAT50': 50,
  };

  if (code === '') {
    showNotification('⚠️ Please enter a promo code', 'warning');
    return;
  }

  if (promoCodes[code]) {
    promoDiscount = promoCodes[code];
    closeModal('promoModal');
    showNotification(`🎉 Promo code "${code}" applied! ${promoDiscount}% discount activated.`, 'success');
    calculateTotal();
    document.getElementById('promoCode').value = '';
  } else {
    showNotification('❌ Invalid promo code', 'error');
    document.getElementById('promoCode').value = '';
  }
}

// ===== SETTINGS =====
function openSettings() {
  document.getElementById('settingTable').value = document.getElementById('tableNumber').textContent;
  document.getElementById('settingGuests').value = document.getElementById('guestCount').textContent;
  openModal('settingsModal');
}

function saveSettings() {
  const table = document.getElementById('settingTable').value;
  const guests = document.getElementById('settingGuests').value;
  const restaurant = document.getElementById('settingRestaurant').value;

  if (table < 1 || table > 50) {
    showNotification('⚠️ Table number must be between 1 and 50', 'warning');
    return;
  }

  if (guests < 1 || guests > 20) {
    showNotification('⚠️ Guest count must be between 1 and 20', 'warning');
    return;
  }

  document.getElementById('tableNumber').textContent = table;
  document.getElementById('guestCount').textContent = guests;
  document.querySelector('.logo h1').textContent = `🍽️ ${restaurant}`;

  closeModal('settingsModal');
  showNotification('✅ Settings saved successfully', 'success');
}

// ===== MODALS =====
function openModal(modalId) {
  document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('show');
}

function toggleOrderPanel() {
  const panel = document.querySelector('.order-panel');
  panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'success') {
  const notif = document.getElementById('notification');
  notif.textContent = message;
  notif.className = `notification show ${type}`;

  setTimeout(() => {
    notif.classList.remove('show');
  }, 4000);
}

// ===== STORAGE =====
function saveCart() {
  localStorage.setItem('smartTableCart', JSON.stringify(cart));
  localStorage.setItem('promoDiscount', promoDiscount);
}

function loadCart() {
  const savedCart = localStorage.getItem('smartTableCart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
      promoDiscount = parseInt(localStorage.getItem('promoDiscount')) || 0;
      updateCart();
    } catch (e) {
      console.log('Error loading cart:', e);
    }
  }
}
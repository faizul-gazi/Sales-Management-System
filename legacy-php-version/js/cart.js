let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const container = document.querySelector('.cart-items');
    const subtotal = document.getElementById('subtotal');
    const total = document.getElementById('total');
    
    container.innerHTML = '';
    
    if (cartItems.length === 0) {
        container.innerHTML = '<p class="empty-message">Your cart is empty</p>';
        subtotal.textContent = '0';
        total.textContent = '0';
        return;
    }

    let subtotalAmount = 0;
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.dataset.id = item.id;
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="cart-item-price">৳${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn minus-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <input type="number" class="quantity" value="${item.quantity}" min="1" readonly>
                <button class="quantity-btn plus-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(itemElement);
        subtotalAmount += item.price * item.quantity;
    });

    subtotal.textContent = subtotalAmount.toFixed(2);
    updateTotal();
}

function updateQuantity(id, change) {
    const index = cartItems.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
        if (typeof change === 'number') {
            cartItems[index].quantity = Math.max(1, cartItems[index].quantity + change);
        } else {
            cartItems[index].quantity = Math.max(1, parseInt(change));
        }
        
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
    }
}

function removeFromCart(id) {
    const index = cartItems.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
        updateCartCount();
        showToast('Item removed from cart');
    }
}

function updateTotal() {
    const subtotalAmount = parseFloat(document.getElementById('subtotal').textContent);
    const deliveryCharge = parseFloat(document.getElementById('delivery-charge').textContent);
    const total = document.getElementById('total');
    
    total.textContent = (subtotalAmount + deliveryCharge).toFixed(2);
}

function updateDeliveryCharge() {
    const deliveryCharge = document.getElementById('delivery-charge');
    const isInsideDhaka = document.querySelector('input[name="delivery"]:checked').value === 'inside';
    
    deliveryCharge.textContent = isInsideDhaka ? '60' : '110';
    updateTotal();
}

function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function submitOrder(event) {
    event.preventDefault();
    
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        showToast('Your cart is empty!', 'error');
        return false;
    }

    // Get form data
    const form = document.getElementById('orderForm');
    
    // Validate required fields
    if (!form.name.value || !form.phone.value || !form.address.value) {
        showToast('Please fill in all required fields', 'error');
        return false;
    }

    const formData = new FormData(form);
    
    // Add cart items and totals to form data
    formData.append('cart_items', JSON.stringify(cartItems));
    formData.append('subtotal', document.getElementById('subtotal').textContent);
    formData.append('delivery_charge', document.getElementById('delivery-charge').textContent);
    formData.append('total', document.getElementById('total').textContent);

    // Show loading state
    const submitBtn = document.getElementById('submitOrderBtn');
    if (!submitBtn) {
        console.error('Submit button not found');
        return false;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    // Submit order
    fetch('../php/submit_order.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
        if (data.success) {
            // Store order details for confirmation page
            const orderDetails = {
                orderId: data.orderId, // Make sure this is returned from PHP
                name: form.name.value,
                phone: form.phone.value,
                email: form.email.value,
                address: form.address.value,
                delivery: form.delivery.value,
                items: cartItems,
                subtotal: document.getElementById('subtotal').textContent,
                deliveryCharge: document.getElementById('delivery-charge').textContent,
                total: document.getElementById('total').textContent
            };
            localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
            
            showToast(data.message, 'success');
            localStorage.removeItem('cart');
            setTimeout(() => {
                window.location.href = 'order-confirmation.html';
            }, 1000);
        } else {
            showToast(data.message || 'Error placing order', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error submitting order. Please try again.', 'error');
    })
    .finally(() => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Place Order';
    });

    return false;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Add event listener for delete buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.remove-btn')) {
        const cartItem = e.target.closest('.cart-item');
        const itemId = cartItem.querySelector('.quantity-controls input').getAttribute('onchange').split("'")[1];
        removeFromCart(itemId);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
    
    // Add event listeners for delivery options
    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener('change', updateDeliveryCharge);
    });
}); 
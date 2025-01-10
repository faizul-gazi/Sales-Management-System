// Check if user is logged in
function checkAuth() {
    if (!localStorage.getItem('admin_logged_in') && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const form = document.getElementById('adminLoginForm');
    const formData = new FormData(form);
    
    fetch('../php/admin_auth.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('admin_logged_in', 'true');
            window.location.href = 'dashboard.html';
        } else {
            showToast(data.message || 'Login failed', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Login failed', 'error');
    });
    
    return false;
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('admin_logged_in');
    window.location.href = 'login.html';
}

// Load dashboard data
function loadDashboardData() {
    fetch('../php/admin_data.php?action=dashboard_stats')
        .then(response => response.json())
        .then(data => {
            updateDashboardStats(data);
            createEarningsChart(data.monthly_earnings);
            createLocationChart(data.location_stats);
            loadRecentOrders();
        });
}

// Update dashboard statistics
function updateDashboardStats(data) {
    document.getElementById('totalOrders').textContent = data.total_orders;
    document.getElementById('totalEarnings').textContent = '৳' + data.total_earnings;
    document.getElementById('pendingOrders').textContent = data.pending_orders;
    document.getElementById('completedOrders').textContent = data.completed_orders;
}

// Create earnings chart
function createEarningsChart(data) {
    const ctx = document.getElementById('earningsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => item.month),
            datasets: [{
                label: 'Monthly Earnings',
                data: data.map(item => item.total),
                borderColor: '#3498db',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Create location distribution chart
function createLocationChart(data) {
    const ctx = document.getElementById('locationChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.map(item => item.delivery_location === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'),
            datasets: [{
                data: data.map(item => item.count),
                backgroundColor: ['#3498db', '#2ecc71']
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Load orders data
function loadOrders() {
    fetch('../php/admin_data.php?action=all_orders')
        .then(response => response.json())
        .then(data => {
            displayOrders(data.orders);
        });
}

// Display orders in table
function displayOrders(orders) {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer_name}</td>
            <td>${order.phone}</td>
            <td>${order.address}</td>
            <td>৳${order.total_amount}</td>
            <td>
                <span class="status-badge status-${order.status}">
                    ${order.status}
                </span>
            </td>
            <td>${order.delivery_location}</td>
            <td>${new Date(order.order_date).toLocaleDateString()}</td>
            <td>
                ${order.status === 'pending' ? 
                    `<button onclick="completeOrder(${order.id})" class="action-btn complete-btn">
                        Complete
                    </button>` : 
                    ''
                }
            </td>
        </tr>
    `).join('');
}

// Complete order
function completeOrder(orderId) {
    const formData = new FormData();
    formData.append('order_id', orderId);
    
    fetch('../php/admin_data.php?action=complete_order', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadOrders();
            showToast('Order marked as completed');
        }
    });
}

// Load messages
function loadMessages() {
    fetch('../php/admin_data.php?action=messages')
        .then(response => response.json())
        .then(data => {
            displayMessages(data.messages);
        });
}

// Display messages
function displayMessages(messages) {
    const container = document.getElementById('messagesList');
    container.innerHTML = messages.map(message => `
        <div class="message-card">
            <div class="message-header">
                <div class="message-info">
                    <span><i class="fas fa-user"></i> ${message.name}</span>
                    <span><i class="fas fa-phone"></i> ${message.phone}</span>
                    <span><i class="fas fa-envelope"></i> ${message.email || 'N/A'}</span>
                </div>
                <div class="message-date">
                    ${new Date(message.created_at).toLocaleString()}
                </div>
            </div>
            <div class="message-content">
                ${message.message}
            </div>
        </div>
    `).join('');
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Load appropriate data based on current page
    if (window.location.href.includes('dashboard.html')) {
        loadDashboardData();
    } else if (window.location.href.includes('orders.html')) {
        loadOrders();
    } else if (window.location.href.includes('messages.html')) {
        loadMessages();
    }
});

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
} 
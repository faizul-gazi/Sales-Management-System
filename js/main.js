// Updated product data with real image URLs
const products = [
    {
        id: 1,
        name: "Sony WH-1000XM4 Wireless Headphones",
        price: 29999,
        image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
        category: "headphones",
        rating: 4.8,
        isNew: true,
        description: "Industry-leading noise cancellation with Dual Noise Sensor technology",
        specifications: {
            color: "Black",
            connectivity: "Bluetooth 5.0",
            batteryLife: "30 hours",
            warranty: "1 year",
            weight: "254g"
        },
        reviews: [
            {
                user: "John D.",
                rating: 5,
                comment: "Amazing sound quality and noise cancellation!",
                date: "2024-02-15"
            },
            {
                user: "Sarah M.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-10"
            }
        ]
    },
    {
        id: 2,
        name: "Apple AirPods Pro",
        price: 24999,
        image: "https://m.media-amazon.com/images/I/71bhWgQK-cL._AC_SL1500_.jpg",
        category: "earbuds",
        rating: 4.7,
        isNew: true,
        description: "Active Noise Cancellation for immersive sound",
        specifications: {
            color: "White",
            connectivity: "Bluetooth 5.0",
            batteryLife: "24 hours",
            warranty: "1 year",
            weight: "183g"
        },
        reviews: [
            {
                user: "Emily R.",
                rating: 5,
                comment: "Excellent noise cancellation and sound quality!",
                date: "2024-02-12"
            },
            {
                user: "Michael S.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-08"
            }
        ]
    },
    {
        id: 3,
        name: "Samsung Galaxy Watch 5",
        price: 27999,
        image: "https://m.media-amazon.com/images/I/61aVQDazNHL._AC_SL1500_.jpg",
        category: "smartwatch",
        rating: 4.6,
        isNew: true,
        description: "Advanced health monitoring with elegant design",
        specifications: {
            color: "Silver",
            connectivity: "Bluetooth 5.0",
            batteryLife: "36 hours",
            warranty: "1 year",
            weight: "36.5g"
        },
        reviews: [
            {
                user: "Olivia T.",
                rating: 5,
                comment: "Excellent health monitoring and design!",
                date: "2024-02-10"
            },
            {
                user: "James K.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-05"
            }
        ]
    },
    {
        id: 4,
        name: "Anker PowerCore 26800mAh",
        price: 4999,
        image: "https://m.media-amazon.com/images/I/61pBvlYz5FL._AC_SL1500_.jpg",
        category: "powerbank",
        rating: 4.5,
        description: "High-capacity portable charger with 3 USB ports",
        specifications: {
            color: "Black",
            connectivity: "USB-C",
            batteryLife: "18 months",
            warranty: "1 year",
            weight: "216g"
        },
        reviews: [
            {
                user: "Sophia L.",
                rating: 5,
                comment: "Excellent battery life and fast charging!",
                date: "2024-02-08"
            },
            {
                user: "Ethan H.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-03"
            }
        ]
    },
    {
        id: 5,
        name: "Apple Watch Series 8",
        price: 45999,
        image: "https://m.media-amazon.com/images/I/71XMTLtZd5L._AC_SL1500_.jpg",
        category: "smartwatch",
        upcoming: true,
        rating: 4.9,
        description: "Advanced health features with Always-On Retina display",
        specifications: {
            color: "Silver",
            connectivity: "Bluetooth 5.0",
            batteryLife: "18 hours",
            warranty: "1 year",
            weight: "36.5g"
        },
        reviews: [
            {
                user: "Ava M.",
                rating: 5,
                comment: "Excellent health features and design!",
                date: "2024-02-07"
            },
            {
                user: "Noah P.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-02"
            }
        ]
    },
    {
        id: 6,
        name: "Google Pixel Buds Pro",
        price: 19999,
        image: "https://m.media-amazon.com/images/I/61PnHlc0HCL._AC_SL1500_.jpg",
        category: "earbuds",
        rating: 4.4,
        description: "Premium sound quality with Active Noise Cancellation",
        specifications: {
            color: "Black",
            connectivity: "Bluetooth 5.0",
            batteryLife: "24 hours",
            warranty: "1 year",
            weight: "183g"
        },
        reviews: [
            {
                user: "Isabella R.",
                rating: 5,
                comment: "Excellent sound quality and noise cancellation!",
                date: "2024-02-06"
            },
            {
                user: "Mason S.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-01"
            }
        ]
    },
    {
        id: 7,
        name: "Samsung Galaxy Buds2 Pro",
        price: 18999,
        image: "https://m.media-amazon.com/images/I/51j1kKqYHqL._AC_SL1500_.jpg",
        category: "earbuds",
        upcoming: true,
        rating: 4.6,
        description: "Intelligent Active Noise Cancellation with premium sound",
        specifications: {
            color: "Black",
            connectivity: "Bluetooth 5.0",
            batteryLife: "24 hours",
            warranty: "1 year",
            weight: "183g"
        },
        reviews: [
            {
                user: "Ava M.",
                rating: 5,
                comment: "Excellent sound quality and noise cancellation!",
                date: "2024-02-06"
            },
            {
                user: "Mason S.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-01"
            }
        ]
    },
    {
        id: 8,
        name: "Mi Power Bank 20000mAh",
        price: 2999,
        image: "https://m.media-amazon.com/images/I/71lVwl3q-kL._AC_SL1500_.jpg",
        category: "powerbank",
        rating: 4.3,
        description: "Fast charging power bank with dual USB ports",
        specifications: {
            color: "Black",
            connectivity: "USB-C",
            batteryLife: "18 months",
            warranty: "1 year",
            weight: "216g"
        },
        reviews: [
            {
                user: "Sophia L.",
                rating: 5,
                comment: "Excellent battery life and fast charging!",
                date: "2024-02-08"
            },
            {
                user: "Ethan H.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-03"
            }
        ]
    },
    {
        id: 9,
        name: "Bose QuietComfort 45",
        price: 32999,
        image: "https://m.media-amazon.com/images/I/51JbsHSktkL._AC_SL1500_.jpg",
        category: "headphones",
        rating: 4.7,
        description: "World-class noise cancellation with premium comfort",
        specifications: {
            color: "Black",
            connectivity: "Bluetooth 5.0",
            batteryLife: "20 hours",
            warranty: "1 year",
            weight: "254g"
        },
        reviews: [
            {
                user: "Emma W.",
                rating: 5,
                comment: "Excellent noise cancellation and comfort!",
                date: "2024-02-09"
            },
            {
                user: "Liam H.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-04"
            }
        ]
    },
    {
        id: 10,
        name: "Nothing Ear (2)",
        price: 14999,
        image: "https://m.media-amazon.com/images/I/61WY2tV2C2L._AC_SL1500_.jpg",
        category: "earbuds",
        isNew: true,
        rating: 4.5,
        description: "Hi-Res Audio Certified with Dual Connection",
        specifications: {
            color: "White",
            connectivity: "Bluetooth 5.0",
            batteryLife: "24 hours",
            warranty: "1 year",
            weight: "183g"
        },
        reviews: [
            {
                user: "Ava M.",
                rating: 5,
                comment: "Excellent sound quality and noise cancellation!",
                date: "2024-02-06"
            },
            {
                user: "Mason S.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-01"
            }
        ]
    },
    {
        id: 11,
        name: "Garmin Venu 2 Plus",
        price: 39999,
        image: "https://m.media-amazon.com/images/I/71SN8i4-fIL._AC_SL1500_.jpg",
        category: "smartwatch",
        rating: 4.8,
        description: "Advanced fitness tracking with built-in GPS",
        specifications: {
            color: "Silver",
            connectivity: "Bluetooth 5.0",
            batteryLife: "36 hours",
            warranty: "1 year",
            weight: "36.5g"
        },
        reviews: [
            {
                user: "Olivia T.",
                rating: 5,
                comment: "Excellent health monitoring and design!",
                date: "2024-02-10"
            },
            {
                user: "James K.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-05"
            }
        ]
    },
    {
        id: 12,
        name: "ROMOSS 30000mAh Power Bank",
        price: 3999,
        image: "https://m.media-amazon.com/images/I/71EMi-0ZOEL._AC_SL1500_.jpg",
        category: "powerbank",
        isNew: true,
        rating: 4.4,
        description: "30W PD Fast Charging with LED Display",
        specifications: {
            color: "Black",
            connectivity: "USB-C",
            batteryLife: "18 months",
            warranty: "1 year",
            weight: "216g"
        },
        reviews: [
            {
                user: "Sophia L.",
                rating: 5,
                comment: "Excellent battery life and fast charging!",
                date: "2024-02-08"
            },
            {
                user: "Ethan H.",
                rating: 4,
                comment: "Great battery life, comfortable for long use.",
                date: "2024-02-03"
            }
        ]
    }
];

// Add these products to your existing products array
const additionalProducts = [
    {
        id: 13,
        name: "JBL Tune 760NC Headphones",
        price: 12999,
        image: "https://m.media-amazon.com/images/I/61HXCeozUjL._AC_SL1500_.jpg",
        category: "headphones",
        rating: 4.5,
        isNew: true,
        description: "Active Noise Cancelling headphones with deep bass",
        specifications: {
            color: "Black",
            connectivity: "Bluetooth 5.0",
            batteryLife: "35 hours",
            warranty: "1 year",
            weight: "220g"
        },
        brand: "jbl"
    },
    {
        id: 14,
        name: "OnePlus Buds Pro 2",
        price: 16999,
        image: "https://m.media-amazon.com/images/I/61nScEBtJhL._AC_SL1500_.jpg",
        category: "earbuds",
        rating: 4.6,
        isNew: true,
        description: "Spatial Audio with Dynamic Head Tracking",
        specifications: {
            color: "Obsidian Black",
            connectivity: "Bluetooth 5.3",
            batteryLife: "25 hours",
            warranty: "1 year",
            weight: "4.9g"
        },
        brand: "oneplus"
    },
    {
        id: 15,
        name: "Huawei Watch GT 3 Pro",
        price: 32999,
        image: "https://m.media-amazon.com/images/I/61YVqHdFRxL._AC_SL1500_.jpg",
        category: "smartwatch",
        rating: 4.7,
        description: "Premium design with comprehensive health monitoring",
        specifications: {
            color: "Titanium Gray",
            connectivity: "Bluetooth 5.2",
            batteryLife: "14 days",
            warranty: "1 year",
            weight: "54g"
        },
        brand: "huawei"
    },
    {
        id: 16,
        name: "Baseus 65W Power Bank",
        price: 5999,
        image: "https://m.media-amazon.com/images/I/71BkL4RhvmL._AC_SL1500_.jpg",
        category: "powerbank",
        rating: 4.6,
        isNew: true,
        description: "20000mAh with PD Fast Charging",
        specifications: {
            color: "Black",
            capacity: "20000mAh",
            ports: "3 USB",
            warranty: "1 year",
            weight: "439g"
        },
        brand: "baseus"
    },
    {
        id: 17,
        name: "Jabra Elite 85h",
        price: 24999,
        image: "https://m.media-amazon.com/images/I/61ZDwiW1CxL._AC_SL1500_.jpg",
        category: "headphones",
        rating: 4.4,
        description: "SmartSound Audio with Advanced ANC",
        specifications: {
            color: "Titanium Black",
            connectivity: "Bluetooth 5.0",
            batteryLife: "36 hours",
            warranty: "2 years",
            weight: "296g"
        },
        brand: "jabra"
    },
    {
        id: 18,
        name: "Xiaomi Redmi Watch 3",
        price: 8999,
        image: "https://m.media-amazon.com/images/I/61SOib7YdLL._AC_SL1500_.jpg",
        category: "smartwatch",
        rating: 4.3,
        isNew: true,
        description: "1.75\" AMOLED Display with GPS",
        specifications: {
            color: "Black",
            connectivity: "Bluetooth 5.2",
            batteryLife: "12 days",
            warranty: "1 year",
            weight: "37g"
        },
        brand: "xiaomi"
    },
    {
        id: 19,
        name: "Soundcore Liberty Air 2 Pro",
        price: 9999,
        image: "https://m.media-amazon.com/images/I/61J6+xcVexL._AC_SL1500_.jpg",
        category: "earbuds",
        rating: 4.5,
        description: "Targeted Active Noise Cancellation",
        specifications: {
            color: "Onyx Black",
            connectivity: "Bluetooth 5.0",
            batteryLife: "26 hours",
            warranty: "1.5 years",
            weight: "5.2g"
        },
        brand: "soundcore"
    },
    {
        id: 20,
        name: "UGREEN 145W Power Bank",
        price: 7999,
        image: "https://m.media-amazon.com/images/I/71MkFRb+hpL._AC_SL1500_.jpg",
        category: "powerbank",
        rating: 4.7,
        isNew: true,
        description: "25000mAh with LED Display",
        specifications: {
            color: "Black",
            capacity: "25000mAh",
            ports: "4 USB",
            warranty: "1.5 years",
            weight: "485g"
        },
        brand: "ugreen"
    },
    {
        id: 21,
        name: "Fitbit Sense 2",
        price: 29999,
        image: "https://m.media-amazon.com/images/I/71J8VhpsPBL._AC_SL1500_.jpg",
        category: "smartwatch",
        rating: 4.4,
        description: "Advanced Health Metrics with ECG App",
        specifications: {
            color: "Graphite",
            connectivity: "Bluetooth 5.0",
            batteryLife: "6+ days",
            warranty: "1 year",
            weight: "37.6g"
        },
        brand: "fitbit"
    },
    {
        id: 22,
        name: "Sennheiser HD 450BT",
        price: 14999,
        image: "https://m.media-amazon.com/images/I/71p1vhsqjWL._AC_SL1500_.jpg",
        category: "headphones",
        rating: 4.6,
        description: "Active Noise Cancellation with Deep Bass",
        specifications: {
            color: "Black",
            connectivity: "Bluetooth 5.0",
            batteryLife: "30 hours",
            warranty: "2 years",
            weight: "238g"
        },
        brand: "sennheiser"
    }
];

// Add reviews to all additional products
additionalProducts.forEach(product => {
    product.reviews = [
        {
            user: "Alex M.",
            rating: 5,
            comment: `Excellent quality ${product.category}! Highly recommended.`,
            date: "2024-02-20"
        },
        {
            user: "Emma S.",
            rating: 4,
            comment: "Great value for money, very satisfied with the purchase.",
            date: "2024-02-18"
        }
    ];
});

// Add these products to your existing products array
products.push(...additionalProducts);

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Toast notification system
function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Add icon based on type
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle"></i>';
            break;
    }
    
    toast.innerHTML = `${icon}<span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Remove old toasts if there are too many
    const toasts = toastContainer.querySelectorAll('.toast');
    if (toasts.length > 3) {
        toasts[0].remove();
    }

    // Auto remove toast
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Example usage:
// showToast('Success message', 'success');
// showToast('Error message', 'error');
// showToast('Warning message', 'warning');
// showToast('Info message', 'info');

// Update all your existing showToast calls to use the new types
function showSuccessToast(message) {
    showToast(message, 'success');
}

function showErrorToast(message) {
    showToast(message, 'error');
}

function showWarningToast(message) {
    showToast(message, 'warning');
}

function showInfoToast(message) {
    showToast(message, 'info');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('.cart-count').textContent = cart.length;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({...product, quantity: 1});
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCounts();
        showToast(`${product.name} added to cart`, 'success');
    }
}

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (wishlist.some(item => item.id === productId)) {
            showToast('Product is already in your wishlist', 'info');
            return;
        }
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateCounts();
        showToast(`${product.name} added to wishlist`, 'success');
    }
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderProducts();
});

function renderProducts() {
    const productGrids = document.querySelectorAll('.product-grid');
    
    productGrids.forEach(grid => {
        const section = grid.parentElement.className;
        let productsToShow = [];
        
        switch(section) {
            case 'upcoming-products':
                productsToShow = products.filter(p => p.upcoming);
                break;
            case 'new-arrivals':
                productsToShow = products.filter(p => p.isNew);
                break;
            case 'top-rated':
                productsToShow = products.sort((a, b) => b.rating - a.rating).slice(0, 4);
                break;
            case 'all-products':
                productsToShow = products;
                break;
        }
        
        grid.innerHTML = productsToShow.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-badges">
                    ${product.isNew ? '<span class="badge new">New</span>' : ''}
                    ${product.upcoming ? '<span class="badge upcoming">Upcoming</span>' : ''}
                </div>
                <div class="product-image-container">
                    <img 
                        src="${product.image}" 
                        alt="${product.name}" 
                        class="product-image"
                        onerror="handleImageError(this)"
                    >
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3>${product.name}</h3>
                    <div class="rating">
                        ${generateStarRating(product.rating)}
                        <span class="rating-number">(${product.rating})</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">৳${product.price.toLocaleString()}</p>
                    <div class="product-buttons">
                        <button onclick="handleAddToCart(event, ${product.id})" class="add-to-cart">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button onclick="handleAddToWishlist(event, ${product.id})" class="add-to-wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    });
}

// Helper function to generate star rating
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Add this function to handle image loading errors
function handleImageError(img) {
    const fallbackImages = {
        headphones: 'https://m.media-amazon.com/images/I/61QUY1oiqPL._AC_SL1500_.jpg',
        earbuds: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg',
        smartwatch: 'https://m.media-amazon.com/images/I/71XMTLtZd5L._AC_SL1500_.jpg',
        powerbank: 'https://m.media-amazon.com/images/I/71lVwl3q-kL._AC_SL1500_.jpg'
    };
    
    const category = img.closest('.product-card').dataset.category;
    img.src = fallbackImages[category];
}

// Add this function to show product details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'product-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="product-details">
                <div class="product-details-left">
                    <div class="product-image-large">
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='${getFallbackImage(product.category)}'">
                    </div>
                    <div class="product-actions">
                        <button onclick="addToCart(${product.id})" class="add-to-cart">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button onclick="addToWishlist(${product.id})" class="add-to-wishlist">
                            <i class="fas fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
                <div class="product-details-right">
                    <h2>${product.name}</h2>
                    <div class="rating">
                        ${generateStarRating(product.rating)}
                        <span class="rating-number">(${product.rating})</span>
                    </div>
                    <p class="product-price">৳${product.price.toLocaleString()}</p>
                    
                    <div class="product-tabs">
                        <div class="tab-buttons">
                            <button class="tab-btn active" data-tab="description">Description</button>
                            <button class="tab-btn" data-tab="specifications">Specifications</button>
                            <button class="tab-btn" data-tab="reviews">Reviews</button>
                        </div>
                        
                        <div class="tab-content active" id="description">
                            <p>${product.description}</p>
                        </div>
                        
                        <div class="tab-content" id="specifications">
                            ${Object.entries(product.specifications).map(([key, value]) => `
                                <div class="spec-item">
                                    <span class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                    <span class="spec-value">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="tab-content" id="reviews">
                            ${product.reviews ? product.reviews.map(review => `
                                <div class="review-item">
                                    <div class="review-header">
                                        <span class="review-user">${review.user}</span>
                                        <div class="review-rating">
                                            ${generateStarRating(review.rating)}
                                        </div>
                                        <span class="review-date">${review.date}</span>
                                    </div>
                                    <p class="review-comment">${review.comment}</p>
                                </div>
                            `).join('') : '<p>No reviews yet</p>'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Handle tabs
    const tabButtons = modal.querySelectorAll('.tab-btn');
    const tabContents = modal.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            modal.querySelector(`#${tab}`).classList.add('active');
        });
    });

    // Close modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Helper function for fallback images
function getFallbackImage(category) {
    const fallbacks = {
        headphones: 'https://m.media-amazon.com/images/I/61QUY1oiqPL._AC_SL1500_.jpg',
        earbuds: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg',
        smartwatch: 'https://m.media-amazon.com/images/I/71XMTLtZd5L._AC_SL1500_.jpg',
        powerbank: 'https://m.media-amazon.com/images/I/71lVwl3q-kL._AC_SL1500_.jpg'
    };
    return fallbacks[category];
}

// Add this function to update both cart and wishlist counts
function updateCounts() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    document.querySelector('.cart-count').textContent = cart.length;
    document.querySelector('.wishlist-count').textContent = wishlist.length;
}

// Initialize counts on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCounts();
    renderProducts();
});

// Add these new handler functions
function handleAddToCart(event, productId) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(productId);
}

function handleAddToWishlist(event, productId) {
    event.preventDefault();
    event.stopPropagation();
    addToWishlist(productId);
}

// Add this function
function goToProduct(productId) {
    const baseUrl = window.location.pathname.includes('pages') ? '' : 'pages/';
    window.location.href = `${baseUrl}product.html?id=${productId}`;
}

// Update your product card creation to include onclick
function createProductCard(product) {
    return `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <!-- Rest of your product card HTML -->
        </div>
    `;
} 
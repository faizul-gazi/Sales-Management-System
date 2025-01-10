// Shop page functionality
let filteredProducts = [...products];
const productGrid = document.querySelector('.product-grid');
const sortSelect = document.getElementById('sortProducts');
const priceRange = document.getElementById('priceRange');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const applyFiltersBtn = document.querySelector('.apply-filters');

// Initialize price range
const prices = products.map(p => p.price);
const maxPrice = Math.max(...prices);
priceRange.max = maxPrice;
maxPriceInput.placeholder = `${maxPrice}`;

// Sort products
function sortProducts(products, sortBy) {
    switch(sortBy) {
        case 'price-low':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-high':
            return [...products].sort((a, b) => b.price - a.price);
        case 'rating':
            return [...products].sort((a, b) => b.rating - a.rating);
        default:
            return products;
    }
}

// Filter products
function filterProducts() {
    const selectedCategories = [...document.querySelectorAll('input[name="category"]:checked')]
        .map(input => input.value);
    
    const selectedBrands = [...document.querySelectorAll('input[name="brand"]:checked')]
        .map(input => input.value);
    
    const minPrice = Number(minPriceInput.value) || 0;
    const maxPrice = Number(maxPriceInput.value) || Number(priceRange.max);

    filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        
        return categoryMatch && brandMatch && priceMatch;
    });

    const sortBy = sortSelect.value;
    filteredProducts = sortProducts(filteredProducts, sortBy);
    
    renderProducts();
}

// Update price inputs when range changes
priceRange.addEventListener('input', (e) => {
    maxPriceInput.value = e.target.value;
    filterProducts(); // Apply filter immediately when sliding
});

// Event listeners
sortSelect.addEventListener('change', filterProducts);
applyFiltersBtn.addEventListener('click', filterProducts);

// Update the renderProducts function for the shop page
function renderProducts() {
    const productsToShow = filteredProducts;
    
    productGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-category="${product.category}" onclick="showProductDetails(${product.id})">
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
                <div class="product-buttons" onclick="event.stopPropagation()">
                    <button onclick="addToCart(${product.id})" class="add-to-cart">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button onclick="addToWishlist(${product.id})" class="add-to-wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Update product count
    const productCount = document.querySelector('.shop-header h2');
    productCount.textContent = `All Products (${productsToShow.length})`;
}

// Add brand property to products in main.js
products.forEach(product => {
    switch(product.category) {
        case 'headphones':
            if (product.name.includes('Sony')) product.brand = 'sony';
            else if (product.name.includes('Bose')) product.brand = 'bose';
            break;
        case 'earbuds':
            if (product.name.includes('Apple')) product.brand = 'apple';
            else if (product.name.includes('Samsung')) product.brand = 'samsung';
            break;
        case 'smartwatch':
            if (product.name.includes('Apple')) product.brand = 'apple';
            else if (product.name.includes('Samsung')) product.brand = 'samsung';
            break;
        case 'powerbank':
            if (product.name.includes('Anker')) product.brand = 'anker';
            break;
    }
});

// Add input event listeners for min/max price inputs
minPriceInput.addEventListener('input', filterProducts);
maxPriceInput.addEventListener('input', filterProducts);

// Initialize the shop page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial max price
    maxPriceInput.value = maxPrice;
    // Initial render
    filterProducts();
}); 
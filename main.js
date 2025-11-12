// ========================================
// Sahib Jewellers - Main JavaScript
// ========================================

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateCartCount();
    loadUserSession();
});

// Initialize application
function initializeApp() {
    // Initialize localStorage data if not exists
    if (!localStorage.getItem('products')) {
        initializeProducts();
    }
    if (!localStorage.getItem('users')) {
        initializeUsers();
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Initialize default products
function initializeProducts() {
    const defaultProducts = [
        {
            id: 1,
            name: 'Classic Gold Ring',
            category: 'Rings',
            description: 'Elegant 24K gold ring with intricate design',
            price: 25000,
            image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500',
            stock: 10,
            metalType: 'Gold'
        },
        {
            id: 2,
            name: 'Diamond Necklace',
            category: 'Necklaces',
            description: 'Stunning diamond necklace with premium craftsmanship',
            price: 150000,
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
            stock: 5,
            metalType: 'Gold'
        },
        {
            id: 3,
            name: 'Pearl Earrings',
            category: 'Earrings',
            description: 'Beautiful pearl earrings for special occasions',
            price: 18000,
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
            stock: 15,
            metalType: 'Silver'
        },
        {
            id: 4,
            name: 'Gold Bangles Set',
            category: 'Bangles',
            description: 'Traditional gold bangles set with intricate patterns',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500',
            stock: 8,
            metalType: 'Gold'
        },
        {
            id: 5,
            name: 'Luxury Watch',
            category: 'Watches',
            description: 'Premium luxury watch with gold case',
            price: 75000,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            stock: 12,
            metalType: 'Gold'
        },
        {
            id: 6,
            name: 'Diamond Ring',
            category: 'Rings',
            description: 'Exquisite diamond ring with gold band',
            price: 95000,
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
            stock: 7,
            metalType: 'Gold'
        }
    ];
    localStorage.setItem('products', JSON.stringify(defaultProducts));
}

// Initialize default users (admin)
function initializeUsers() {
    const defaultUsers = [
        {
            id: 1,
            username: 'admin',
            email: 'admin@sahibjewellers.com',
            password: 'admin123',
            role: 'admin',
            name: 'Admin User'
        }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        element.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Load user session
function loadUserSession() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
        // Update UI to show logged in user
        const userElements = document.querySelectorAll('.user-name');
        userElements.forEach(element => {
            element.textContent = user.name || user.username;
        });
        
        // Update navbar login/logout links
        updateNavbarUserStatus(user);
    } else {
        // Show login link if not logged in
        updateNavbarUserStatus(null);
    }
}

// Update navbar based on user login status
function updateNavbarUserStatus(user) {
    const loginLinks = document.querySelectorAll('nav .nav-links a[href="login.html"]');
    
    loginLinks.forEach(link => {
        if (user) {
            // User is logged in - show user name and logout
            link.textContent = user.name || user.username;
            link.href = '#';
            link.onclick = function(e) {
                e.preventDefault();
                logout();
            };
            link.style.color = 'var(--gold)';
            link.style.fontWeight = '600';
            link.style.cursor = 'pointer';
        } else {
            // User is not logged in - show login link
            link.textContent = 'Login';
            link.href = 'login.html';
            link.onclick = null;
            link.style.color = '';
            link.style.fontWeight = '';
            link.style.cursor = '';
        }
    });
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        updateNavbarUserStatus(null);
        showAlert('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
}

// Filter products
function filterProducts() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const categoryFilter = document.getElementById('categoryFilter')?.value;
    const metalFilter = document.getElementById('metalFilter')?.value;
    const priceMin = parseFloat(document.getElementById('priceMin')?.value) || 0;
    const priceMax = parseFloat(document.getElementById('priceMax')?.value) || Infinity;
    const sortBy = document.getElementById('sortBy')?.value || 'name';
    const searchQuery = new URLSearchParams(window.location.search).get('search') || '';

    let filtered = products;

    // Search filter
    if (searchQuery) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Category filter
    if (categoryFilter && categoryFilter !== 'all') {
        filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Metal filter
    if (metalFilter && metalFilter !== 'all') {
        filtered = filtered.filter(product => product.metalType === metalFilter);
    }

    // Price filter
    filtered = filtered.filter(product => 
        product.price >= priceMin && product.price <= priceMax
    );

    // Sort
    filtered.sort((a, b) => {
        switch(sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    return filtered;
}

// Display products
function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">No products found.</p>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/300x250?text=Jewelry'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">₹${product.price.toLocaleString()}</p>
                <a href="product.html?id=${product.id}" class="btn">View Details</a>
            </div>
        </div>
    `).join('');
}

// Get product by ID
function getProductById(id) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return products.find(p => p.id === parseInt(id));
}

// Get all products
function getAllProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}

// Format currency
function formatCurrency(amount) {
    return `₹${amount.toLocaleString()}`;
}

// Show alert message
function showAlert(message, type = 'success') {
    // Remove any existing alerts first
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 10000; min-width: 300px; max-width: 90%; padding: 1rem 2rem; border-radius: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); animation: slideDown 0.3s ease;';
    alertDiv.textContent = message;
    
    // Add animation style if not exists
    if (!document.getElementById('alertStyles')) {
        const style = document.createElement('style');
        style.id = 'alertStyles';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        alertDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 300);
    }, type === 'success' ? 3000 : 5000);
}

// Initialize search on page load
setupSearch();



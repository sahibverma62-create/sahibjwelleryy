// ========================================
// Sahib Jewellers - Admin Functions
// ========================================

// Check if user is admin
function checkAdminAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user || user.role !== 'admin') {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

// Admin login
function adminLogin(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const admin = users.find(u => 
        (u.username === username || u.email === username) && 
        u.password === password && 
        u.role === 'admin'
    );

    if (admin) {
        localStorage.setItem('currentUser', JSON.stringify(admin));
        return true;
    }
    return false;
}

// Admin logout
function adminLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'admin-login.html';
}

// Get dashboard stats
function getDashboardStats() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const totalRevenue = orders.reduce((sum, order) => {
        if (order.status === 'Completed') {
            return sum + order.total;
        }
        return sum;
    }, 0);

    return {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.filter(u => u.role !== 'admin').length,
        totalRevenue: totalRevenue
    };
}

// Display dashboard stats
function displayDashboardStats() {
    if (!checkAdminAuth()) return;

    const stats = getDashboardStats();
    
    document.getElementById('totalProducts').textContent = stats.totalProducts;
    document.getElementById('totalOrders').textContent = stats.totalOrders;
    document.getElementById('totalUsers').textContent = stats.totalUsers;
    document.getElementById('totalRevenue').textContent = formatCurrency(stats.totalRevenue);
}

// Add product
function addProduct(productData) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock)
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    return newProduct;
}

// Update product
function updateProduct(id, productData) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const index = products.findIndex(p => p.id === parseInt(id));
    
    if (index !== -1) {
        products[index] = {
            ...products[index],
            ...productData,
            id: parseInt(id),
            price: parseFloat(productData.price),
            stock: parseInt(productData.stock)
        };
        localStorage.setItem('products', JSON.stringify(products));
        return products[index];
    }
    return null;
}

// Delete product
function deleteProduct(id) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = products.filter(p => p.id !== parseInt(id));
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return updatedProducts;
}

// Display products in admin panel
function displayAdminProducts() {
    if (!checkAdminAuth()) return;

    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const productsTable = document.getElementById('productsTable');
    const productsBody = document.getElementById('productsBody');

    if (!productsBody) return;

    if (products.length === 0) {
        productsBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No products found.</td></tr>';
        return;
    }

    productsBody.innerHTML = products.map(product => `
        <tr>
            <td>
                <img src="${product.image}" alt="${product.name}" class="cart-item-image"
                     onerror="this.src='https://via.placeholder.com/80?text=Jewelry'">
            </td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.metalType}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProductConfirm(${product.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Edit product
function editProduct(id) {
    const product = getProductById(id);
    if (!product) {
        showAlert('Product not found', 'error');
        return;
    }

    // Fill form with product data
    const productIdInput = document.getElementById('productId');
    const productNameInput = document.getElementById('productName');
    const productCategoryInput = document.getElementById('productCategory');
    const productDescriptionInput = document.getElementById('productDescription');
    const productPriceInput = document.getElementById('productPrice');
    const productImageInput = document.getElementById('productImage');
    const productStockInput = document.getElementById('productStock');
    const productMetalTypeInput = document.getElementById('productMetalType');

    if (productIdInput) productIdInput.value = product.id;
    if (productNameInput) productNameInput.value = product.name;
    if (productCategoryInput) productCategoryInput.value = product.category;
    if (productDescriptionInput) productDescriptionInput.value = product.description;
    if (productPriceInput) productPriceInput.value = product.price;
    if (productImageInput) productImageInput.value = product.image;
    if (productStockInput) productStockInput.value = product.stock;
    if (productMetalTypeInput) productMetalTypeInput.value = product.metalType;

    // Change form title and submit button (try both h2 and h3)
    const formTitle = document.querySelector('#productForm h2') || document.querySelector('#productForm h3');
    if (formTitle) formTitle.textContent = 'Edit Product';
    
    const submitButton = document.querySelector('#productForm button[type="submit"]');
    if (submitButton) submitButton.textContent = 'Update Product';

    // Scroll to form
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Delete product confirmation
function deleteProductConfirm(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        deleteProduct(id);
        displayAdminProducts();
        showAlert('Product deleted successfully', 'success');
    }
}

// Save product (add or update)
function saveProduct(event) {
    event.preventDefault();
    
    if (!validateProductForm()) {
        return;
    }

    const productId = document.getElementById('productId').value;
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        price: document.getElementById('productPrice').value,
        image: document.getElementById('productImage').value,
        stock: document.getElementById('productStock').value,
        metalType: document.getElementById('productMetalType').value
    };

    if (productId) {
        updateProduct(productId, productData);
        showAlert('Product updated successfully', 'success');
    } else {
        addProduct(productData);
        showAlert('Product added successfully', 'success');
    }

    // Reset form
    const productForm = document.getElementById('productFormElement');
    if (productForm) {
        productForm.reset();
    }
    
    const productIdInput = document.getElementById('productId');
    if (productIdInput) productIdInput.value = '';
    
    // Reset form title (try both h2 and h3)
    const formTitle = document.querySelector('#productForm h2') || document.querySelector('#productForm h3');
    if (formTitle) formTitle.textContent = 'Add New Product';
    
    const submitButton = document.querySelector('#productForm button[type="submit"]');
    if (submitButton) submitButton.textContent = 'Add Product';

    displayAdminProducts();
}

// Display orders in admin panel
function displayAdminOrders() {
    if (!checkAdminAuth()) return;

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const ordersBody = document.getElementById('ordersBody');

    if (!ordersBody) return;

    if (orders.length === 0) {
        ordersBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No orders found.</td></tr>';
        return;
    }

    ordersBody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.customerEmail}</td>
            <td>${formatCurrency(order.total)}</td>
            <td>
                <select onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// Update order status
function updateOrderStatus(orderId, status) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === parseInt(orderId));
    
    if (order) {
        order.status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        displayAdminOrders();
        displayDashboardStats();
        showAlert('Order status updated', 'success');
    }
}

// Display users in admin panel
function displayAdminUsers() {
    if (!checkAdminAuth()) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const regularUsers = users.filter(u => u.role !== 'admin');
    const usersBody = document.getElementById('usersBody');

    if (!usersBody) return;

    if (regularUsers.length === 0) {
        usersBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No users found.</td></tr>';
        return;
    }

    usersBody.innerHTML = regularUsers.map(user => `
        <tr>
            <td>${user.name || user.username}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteUserConfirm(${user.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Delete user confirmation
function deleteUserConfirm(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.filter(u => u.id !== parseInt(id));
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        displayAdminUsers();
        displayDashboardStats();
        showAlert('User deleted successfully', 'success');
    }
}

// Initialize admin pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on an admin page (except login)
    if (window.location.pathname.includes('admin') && 
        !window.location.pathname.includes('admin-login.html')) {
        if (!checkAdminAuth()) return;
    }

    // Initialize specific admin pages
    if (document.getElementById('productsBody')) {
        displayAdminProducts();
    }

    if (document.getElementById('ordersBody')) {
        displayAdminOrders();
    }

    if (document.getElementById('usersBody')) {
        displayAdminUsers();
    }

    if (document.getElementById('totalProducts')) {
        displayDashboardStats();
    }

    // Setup product form
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', saveProduct);
    }
});



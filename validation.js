// ========================================
// Sahib Jewellers - Form Validation
// ========================================

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

// Validate required field
function validateRequired(value) {
    return value.trim() !== '';
}

// Show error message
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    
    input.style.borderColor = 'red';
}

// Clear error message
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.borderColor = '';
}

// Validate login form
function validateLoginForm() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    let isValid = true;

    if (!validateRequired(username.value)) {
        showError(username, 'Username is required');
        isValid = false;
    } else {
        clearError(username);
    }

    if (!validateRequired(password.value)) {
        showError(password, 'Password is required');
        isValid = false;
    } else {
        clearError(password);
    }

    return isValid;
}

// Validate register form
function validateRegisterForm() {
    const name = document.getElementById('name');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    let isValid = true;

    if (!validateRequired(name.value)) {
        showError(name, 'Name is required');
        isValid = false;
    } else {
        clearError(name);
    }

    if (!validateRequired(username.value)) {
        showError(username, 'Username is required');
        isValid = false;
    } else {
        clearError(username);
    }

    if (!validateRequired(email.value)) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Invalid email format');
        isValid = false;
    } else {
        clearError(email);
    }

    if (!validateRequired(password.value)) {
        showError(password, 'Password is required');
        isValid = false;
    } else if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    } else {
        clearError(password);
    }

    if (!validateRequired(confirmPassword.value)) {
        showError(confirmPassword, 'Please confirm your password');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        clearError(confirmPassword);
    }

    return isValid;
}

// Validate contact form
function validateContactForm() {
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');
    let isValid = true;

    if (!validateRequired(name.value)) {
        showError(name, 'Name is required');
        isValid = false;
    } else {
        clearError(name);
    }

    if (!validateRequired(email.value)) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Invalid email format');
        isValid = false;
    } else {
        clearError(email);
    }

    if (!validateRequired(message.value)) {
        showError(message, 'Message is required');
        isValid = false;
    } else {
        clearError(message);
    }

    return isValid;
}

// Validate checkout form
function validateCheckoutForm() {
    const name = document.getElementById('checkoutName');
    const email = document.getElementById('checkoutEmail');
    const phone = document.getElementById('checkoutPhone');
    const address = document.getElementById('checkoutAddress');
    const city = document.getElementById('checkoutCity');
    const pincode = document.getElementById('checkoutPincode');
    let isValid = true;

    if (!validateRequired(name.value)) {
        showError(name, 'Name is required');
        isValid = false;
    } else {
        clearError(name);
    }

    if (!validateRequired(email.value)) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Invalid email format');
        isValid = false;
    } else {
        clearError(email);
    }

    if (!validateRequired(phone.value)) {
        showError(phone, 'Phone is required');
        isValid = false;
    } else if (!validatePhone(phone.value)) {
        showError(phone, 'Invalid phone number (10 digits)');
        isValid = false;
    } else {
        clearError(phone);
    }

    if (!validateRequired(address.value)) {
        showError(address, 'Address is required');
        isValid = false;
    } else {
        clearError(address);
    }

    if (!validateRequired(city.value)) {
        showError(city, 'City is required');
        isValid = false;
    } else {
        clearError(city);
    }

    if (!validateRequired(pincode.value)) {
        showError(pincode, 'Pincode is required');
        isValid = false;
    } else {
        clearError(pincode);
    }

    return isValid;
}

// Validate product form (admin)
function validateProductForm() {
    const name = document.getElementById('productName');
    const category = document.getElementById('productCategory');
    const description = document.getElementById('productDescription');
    const price = document.getElementById('productPrice');
    const image = document.getElementById('productImage');
    const stock = document.getElementById('productStock');
    const metalType = document.getElementById('productMetalType');
    let isValid = true;

    if (!validateRequired(name.value)) {
        showError(name, 'Product name is required');
        isValid = false;
    } else {
        clearError(name);
    }

    if (!validateRequired(category.value)) {
        showError(category, 'Category is required');
        isValid = false;
    } else {
        clearError(category);
    }

    if (!validateRequired(description.value)) {
        showError(description, 'Description is required');
        isValid = false;
    } else {
        clearError(description);
    }

    if (!validateRequired(price.value)) {
        showError(price, 'Price is required');
        isValid = false;
    } else if (isNaN(price.value) || parseFloat(price.value) <= 0) {
        showError(price, 'Price must be a positive number');
        isValid = false;
    } else {
        clearError(price);
    }

    if (!validateRequired(image.value)) {
        showError(image, 'Image URL is required');
        isValid = false;
    } else {
        clearError(image);
    }

    if (!validateRequired(stock.value)) {
        showError(stock, 'Stock is required');
        isValid = false;
    } else if (isNaN(stock.value) || parseInt(stock.value) < 0) {
        showError(stock, 'Stock must be a non-negative number');
        isValid = false;
    } else {
        clearError(stock);
    }

    if (!validateRequired(metalType.value)) {
        showError(metalType, 'Metal type is required');
        isValid = false;
    } else {
        clearError(metalType);
    }

    return isValid;
}

// Real-time validation
function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Clear error on blur if value is valid
            if (this.value.trim() !== '') {
                clearError(this);
            }
        });
    });
}

// Initialize validation on page load
document.addEventListener('DOMContentLoaded', function() {
    setupRealTimeValidation();
});



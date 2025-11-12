# 💎 Sahib Jewellers - Premium Jewelry Website

A fully functional, responsive website for Sahib Jewellers built with HTML, CSS, and JavaScript (no frameworks). The project includes both user-facing and admin panels with complete e-commerce functionality.

## 🎨 Features

### User Side (Frontend)
- **Home Page**: Elegant hero section, featured collections, new arrivals, and customer reviews
- **Shop Page**: Browse jewelry with filters (category, price range, metal type) and sorting options
- **Product Detail Page**: Detailed product view with image gallery and add to cart functionality
- **Shopping Cart**: View, update, and remove items from cart
- **Checkout Page**: Complete order placement with form validation
- **About Us Page**: Company history and craftsmanship story
- **Contact Page**: Contact form with Google Maps integration
- **User Authentication**: Login and registration with localStorage-based session management

### Admin Side (Backend Simulation)
- **Admin Dashboard**: Overview with stats (products, orders, users, revenue)
- **Product Management**: Add, edit, and delete products
- **Order Management**: View orders and update order status
- **User Management**: View and delete registered users
- **Secure Admin Login**: Protected admin routes

## 🛠️ Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables, flexbox, and grid
- **JavaScript**: Vanilla JS for all functionality
- **LocalStorage**: Data persistence for products, users, orders, and cart
- **Font Awesome**: Icons
- **Google Fonts**: Playfair Display (headings) and Poppins (body)

## 📁 Project Structure

```
sahib-jewellers/
├── index.html
├── about.html
├── contact.html
├── shop.html
├── product.html
├── cart.html
├── checkout.html
├── login.html
├── register.html
├── admin/
│   ├── admin-login.html
│   ├── dashboard.html
│   ├── products.html
│   ├── orders.html
│   └── users.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── cart.js
│   │   ├── admin.js
│   │   └── validation.js
│   └── images/
└── README.md
```

## 🚀 Getting Started

### Installation

1. Clone or download the project
2. Open `index.html` in a web browser
3. No build process or dependencies required!

### Default Credentials

**Admin Login:**
- Username: `admin`
- Password: `admin123`

**User Registration:**
- Create a new account from the registration page
- Or use any test credentials

## 🎯 Key Features

### Responsive Design
- Mobile-first approach
- Works perfectly on desktop, tablet, and mobile devices
- Flexible grid layouts and media queries

### Data Management
- All data stored in browser localStorage
- Products, users, orders, and cart persist across sessions
- Default products loaded on first visit

### Form Validation
- Real-time form validation
- Email, phone, and required field validation
- User-friendly error messages

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart across pages
- Cart count in navbar

### Admin Panel
- Secure admin authentication
- CRUD operations for products
- Order status management
- User management
- Dashboard statistics

## 🎨 Design Features

- **Color Palette**: Gold (#D4AF37), Black (#000000), White (#FFFFFF)
- **Typography**: Playfair Display for headings, Poppins for body
- **Modern UI**: Clean, elegant, and luxurious design
- **Smooth Animations**: Hover effects and transitions
- **Professional Layout**: Grid and flexbox-based layouts

## 📱 Pages

### User Pages
1. **index.html** - Home page with hero, collections, and reviews
2. **shop.html** - Product listing with filters and search
3. **product.html** - Product detail page
4. **cart.html** - Shopping cart
5. **checkout.html** - Checkout and order placement
6. **about.html** - About us page
7. **contact.html** - Contact form and map
8. **login.html** - User login
9. **register.html** - User registration

### Admin Pages
1. **admin/admin-login.html** - Admin login
2. **admin/dashboard.html** - Admin dashboard
3. **admin/products.html** - Product management
4. **admin/orders.html** - Order management
5. **admin/users.html** - User management

## 🔧 JavaScript Functions

### Main Functions (main.js)
- `initializeApp()` - Initialize application and default data
- `filterProducts()` - Filter products by category, price, metal type
- `displayProducts()` - Display products in grid
- `getProductById()` - Get product by ID
- `updateCartCount()` - Update cart count in navbar

### Cart Functions (cart.js)
- `addToCart()` - Add item to cart
- `removeFromCart()` - Remove item from cart
- `updateCartQuantity()` - Update item quantity
- `getCartTotal()` - Calculate cart total
- `displayCart()` - Display cart items

### Admin Functions (admin.js)
- `adminLogin()` - Admin authentication
- `checkAdminAuth()` - Check if user is admin
- `addProduct()` - Add new product
- `updateProduct()` - Update existing product
- `deleteProduct()` - Delete product
- `updateOrderStatus()` - Update order status
- `getDashboardStats()` - Get dashboard statistics

### Validation Functions (validation.js)
- `validateEmail()` - Validate email format
- `validatePhone()` - Validate phone number
- `validateLoginForm()` - Validate login form
- `validateRegisterForm()` - Validate registration form
- `validateContactForm()` - Validate contact form
- `validateCheckoutForm()` - Validate checkout form
- `validateProductForm()` - Validate product form

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- All data is stored in browser localStorage
- Images use placeholder URLs from Unsplash
- No backend server required
- No external API dependencies
- Perfect for learning and demonstration purposes

## 🔒 Security Notes

- This is a frontend-only project for demonstration
- Passwords are stored in plain text in localStorage (not secure for production)
- Admin routes are protected by JavaScript checks
- For production, implement proper backend authentication

## 🎓 Learning Points

- Vanilla JavaScript DOM manipulation
- LocalStorage API usage
- Form validation
- Responsive CSS design
- E-commerce functionality
- Admin panel implementation

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Sahib Jewellers Website Project

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Unsplash for placeholder images

---

**Enjoy exploring the Sahib Jewellers website! 💎**



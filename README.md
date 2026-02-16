# ShopMart E-Commerce Application

A full-featured e-commerce web application built with Next.js 14 (App Router), Bootstrap 5, and TypeScript.

## 🚀 Features

### Authentication
- ✅ User Registration
- ✅ User Login
- ✅ Forgot Password
- ✅ Change Password
- ✅ JWT Token Management

### Shopping Features
- ✅ Product Browsing & Search
- ✅ Product Details with Image Gallery
- ✅ Category Filtering
- ✅ Brand Filtering
- ✅ Shopping Cart (Add, Remove, Update)
- ✅ Wishlist Management
- ✅ Product Reviews & Ratings

### Checkout & Payment
- ✅ Cash on Delivery
- ✅ Online Payment (Stripe Integration)
- ✅ Multiple Shipping Addresses
- ✅ Coupon Codes

### User Account
- ✅ Order History
- ✅ Address Management
- ✅ Profile Management

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** Bootstrap 5 + React-Bootstrap
- **State Management:** React Context API
- **Language:** TypeScript
- **HTTP Client:** Axios
- **Form Validation:** React Hook Form + Zod
- **Notifications:** React Toastify
- **Icons:** Bootstrap Icons

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ecommerce-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://ecommerce.routemisr.com/api/v1
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication pages
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   ├── products/            # Product pages
│   ├── categories/          # Category pages
│   ├── brands/              # Brand pages
│   ├── cart/                # Shopping cart
│   ├── wishlist/            # Wishlist
│   ├── checkout/            # Checkout process
│   ├── orders/              # Order history
│   └── addresses/           # Address management
├── components/
│   ├── layout/              # Header, Footer, Navbar
│   ├── products/            # Product-related components
│   ├── cart/                # Cart components
│   ├── ui/                  # Reusable UI components
│   └── ...
├── contexts/                # React Context providers
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── WishlistContext.tsx
├── lib/
│   └── api/                 # API integration layer
│       ├── axios.ts
│       ├── auth.ts
│       ├── products.ts
│       ├── cart.ts
│       └── ...
└── types/                   # TypeScript type definitions
    ├── product.ts
    ├── user.ts
    ├── cart.ts
    └── order.ts
```

## 🔑 Key Features Implementation

### State Management
The app uses React Context API for global state:
- **AuthContext**: User authentication state
- **CartContext**: Shopping cart state
- **WishlistContext**: Wishlist state

### API Integration
- Centralized Axios instance with interceptors
- Automatic token injection
- Error handling
- Type-safe API calls

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Responsive navigation
- Touch-friendly UI

## 📄 Pages Overview

### Public Pages
- **/** - Homepage with featured products, categories, and brands
- **/products** - Product listing with filters and search
- **/products/[id]** - Product details page
- **/categories** - All categories
- **/categories/[id]** - Products by category
- **/brands** - All brands
- **/brands/[id]** - Products by brand
- **/login** - User login
- **/register** - User registration
- **/forgot-password** - Password recovery

### Protected Pages (Require Authentication)
- **/cart** - Shopping cart
- **/wishlist** - User wishlist
- **/checkout** - Checkout process
- **/orders** - Order history
- **/addresses** - Shipping addresses
- **/profile** - User profile

## 🎨 UI/UX Reference
The application closely follows the design and user experience of:
https://shop-mart-hs72.vercel.app/

## 🔗 API Documentation
https://documenter.getpostman.com/view/5709532/2s93JqTRWN

## 🚦 Getting Started Guide

### 1. Testing Authentication
- Register a new account at `/register`
- Login at `/login`
- Test password recovery at `/forgot-password`

### 2. Shopping Flow
1. Browse products on homepage
2. Filter by category or brand
3. View product details
4. Add to cart/wishlist
5. Proceed to checkout
6. Complete order

### 3. Account Management
- View order history at `/orders`
- Manage addresses at `/addresses`
- Update profile information

## 📝 Development Notes

### Bootstrap Integration
Bootstrap CSS and JavaScript are loaded globally. For client-side components requiring Bootstrap JS (modals, dropdowns), ensure you're using the `'use client'` directive.

### Image Optimization
Next.js Image component is used for automatic image optimization. Configure allowed domains in `next.config.mjs`.

### Type Safety
All API responses are typed. See `/types` directory for available interfaces.

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support
For issues or questions, please create an issue in the GitHub repository.

## 📄 License
This project is licensed under the MIT License.

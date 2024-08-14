# **E-Commerce Project**

**Student Name:** Darshankumar Hiteshbhai Mistry

**Student Number:** 8967753

**Date:** 7 July 2024

------------------------------------------------------------------------------------

# Technology Stack

**Frontend:** ReactJS  
**Backend:** Node.js with Express  
**Database:** MongoDB 

-------------------------------------------------------------------------------------

# Database Schema Design

## Products Schema (MongoDB)
- `name: String`
- `description: String`
- `price: Number`
- `category: String`
- `stock: Number`
- `imageUrl: String`

### Categories Schema (MongoDB)
- `category_name`: String

-------------------------------------------------------------------------------------

Github Repo Link :- https://github.com/mistrydarshan222/E-Commerce

-------------------------------------------------------------------------------------

## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js
- npm (Node package manager)
- MongoDB

### Installation

1. **Clone the repository:**
git clone https://github.com/mistrydarshan222/E-Commerce
cd foldername

2. **Install dependencies for the backend:**
cd ecombackend
npm install

3. **Install dependencies for the frontend:**
cd ../ecomfrontend
npm install

### Running the Project

1. **Start MongoDB:**

Ensure your MongoDB server is running. 

2. **Set up environment variables:**

Create a `.env` file in the `ecombackend` and `ecomfrontend` directories with the following content:

**ecombackend/.env:**
MONGO_URI=mongodb://localhost:27017/yourdbname
PORT=5000

**ecomfrontend/.env:**
REACT_APP_BACKEND_URL=http://localhost:5000

3. **Start the backend server:**

Open a terminal and navigate to the `ecombackend` directory, then run:
npm start

The backend server will start and be accessible at `http://localhost:5000`.

4. **Start the frontend development server:**

Open another terminal and navigate to the `ecomfrontend` directory, then run:
npm start

The frontend development server will start and be accessible at `http://localhost:3000`.

### Environment Variables
The project requires the following environment variables to be set:

**ecombackend/.env:**

- `MONGO_URI`: The connection string for your MongoDB database.
- `PORT`: The port number on which the backend server will run.

**ecomfrontend/.env:**

- `REACT_APP_BACKEND_URL`: The base URL for the backend API.


### Features

- **Product Listings:** Display products with details such as name, description, price, and category.
- **Shopping Cart:** Allow users to add products to a cart and manage the cart.
- **Checkout Process:** Users can enter shipping and payment information (HardCoded Values), view their order summary, and place orders.
- **Order Confirmation:** A thank you popup is displayed after a successful order, showing order details.

**Admin Panel:**
- **Admin Login-** Admin can log in with given hardcoded credentials to manage the products and categories.
    **username** - Darshan
    **password** - 8967753
- **Product Management:** Admin can add, update, and delete products.
- **Category Management:** Admin can add, update, and delete categories.
- **Image Management:** Product images can be uploaded and managed efficiently, ensuring images don't need to be re-uploaded during product updates.

**New Features Added**
- **Improved Product Details:** Product pages include detailed descriptions, pricing, size and color options (HardCoded Values), and a well-structured layout.
- **Enhanced Cart and Checkout:** Cart page displays product images, and checkout includes a summary with product details and an order total.
- **Footer:** A consistent footer is added across all pages, featuring social media links and additional navigation.
- **Custom Fonts:** The entire website now uses the Poppins font for a modern and clean look.
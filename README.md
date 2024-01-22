# Simple E-Commerce Web App

# Live Demo

https://ecommerce-assessment.onrender.com/

## Introduction

This is a basic example or a mini e-commerce application created for a front-end development assessment. Please note that this application lacks some features and designs that you might find in a complete e-commerce solution. It serves as a starting point for understanding the implementation of essential features like adding, editing, deleting, and reading products.

## Requirements

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Versions

- **React Version:** 18.2.0
- **Node.js Version:** 18.12.1

## Features

- **State Management:**
  - [Zustand](https://github.com/pmndrs/zustand) for efficient and reactive state management.
- **Sorting and Filtering:**
  - Implementation of sorting and filtering options for a better user experience in product navigation.
- **Caching:**
  - [React Query](https://react-query.tanstack.com/) for caching and efficient data fetching.
- **CRUD Operations:**
  - Full CRUD functionality for managing products.
- **Debounce Search Functionality:**
  - This helps reduce the number of unnecessary requests or computations triggered by each keystroke, improving performance and minimizing unnecessary resource usage.
- **Database / server-side:**
  - This is a full-stack application, with data storage implemented in a MongoDB database. The server-side is built with Node.js and Express, while the client-side is developed using React. The communication between the client and server is facilitated by Axios for efficient data transfer.

## Dependencies

### Client-Side Dependencies

```bash
@tanstack/react-query-devtools
@tanstack/react-query
axios
react-router-dom
sass
zustand

```

### Server-Side Dependencies

```bash
cloudinary
dotenv
express-async-errors
express
http-status-codes
mongoose
multer
```

## Installation

```bash


# Navigate to the Root Folder
cd simple-ecommerce-web-app

# Install Dependencies
npm install

# Navigate to the Server Folder
cd server

# Install Server Dependencies
npm install

# Navigate to the Client Folder
cd ../client

# Install Client Dependencies
npm install
```

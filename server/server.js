require("express-async-errors");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const { StatusCodes } = require("http-status-codes");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//DB Import
const connectDB = require("./db/connection");

//Middleware Imports
const errorHandlerMiddleware = require("./middleware/errorHandler");

// Route Imports
const productsRoute = require("./routes/products");
const { async } = require("rxjs");

//Routes
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/products", productsRoute);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

app.use("*", (req, res) => {
  res
    .status(StatusCodes.OK)
    .sendFile(path.resolve(__dirname, "./public", "index.html"));
});
app.use(errorHandlerMiddleware);

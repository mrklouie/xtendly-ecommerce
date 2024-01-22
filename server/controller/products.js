const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, BadRequest, NotFound } = require("../errors");
const ProductModel = require("../models/products");

const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

const getAllProducts = async (req, res) => {
  const { search, category, price_sort } = req.query;

  let queryObj = {};

  if (category && category !== "all") {
    queryObj.category = category;
  }

  if (search) {
    queryObj.product_name = { $regex: search, $options: "i" };
  }

  console.log(queryObj);

  let result = ProductModel.find(queryObj);

  if (price_sort === "highest to lowest") {
    result = result.sort({ product_price: -1 });
  } else {
    result = result.sort({ product_price: 1 });
  }

  const product = await result;

  if (product.length === 0) {
    throw new BadRequest(`No result found`);
  }

  const totalProducts = await ProductModel.countDocuments(queryObj);

  res.status(StatusCodes.OK).json({ data: product, totalProducts });
};

const createProduct = async (req, res) => {
  const { category, product_description, product_name, product_price } =
    req.body;

  const { path: imagePath, originalName } = req.file;

  if (!category || !product_description || !product_name || !product_price) {
    throw new BadRequest("Please fill out all required fields!");
  }

  const uploadResult = await cloudinary.uploader.upload(imagePath);
  const { secure_url, public_id } = uploadResult;
  await fs.unlink(imagePath);

  const product = await ProductModel.create({
    ...req.body,
    image: { secure_url, public_id },
  });

  res
    .status(StatusCodes.OK)
    .json({ data: { product }, message: "Product Added!" });
};

const getProduct = async (req, res) => {
  const { productId } = req.params;

  let product;

  try {
    product = await ProductModel.findOne({ _id: productId });
  } catch (error) {
    throw new BadRequest(`No product with id of: ${productId}`);
  }

  res.status(StatusCodes.OK).json({ data: { product } });
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await ProductModel.findByIdAndDelete({ _id: productId });

  res.status(StatusCodes.OK).json({ data: { product }, message: "Delete" });
};

const updateProduct = async (req, res) => {
  const { _id } = req.body;

  let uploadResult;
  let image = {};
  let queryObj = {};

  if (!_id) {
    throw new BadRequest("ID is Missing");
  }

  const uploadFile = async ({ imagePath, originalName }) => {
    return await cloudinary.uploader.upload(imagePath);
  };

  if (req.file) {
    const { path: imagePath, originalName } = req.file;
    uploadResult = await uploadFile({ imagePath, originalName });
    image.secure_url = uploadResult.secure_url;
    image.public_id = uploadResult.public_id;
    await fs.unlink(imagePath);
  }

  queryObj = { ...req.body, image };

  if (Object.keys(image).length === 0) {
    delete queryObj.image;
  }

  delete queryObj._id;

  console.log("ran");

  const product = await ProductModel.findByIdAndUpdate({ _id: _id }, queryObj, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ data: product, message: "Okay!" });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};

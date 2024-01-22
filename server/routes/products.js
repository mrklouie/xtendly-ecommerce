const express = require("express");
const router = express.Router();

//Controller Imports
const {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/products");
const upload = require("../middleware/multer");

router.route("/update").patch(upload.single("product_image"), updateProduct);
router.route("/create").post(upload.single("product_image"), createProduct);
router.route("/").get(getAllProducts);
router.route("/:productId").get(getProduct).delete(deleteProduct);

module.exports = router;

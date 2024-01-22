const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: [true, "Please provide the product name"],
  },

  category: {
    type: String,
    required: [true, "Please provide the category"],
  },

  product_price: {
    type: Number,
    required: [true, "Please provide the price"],
  },

  product_description: {
    type: String,
    required: [true, "Please provide the description"],
    minlength: 5,
  },

  image: [
    {
      public_id: {
        type: String,
        unique: true,
      },

      secure_url: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);

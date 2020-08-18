const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      require: true,
    },
    productid: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    sku: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageurl: {
      type: String,
      required: true,
    },
    costprice: {
      type: String,
      required: true,
    },
    sellingprice: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", schema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    sku: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      text: true,
    },
    imageurl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      text: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
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
    discount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", schema);

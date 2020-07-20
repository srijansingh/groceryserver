const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        sku: {
            type:String,
            required: true
        },
        title: {
            type:String,
            required: true
        },
        imageurl:{
            type:String,
            required: true
        },
        description: {
            type:String,
            required: true
        },
        category: {
            type:String,
            required: true
        },
        subcategory: {
            type:String,
            required: true
        },
        costprice: {
            type:String,
            required: true
        },
        sellingprice: {
            type:String,
            required: true
        },
        discount: {
            type:String,
            required: true
        },
        status: {
            type:String,
            default:"active"
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Product', schema);
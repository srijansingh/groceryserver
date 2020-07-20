const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        subcategory: {
            type:String,
            required: true
        },
        category: {
            type:String,
            required: true
        },
        imageurl:{
            type:String,
            required: true
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Subcategory', schema)
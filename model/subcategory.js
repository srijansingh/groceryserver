const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        subcategory: {
            type:String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        imageurl:{
            type:String,
            required: true
        },
        products : [
            {
                type : Schema.Types.ObjectId,
                ref : 'Product'
            }
        ]
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Subcategory', schema)
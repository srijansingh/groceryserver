const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        category: {
            type:String,
            required: true
        },
        imageurl:{
            type:String,
            required: true
        },
        subcategory : [
            {
                type : Schema.Types.ObjectId,
                ref : 'Subcategory'
            }
        ],
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

module.exports = mongoose.model('Category', schema)
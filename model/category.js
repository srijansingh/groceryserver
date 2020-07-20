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
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Category', schema)
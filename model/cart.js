const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:'Customer'
           
        },
        product:{
            type:Schema.Types.ObjectId,
            ref:'Product'
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Cart', schema)
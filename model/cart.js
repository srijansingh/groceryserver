const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        userid:{
            type:String,
            require:true
        },
        productid:{
            type:String,
            require:true
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Cart', schema)
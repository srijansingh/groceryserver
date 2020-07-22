const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        user : {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            require : true
        },
        refid:{
            type:String,
            require:true
        },
        productid:{
            type:String,
            require:true
        },
        totalcost:{
            type:String,
            require:true
        },
        status:{
            type:String,
            default:'processing'
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Order', schema);
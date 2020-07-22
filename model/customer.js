const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const customerSchema = new Schema(
    {
        mobile : {
            type : String
        },
        name : {
            type:String
        },
        email:{
            type:String
        },
        address : {
            type : String
        },
        pincode : {
            type:String
        },
        city : {
            type:String
        },
        state : {
            type:String
        },
        orders : [{
            type : Schema.Types.ObjectId,
            ref : 'Order'
        }]
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Customer', customerSchema);
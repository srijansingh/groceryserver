const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        userid: {
            type: String,
            required:true
        },
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
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Customer', customerSchema);
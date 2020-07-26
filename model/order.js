const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        userid : {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            require : true
        },
        productid:{
            type:String,
            require:true
        },
        referenceid:{
            type:String,
            require:true
        },
        totalcost:{
            type:String,
            require:true
        },
        sku:{
            type:String,
            require:true 
        },
        titles:{
            type:String,
            require:true 
        },
        imageurls:{
            type:String,
            require:true 
        },
        mobile:{
            type:String,
            require:true 
        },
        address:{
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
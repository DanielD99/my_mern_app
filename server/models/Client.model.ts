import mongoose from 'mongoose';


const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    experiences:[{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Experience',
    }]

});

const Client = mongoose.model('Client', ClientSchema);

export default Client;
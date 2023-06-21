import mongoose from 'mongoose';


const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description:{
        type: String,
    },
    status:{
        type: String,
        enum:['Not Started', 'In Progress', 'Completed'],       
    },
    clients:[{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Client',
    }],

});
const Project = mongoose.model('Project', ProjectSchema);

export default Project;
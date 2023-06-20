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
        enum:['Not Started', 'In Progres', 'Completed'],       
    },
    clients:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    }],

});
const Project = mongoose.model('project', ProjectSchema);

export default Project;
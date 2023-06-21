import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
    skillSet: {
        type: String,
    },
    description:{
        type: String,
    },
    level:{
        type: String,
        enum:['Beginner', 'Intermediate', 'Expert'],       
    },
});
const Experience = mongoose.model('Experience', ExperienceSchema);

export default Experience;
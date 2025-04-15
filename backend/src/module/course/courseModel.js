import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    timeSpan: {
        type: Number,
        default: 6,
    },
    imageUrl: {
        type: String,
        default: '',
        
    },
    weeklyTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'draft'],
        default: 'active',
    },
});


const Course =  mongoose.model('Course', courseSchema);
export default Course;
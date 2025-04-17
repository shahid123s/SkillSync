
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const enrollerCourseSchema = new Schema({
    
    studentId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        default: [],
    },
    courseId: {
        type: Schema.Types.ObjectId, 
        ref: 'Course',
        default: [],
    },
    paymentStatus: {
        type: String,
        enum: ['success', 'failed', 'pending'],
        default: 'pending',
    },
    price: {
        type: Number,
        required: true,
    }

}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


const EnrollerCourse = model('EnrollerCourse', enrollerCourseSchema);
export default EnrollerCourse;
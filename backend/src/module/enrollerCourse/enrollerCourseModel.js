
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const enrollerCourseSchema = new Schema({
    
    students: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        default: [],
    },
    course: {
        type: Schema.Types.ObjectId, 
        ref: 'Course',
        default: [],
    }

}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


const EnrollerCourse = model('EnrollerCourse', enrollerCourseSchema);
export default EnrollerCourse;
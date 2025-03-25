
import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'reviwer'],
        default: 'user',
    },
    profileImage: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'None'],
        default: 'None',
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    dob: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        default: ''
    },
    skills: [{
        type: String,
        trim: true
    }]
})
const Student = mongoose.model('Student', studentSchema);
export default Student;
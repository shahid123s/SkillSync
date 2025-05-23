import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role:{
        type: String,
        enum: ['admin', 'student'],
        default: 'admin',
    }
}, {
    timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
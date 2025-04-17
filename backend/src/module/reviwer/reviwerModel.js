
import mongoose from 'mongoose';

const reviewerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  password: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true
  },
  certificates: [{
    type: String,
     default: ''
  }],
  experience: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    default: 'reviewer',
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model('Reviewer', reviewerSchema);
 
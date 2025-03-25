
import mongoose from 'mongoose';

const reviewerSchema = new mongoose.Schema({
  name: {
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
  phone: {
    type: String,
    required: true
  },
  certificates: [{
    type: String
  }],
  experience: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Reviewer', reviewerSchema);
 
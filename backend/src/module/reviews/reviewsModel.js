
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WeeklyTask', 
    required: true
  },
  week: {
    type: Number,
    required: true
  },
  reviewerName: {
    type: String,
    default: 'Checking'
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer'
  },
  feedback: {
    type: String,
    required: function() {
      return this.status === 'accepted';
    }
  },
  meetLink: {
    type: String,
    required: function() {
      return this.status === 'accepted';
    }
  },
  status: {
    type: String,
    enum: ['pending', 'passed', 'repeat', 'cancelled', 'accepted', 'assigned'],
    default: 'pending'
  },
  reviewDate: {
    type: Date,
    default: function() {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date;
    }
  }, 
  time: {
    type: String,
    required: function() {
      return this.status === 'assigned';
    }
  }
}, {
  timestamps: true
});

export const Review = mongoose.model('Review', reviewSchema);

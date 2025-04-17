import mongoose from 'mongoose';

// WeeklyTask Schema
const weeklyTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: {
    type: [String], // Array of strings
    required: true,
  },
});

// WeeklyTaskCourse Schema
const weeklyTaskCourseSchema = new mongoose.Schema({
  weekNum: {
    type: Number,
    required: true,
  },
  weeklyTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WeeklyTask', // Reference to WeeklyTask model
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to Course model (if exists)
    required: true,
  },
});

// Models
const WeeklyTask = mongoose.model('WeeklyTask', weeklyTaskSchema);
const WeeklyTaskCourse = mongoose.model('WeeklyTaskCourse', weeklyTaskCourseSchema);

export { WeeklyTask, WeeklyTaskCourse };
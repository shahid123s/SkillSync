import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  week:{
    type: Number,
    required: true,
    default: 1,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task =  mongoose.model('Task', taskSchema);
export default Task;
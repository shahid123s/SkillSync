import mongoose from "mongoose";

const completedCourseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completionDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CompletedCourse", completedCourseSchema);
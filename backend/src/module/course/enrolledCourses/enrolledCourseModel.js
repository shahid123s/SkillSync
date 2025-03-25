import mongoose from "mongoose";

const enrolledCourseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  enrolledDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("EnrolledCourse", enrolledCourseSchema);
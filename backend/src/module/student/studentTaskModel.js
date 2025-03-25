const studentTaskSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    startDate: {
        type: Date,
        default:
            Date.now
    }, // Task assigned date
    endDate: {
        type: Date,
        default: function () {
            return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
        }
    },
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    },
});

import Task from "./taskModel.js"; 
import CustomError from "../../utils/customError.js";
import Task from "./taskModel.js";


export const taskRepository = {
    getAllTasks: async () => {
        try {
            return await Task.find().lean();
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
    getTask: async (id) => {
        try {
            return await Task.findById(id);
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
    createTask: async (taskData) => {
        try {
            return await Task.create(taskData);
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
    updateTask: async (id, taskData) => {
        try {
            return await Task.findByIdAndUpdate(id, taskData, { new: true });
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
    deleteTask: async (id) => {
        try {
            return await Task.findByIdAndDelete(id);
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
    getCourseTasks: async (courseId) => {
        try {
            return await Task.find({ courseId });
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
    getCourseWeekTask: async (courseId, week) => {
        try {
            return await Task.find({ courseId, week });
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
}
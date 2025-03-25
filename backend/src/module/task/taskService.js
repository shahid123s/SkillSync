import { taskRepository } from "./taskRepository.js";
import CustomError from "../../utils/customError.js";

export const taskService = {
    getAllTasks: async () => {
        try {
            return await taskRepository.getAllTasks();
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },
    getTask: async (id) => {
        try {
            const result = await taskRepository.getTask(id);
            if (result.length === 0) {
                throw new CustomError(404, "No task Found");
            }
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },
    createTask: async (taskData) => {
        try {
            if (!taskData.title || !taskData.description || !taskData.courseId) {
                throw new CustomError(400, "Invalid Data");
            }
            return await taskRepository.createTask(taskData);
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },
    updateTask: async (id, taskData) => {
        try {
            const result = await taskRepository.updateTask(id, taskData);
            if (!result) {
                throw new CustomError(404, "No task Found");
            };
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },
    deleteTask: async (id) => {
        return await taskRepository.deleteTask(id);
    },
    getCourseTasks: async (courseId) => {
        try {
            let result = await taskRepository.getCourseTasks(courseId);
            if(result.length === 0) throw new CustomError(404, "No task Found");;
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },
    getCourseWeekTask: async (courseId, week) => {
        try {
            let result = await taskRepository.getCourseWeekTask(courseId, week);
            if(result.length === 0) throw new CustomError(404, "No task Found");    
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },
}
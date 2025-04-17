import CustomError from "../../utils/customError.js";
import { WeeklyTaskRepository } from "./weeklyTaskRespository.js";

export const weeklyTaskService = {
    // Get all weekly tasks
    getAllWeeklyTasks: async () => {
        return await weeklyTaskRepository.getAllWeeklyTasks();
    },

    // Get weekly task by ID
    getWeeklyTaskById: async (id) => {
        if (!id) {
            throw new CustomError("Task ID is required");
        }

        return await weeklyTaskRepository.getWeeklyTaskById(id);
    },

    // Create new weekly task
    createWeeklyTask: async (weeklyTaskData) => {
        return await weeklyTaskRepository.addTask(weeklyTaskData);
    },

    // Update weekly task
    updateWeeklyTask: async (id, weeklyTaskData) => {
        return await weeklyTaskRepository.updateWeeklyTask(id, weeklyTaskData);
    },

    // Delete weekly task
    deleteWeeklyTask: async (id) => {
        return await weeklyTaskRepository.deleteWeeklyTask(id);
    }
}    
// utils/adminAxiosInstance.js
// Add these methods to your existing file

import { toast } from "sonner";
import { adminAxiosInstance } from "../utils/adminAxiosInstance";

export const getWeeklyTasks = async () => {
    try {
      const response = await adminAxiosInstance.get('/weekly-tasks');
      return response.data;
    } catch (error) {
        toast.error(error.response.data.message || 'Network Failed')
        return error.response.data.message;
    }
  };
  
  export const createWeeklyTask = async (taskData) => {
    try {
      const response = await adminAxiosInstance.post('/weekly-tasks', taskData);
      return response.data;
    } catch (error) {
        toast.error(error.response.data.message || 'Network Failed')
        return error.response.data.message;
    }
  };
  
  export const updateWeeklyTask = async (taskId, taskData) => {
    try {
      const response = await adminAxiosInstance.put(`/weekly-tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
        toast.error(error.response.data.message || 'Network Failed')
        return error.response.data.message;
    }
  };
  
  export const deleteWeeklyTask = async (taskId) => {
    try {
      const response = await adminAxiosInstance.delete(`/weekly-tasks/${taskId}`);
      return response.data;
    } catch (error) {
        toast.error(error.response.data.message || 'Network Failed')
        return error.response.data.message;
    }
  };
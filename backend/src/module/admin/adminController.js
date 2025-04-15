import { getAllCourses } from "../course/courseController.js";
import { adminService } from "./adminService.js";

export const adminController = {
    getAllUsers: async (req, res, next) => {
        try {
            const result = await adminService.getAllUsers();
            res.status(200).json({ message: "All users retrieved successfully", data: result , success: true});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            // Logic to get user by ID
            res.status(200).json({ message: `User with ID ${userId} retrieved successfully` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },




    // courses 
    getAllCourses:  async (req, res) => {
        try {
            const result = await adminService.getAllCourses()
            res.status(200).json({ message: "All courses retrieved successfully", data: result, success: true});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    
    }
}
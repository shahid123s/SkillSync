import { updateCourse } from "../course/courseController.js";
import { adminService } from "./adminService.js";

export const adminController = {
    getAllUsers: async (req, res, next) => {
        try {
            const result = await adminService.getAllUsers();
            res.status(200).json({ message: "All users retrieved successfully", data: result, success: true });
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
    getAllCourses: async (req, res) => {
        try {
            const result = await adminService.getAllCourses()
            res.status(200).json({ message: "All courses retrieved successfully", data: result, success: true });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },

    addCourse: async (req, res, next) => {
        try {
            const result = await adminService.addCourse(req.body);
            if (!result) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: `Course didn't add`,

                    });
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: "Course Add Successfully",
                    data: result
                })
        } catch (error) {
            next()
        }
    },

    updateCourse: async (req, res, next) => {
        try {
            const { courseId } = req.params || req.query;
            const courseData = req.body;

            console.log(courseId)

            const result = await adminService.updateCourse(courseId, courseData);
            if (!result) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'Course not found',
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Course updated successfully',
                    data: result
                })
        } catch (error) {
            next()
        }
    },

    getALlUsers: async (req, res, next) => {
        try {
            const result = await adminService.getAllUsers();
            res.status(200).json({ message: "All users retrieved successfully", data: result, success: true });
        } catch (error) {
            next(error)
        }
    },
    getALlReviewers: async (req, res, next) => {
        try {
            const result = await adminService.getAllReviewers();
            res.status(200).json({ message: "All reviewers retrieved successfully", data: result, success: true });
        } catch (error) {
            next(error)
        }
    },
    getAllPendingReviewer: async (req, res, next) => {
        try {
            const result = await adminService.getAllPendingReviewers();
            res.status(200).json({ message: "All pending reviewers retrieved successfully", data: result, success: true });
        } catch (error) {
            next(error)
        }   
    }
}
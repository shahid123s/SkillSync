
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
            res.status(200).json({
                message: "All users retrieved successfully",
                data: result, success: true
            });
        } catch (error) {
            next(error)
        }
    },
    getALlReviewers: async (req, res, next) => {
        try {
            const result = await adminService.getAllReviewers();
            res.status(200).json({
                message: "All reviewers retrieved successfully",
                data: result, success: true
            });
        } catch (error) {
            next(error)
        }
    },
    getAllPendingReviewer: async (req, res, next) => {
        try {
            const result = await adminService.getAllPendingReviewers();
            console.log(result, 'result')
            res.status(200).json({
                message: "All pending reviewers retrieved successfully",
                data: result, success: true
            });
        } catch (error) {
            next(error)
        }
    },

    toggleReviewerStatus: async (req, res, next) => {
        try {
            const { reviewerId, action } = req.body;
            console.log(reviewerId, action, 'req.body in admin Controller toogleReviweBlock')
            const result = await adminService.toggleReviewerStatus(reviewerId, action);
            if (!result) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'Reviewer not found',
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Reviewer updated successfully',
                    data: result
                })
        } catch (error) {
            next(error)
        }
    },
    toggleReviewerBlock: async (req, res, next) => {
        try {
            const { reviewerId, block } = req.body;
            const result = await adminService.toggleReviewerBlock(reviewerId, block);
            if (!result) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'Reviewer not found',
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Reviewer updated successfully',
                    data: result
                })
        } catch (error) {
            next(error)
        }
    },
    addWeeklyTask: async (req, res, next) => {
        try {
            const taskData = req.body;
            // Ensure description is an array
            if (!Array.isArray(taskData.description)) {
                return res.status(400).json({
                    success: false,
                    message: 'Description must be an array'
                });
            }
            
            const newTask = await adminService.createWeeklyTask(taskData);
            res.status(201).json({
                success: true,
                data: newTask,
            });
        } catch (error) {
            next(error)
        }
    },
    

    getAllWeeklyTasks: async (req, res, next) => {
        try {
            const tasks = await adminService.getAllWeeklyTasks();
            if (!tasks) {
                return res.status(404).json({ message: 'No tasks found' });
            }
            res.status(200).json({
                success: true,
                message: 'All weekly tasks retrieved successfully',
                data: tasks
            });
        } catch (error) {
            next(error);
        }
    },
    updateWeeklyTask: async (req, res, next) => {
        try {
            const taskData = req.body;
            // Validate description format
            if (!Array.isArray(taskData.description)) {
                return res.status(400).json({
                    success: false,
                    message: 'Description must be an array'
                });
            }
            
            const updatedTask = await adminService.updateWeeklyTask(taskData._id, taskData);
            res.status(200).json({
                success: true,
                data: updatedTask
            });
        } catch (error) {
            next(error);
        }
    },
    removeWeeklyTask: async (req, res, next) => {
        try {
            const { taskId } = req.body;
            const result = await adminService.removeWeeklyTask(taskId);
            if (!result) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

import { response } from "express";
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
            
            if (!tasks || tasks.length === 0) {
              return res.status(404).json({ 
                success: false,
                message: 'No tasks found' 
              });
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
    },
    addTaskToCourse: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await adminService.addTaskToCourse(data)
            console.log(result, 'result in admin')        
            if (!result) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Task not Added',
                    })
            }
            return res.status(200).json({
                success: true,
                message: "Task Added Successfully",
                data: result,
            })
        } catch (error) {
            next(error)
        }
    },
    toggleUserBlock: async (req, res, next ) => {
        try {
            const {userId, block} = req.body;
            console.log(userId, block, 'req.body in admin Controller toogleUserBlock')
            const result =  await adminService.toggleUserBlock(userId, block);
            if(!result) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'User not found',
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'User updated successfully',
                    data: result
                })
        } catch (error) {
            next(error)
        }
    },
    getPendingReviews: async (req, res, next) => {
        try {
            const result = await adminService.getPendingReviews();
            res.status(200).json({
                message: "All pending reviews retrieved successfully",
                data: result, success: true
            });
        } catch (error) {
            next(error)
        }
    }, 
    assignReviwer: async (req, res, next) => {
        try {
            const {reviewId, reviewerName, reviewerId ,time} = req.body;
            console.log(req.body, 'what is here ')
            const result = await adminService.assignReviwer(reviewId,  reviewerId ,reviewerName, time);
            if(!result) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'Review not found',
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Review updated successfully',
                    data: result
                })
        } catch (error) {
            next(error)
        }
    
    }, 
    deleteCourse: async (req, res, next) => {
       try {
        const {courseId} = req.query;
        const result = await adminService.deleteCourse(courseId);
        if(!result) {
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
            message: 'Review updated successfully',
            data: result
        })
       } catch (error) {
        next(error)
       }
    }, 
    removeTask: async (req, res, next) => {
        try {
            const {taskId, courseId} = req.query;
            const result = await adminService.removeTask(taskId, courseId);
            if(!result) {
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
                message: 'Task updated successfully',
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}
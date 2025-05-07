import CustomError from "../../utils/customError.js";
import Student from "../student/studentModel.js";
import Reviewer from "../reviwer/reviwerModel.js";
import Course from "../course/courseModel.js";
import { courseService } from "../course/courseService.js";
import { WeeklyTaskRepository } from "../weeklyTask/weeklyTaskRespository.js";
import { studentRepository } from "../student/studentRepository.js";
import { reviewsRepositorty } from "../reviews/reviewsRepository.js";



export const adminService = {
    getAllUsers: async () => {
        try {
            const users = await Student.find().lean();
            if (!users) {
                throw new CustomError("No users found", 404);
            }
            return users;
        } catch (error) {
            throw new CustomError("Error retrieving users", 500);
        }
    },
    getAllCourses: async () => {
        try {
            const courses = await Course.find();
            if (!courses) {
                throw new CustomError("No courses found", 404);
            }
            return courses;
        } catch (error) {
            throw new CustomError("Error retrieving courses", 500);
        }
    },
    addCourse: async (courseData) => {
        const response = await courseService.addCourse(courseData)
        return response;
    },

    updateCourse: async (courseId, courseData = {}) => {
        const response = await courseService.updateCourse(courseId, courseData);
        return response;
    },

    getAllReviewers: async () => {
        try {
            const reviewers = await Reviewer.find({ status: 'approved' }).lean();

            if (!reviewers) {
                throw new CustomError("No reviewers found", 404);
            }
            return reviewers;
        } catch (error) {
            throw new CustomError("Error retrieving reviewers", 500);
        }
    },
    getAllPendingReviewers: async () => {
        try {
            const reviewers = await Reviewer.find({
                status: { $in: ['pending', 'rejected'] }
            })
                .sort({ status: -1 })
                .lean();
            return reviewers;
        } catch (error) {
            throw new CustomError("Error retrieving pending reviewers", 500);
        }
    },
    toggleReviewerStatus: async (reviewerId, action) => {
        try {
            console.log(reviewerId, 'adminSerivce toggleReviewer Service ')
            const reviewer = await Reviewer.findById(reviewerId);
            if (!reviewer) {
                throw new CustomError("Reviewer not found", 404);
            }
            if (action === "reject") {
                reviewer.status = "rejected";;
            } else if (action === "approve") {
                reviewer.status = "approved";
            } else {
                throw new CustomError("Invalid action", 400);
            }
            await reviewer.save();
            return reviewer;
        } catch (error) {
            throw new CustomError("Error toggling reviewer block status", 500);
        }
    },
    toggleReviewerBlock: async (reviewerId, block) => {
        try {
            const reviewer = await Reviewer.findById(reviewerId);
            if (!reviewer) {
                throw new CustomError("Reviewer not found", 404);
            }
            reviewer.isBlocked = block;
            await reviewer.save();
            return reviewer;
        } catch (error) {
            throw new CustomError("Error toggling reviewer block status", 500);
        }
    },
    createWeeklyTask: async (taskData) => {
        try {
            const result = await WeeklyTaskRepository.addTask(taskData);
            return result
        } catch (error) {
            console.log(error,'error in adminService createWeeklyTask')
            throw new CustomError("Error creating weekly task", 500);
        }
    },
    getAllWeeklyTasks: async () => {
        try {
            return await WeeklyTaskRepository.getAllTasks();
          } catch (error) {
            throw new CustomError("Error fetching weekly tasks: " + error.message, 500);
          }
    
    },
    updateWeeklyTask: async (taskId, taskData) => {
        try {
            const result = await WeeklyTaskRepository.editTask(taskId, taskData);
            return result
        } catch (error) {
            throw new CustomError("Error updating weekly task", 500);
        }
    }   ,

    removeWeeklyTask: async (taskId) => {
        try {
            const result = await WeeklyTaskRepository.removeTask(taskId);
            return result
        } catch (error) {
            throw new CustomError("Error removing weekly task", 500);
        }
    },
    addTaskToCourse: async(data) => {
        try {
            const result = await WeeklyTaskRepository.addTaskCourseRelation(data.weeklyTaskId, data.courseId, data.weekNumber)
            if(!result){
                throw new CustomError("Error happens in adding to course", 400);
            }
           return result;
        } catch (error) {
            throw new CustomError("Error adding weekly task", 500);
        }
    },
    toggleUserBlock: async (userId, block) => {
        try {
            const result = await studentRepository.updateStatus(userId, block);
            return result;
        } catch (error) {
            throw new CustomError("Error toggling user block status", 500);
        }
    },
    getPendingReviews : async () => {
        try {
            const result = await reviewsRepositorty.getAllReviews();
            return result;
        } catch (error) {
            throw new CustomError("Error fetching pending reviews", 500);
        }
    }, 
    assignReviwer: async (reviewId , reviewerId , reviewerName, time) => {
        try {
            const review = await reviewsRepositorty.assingReviwer(reviewId, {reviewerName, reviewerId,  time});
            return review;
        } catch (error) {
            console.log(error, 'error in adminService assignReviwer')
            throw new CustomError("Error assigning reviewer", 500);
        }
    
    }, 
    deleteCourse: async(courseId) => {
        try {
            const result = await courseService.deleteCourse(courseId);
            return result;
        } catch (error) {
            throw new CustomError("Error deleting course", 500);
        }
    }, 
    removeTask: async (taskId, courseId) => {
        try {
            const result = await WeeklyTaskRepository.removeTaskCourseRelation(taskId, courseId);
            return result
        } catch (error) {
            throw new CustomError("Error removing weekly task", 500);
        }
    
    }
}
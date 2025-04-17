import CustomError from "../../utils/customError.js";
import Student from "../student/studentModel.js";
import Reviewer from "../reviwer/reviwerModel.js";
import Course from "../course/courseModel.js";
import { courseService } from "../course/courseService.js";
import { WeeklyTaskRepository } from "../weeklyTask/weeklyTaskRespository.js";



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
    }
}
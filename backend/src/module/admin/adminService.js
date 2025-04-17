import CustomError from "../../utils/customError.js";
import Student from "../student/studentModel.js";
import Reviewer from "../reviwer/reviwerModel.js";
import Course from "../course/courseModel.js";
import { courseService } from "../course/courseService.js";



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
            const reviewers = await Reviewer.find({}).lean();
            if (!reviewers) {
                throw new CustomError("No reviewers found", 404);
            }
            return reviewers;
        } catch (error) {
            throw new CustomError("Error retrieving reviewers", 500);
        }
    }
}
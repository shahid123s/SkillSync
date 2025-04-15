import CustomError from "../../utils/customError.js";
import Student from "../student/studentModel.js";
import Course from "../course/courseModel.js";



export const adminService = {
    getAllUsers: async () => {
        try {
            const users = await Student.find();
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
    }
}
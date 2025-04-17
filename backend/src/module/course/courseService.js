import CustomError from "../../utils/customError.js"
import enrolledCourseRepository from "../enrollerCourse/enrolerCourseRepository.js";
import { courseRepository } from "./courseRepository.js";


export const courseService = {

    getAllCourse: async () => {
        try {
            const result = await courseRepository.getAllCourses();
            console.log(result)
            return result
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },

    getCourse: async (id) => {
        try {
            if(!id){
                throw new CustomError('Course id is required', 400, 'Bad Request');
            }
            const result = await courseRepository.getCourseById(id);

            if(result.length === 0){
                throw new CustomError('Course not found', 404, 'Not Found');
            }
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },

    addCourse: async(courseData) => {
        try {
            console.log(courseData, 'course data')
            const result = await courseRepository.createCourse(courseData);
           
            if(result.length === 0) throw new CustomError('Internet Problem', 500);
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },
    updateCourse: async (id, courseData) => {
        if(!id){
            throw new CustomError('Course id is required', 400, 'Bad Request');
        }   
        if(!courseData){
            throw new CustomError('Course data is required', 400, 'Bad Request');
        }
        try {
            const result = await courseRepository.updateCourse(id, courseData);
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },
    getStudentCourse: async (id) => {
        try {
            const result = await enrolledCourseRepository.getCourseByStudentId(id);
            return result;
        } catch (error) {
            return error;
        }
    },
    checkIsBought: async (courseId, userId) => {
        try {
            const result = await enrolledCourseRepository.checkIsBought(courseId, userId);
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    }
}   
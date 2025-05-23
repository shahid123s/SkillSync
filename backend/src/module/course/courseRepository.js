import Course from './courseModel.js'
import CustomError from '../../utils/customError.js';

export const courseRepository = {
    // Added error handling with CustomError
    getAllCourses: async () => {
        try {
            return await Course
                .find({status: 'active'})
                .lean();
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },

    // Added error handling and null check
    getCourseById: async (id) => {
        try {
            const course = await Course
                .findById(id)
                .lean();
            return course;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },

    // Added validation and error handling
    createCourse: async (courseData) => {
        try {
            const data = new Course(courseData);
            return await data.save()
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },

    // Added validation, error handling and null check
    updateCourse: async (id, course) => {
        try {
            if (!course) {
                throw new CustomError('Course data is required', 400, 'Bad Request');
            }
            const updatedCourse = await Course.findByIdAndUpdate(id, course, { new: true });
            if (!updatedCourse) {
                throw new CustomError('Course not found', 404, 'Not Found');
            }
            return updatedCourse;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },

    // Added error handling and null check
    deleteCourse: async (id) => {
        try {
            const deletedCourse = await Course.findByIdAndDelete(id);
            if (!deletedCourse) {
                throw new CustomError('Course not found', 404, 'Not Found');
            }
            return deletedCourse;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
}
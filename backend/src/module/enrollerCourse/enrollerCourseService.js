import CustomError from "../../utils/customError.js";
import enrolledCourseRepository from "./enrolerCourseRepository.js";

export const enrollerCourseService= {
    paymentSuccess: async ({courseId, paymentStatus, price, userId}) => {
        try {
            const result = await enrolledCourseRepository.enrollerCourse({courseId, paymentStatus, price, userId});
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
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    }
}
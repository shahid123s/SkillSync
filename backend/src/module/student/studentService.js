import { studentRepository } from "./studentRepository.js";
import CustomError from "../../utils/customError.js";
import { reviewsRepositorty } from "../reviews/reviewsRepository.js";

export const studentService = {
    getAllStudent: async () => {
        try {
            const result = await studentRepository.getAllStudents();
            if (!result) {
                throw new CustomError('Student not found', 404, 'Not Found');
            }
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
    getStudent: async (id) => {
        try {
            if (!id) {
                throw new CustomError('Student id is required', 400, 'Bad Request');
            }
            const result = await studentRepository.getStudentById(id);
            if (result.length === 0) {
                throw new CustomError('Student not found', 404, 'Not Found');
            }
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error')
        }
    },
    updateStudent: async (formData) => {
        try {
            const { userId, ...updateData } = formData;
            const result = await studentRepository.updateStudent(userId, updateData);
            if (!result) {
                throw new CustomError('Student not found', 404, 'Not Found');
            }
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
    getReviews: async (studentId) => {
        try {
            const result = await reviewsRepositorty.getReviews(studentId);
            if (!result) {
                throw new CustomError('Reviews not found', 404, 'Not Found');
            }
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    },
    getUpcommingReviews: async (studentId) => {
        try {
            const result = await reviewsRepositorty.getUpcommingReviews(studentId);
            if (!result) {
                throw new CustomError('Reviews not found', 404, 'Not Found');
            }
            result.reviewDate = await new Date(result.reviewDate).toISOString().split('T')[0]
            console.log(result.reviewDate, 'result.reviewDate');
            return result;
        } catch (error) {
            throw new CustomError(error.message, 500, 'Internal Server Error');
        }
    
    }
}
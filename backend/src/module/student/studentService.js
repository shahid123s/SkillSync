import { studentRepository } from "./studentRepository.js";
import CustomError from "../../utils/customError.js";

export const studentService = {
    getAllStudent: async () => {
        try {s
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
    }
}
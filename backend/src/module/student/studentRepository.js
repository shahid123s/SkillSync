import CustomError from '../../utils/customError.js'
import Student from './studentModel.js';



export const studentRepository = {
    // 
    findUserByEmailForAuthenticate: async (email) => {
        try {
            return await Student.findOne({ email });
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },

    // Find the email is already used 
    findStudentEmailForChecking: async ({ email }) => {
        try {
            return await Student.findOne({ email }, '-password');
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },


    // Find Phone is already used 
    findStudentPhoneForChecking: async (phone) => {
        try {
            return await Student.findOne({ phone }, '-password');
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },


    // Create A User 
    createStudent: async (studentData) => {
        try {
            return await Student.create(studentData);
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },



}

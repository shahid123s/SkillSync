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


    getAllStudents: async () => {
        try {
            return await Student.find({},
                '-password -__v -createdAt -updatedAt'
            ).lean();

        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    },

    getStudentById:async (id) =>{
        try {
            return await Student.findById(id, '-password');
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    },

    updateStudent: async (userId, updateData) => {
        try {
            return await Student.findByIdAndUpdate(userId, updateData, { new: true });
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    },
    updateStatus: async (userId, block) => {
        try {
            const student = await Student.findById(userId);
            return await Student.findByIdAndUpdate(userId, {isBlock: block}, { new: true });        
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    },
    deleteStudent: async (userId) => {
        try {
            return await Student.findByIdAndDelete(userId);
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    }

}

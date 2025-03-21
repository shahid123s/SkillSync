import CustomError from '../../utils/customError.js'
import User from './studentModel.js';



export const studentRepository = {
    findUserByEmailForAuthenticate: async (email) => {
        try {
            return await User.findOne(email);
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    }
}

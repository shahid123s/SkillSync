import { generateAccessToken, generateRefreshToken } from "../../utils/jwtUtil";
import { userRepository } from "../user/userRepository"
import { comparePassword } from "./utils/bcryptUtils";


export const authServices = {
    student: {
        login: async (email, password) => {
            try {
                const student = await userRepository.findStudentByEmailForAuthenticate(email);

                if (!student || student.role != 'student') {
                    throw new Error('Invalide Crendentials', 406);
                }

                const isMatch = await comparePassword(password, student.password);
                if (!isMatch) {
                    throw new Error('Invalid Crendentials', 406);
                };

                const [accessToken, refreshToken] = await Promise.all([
                    generateAccessToken(student._id, student.role),
                    generateRefreshToken(student._id, student.role),
                ]);

                return { accessToken, refreshToken, username: student.username }
            } catch (error) {
                throw new Error(
                    error.message,
                    500,
                )
            }

        },

        register: async (userData ={} )
    },
    admin: {

    },
    reviewer: {

    }

}




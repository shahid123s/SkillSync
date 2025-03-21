import CustomError from "../../utils/customError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtUtil.js";
import { studentRepository } from "../student/studentRepository.js";
import { comparePassword, hashPassword } from "./utils/bcryptUtils.js";


export const authServices = {
    studentAuthService: {
        login: async (email, password) => {
            try {
                const student = await studentRepository.findStudentByEmailForAuthenticate(email);

                if (!student || student.role != 'student') {
                    throw new CustomError('Invalide Crendentials', 406);
                }

                const isMatch = await comparePassword(password, student.password);
                if (!isMatch) {
                    throw new CustomError('Invalid Crendentials', 406);
                };

                const [accessToken, refreshToken] = await Promise.all([
                    generateAccessToken(student._id, student.role),
                    generateRefreshToken(student._id, student.role),
                ]);

                return { accessToken, refreshToken, username: student.username }
            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }

        },

        // Checks the email and phone is exists if it is not throw error else create user and return to the controller
        register: async (userData ={} ) => {
            try {
                let [isEmailExist, isPhoneExists] = await Promise.all([
                    studentRepository.findStudentEmailForChecking(userData.email),
                    studentRepository.findStudentPhoneForChecking(userData.phone),
                ]);
                if(isEmailExist, isPhoneExists){
                    throw new CustomError('Email or Phone number is already exists', 406)
                }
                userData.password = await hashPassword(userData.password)
                console.log(userData.password, 'password on student Service')
                let student = await studentRepository.createStudent(userData);
                return student;

            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }
        }
    },
    adminAuthService: {

    },
    reviewerAuthService: {

    }

}




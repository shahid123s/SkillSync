import CustomError from "../../utils/customError.js";
import { decodeRefreshToken, generateAccessToken, generateRefreshToken } from "../../utils/jwtUtil.js";
import { reviewerRepository } from "../reviwer/reviwerRepository.js";
import { studentRepository } from "../student/studentRepository.js";
import { comparePassword, hashPassword } from "./utils/bcryptUtils.js";


export const authServices = {
    studentAuthService: {
        login: async (email, password) => {
            console.log(email)
            try {
                const student = await studentRepository.findUserByEmailForAuthenticate(email);

                if (!student || student.role != 'user') {
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
        },


        refreshTokeh: async (refreshToken) => {
            try {
                const decoded = await decodeRefreshToken(refreshToken);
                const accessToken = await generateAccessToken(decoded.userId, decoded.role);
                return accessToken;
            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }
        }

        
    },
    reviewerAuthService: {
        reviewerLogin: async (email, password) => {
            try {
                const reviewer = await reviewerRepository.getReviwerByEmailForAuthentication(email);
                if (!reviewer || reviewer.role != 'reviewer') {
                    throw new CustomError('Invalide Crendentials', 406);
                }

                const isMatch = await comparePassword(password, reviewer.password);
                if (!isMatch) {
                    throw new CustomError('Invalid Crendentials', 406);
                };

                const [accessToken, refreshToken] = await Promise.all([
                    generateAccessToken(reviewer._id, reviewer.role),
                    generateRefreshToken(reviewer._id, reviewer.role),
                ]);

                return { accessToken, refreshToken, username: reviewer.username }
            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }

        },
        
        createReviwer: async  (reviwerData) => {
            try {
                let [isEmailExist, isPhoneExists] = await Promise.all([
                    reviewerRepository.findReviwerEmailForChecking(reviwerData.email),
                    reviewerRepository.findReviwerPhoneForChecking(reviwerData.phone),
                ]);
                if(isEmailExist, isPhoneExists){
                    throw new CustomError('Email or Phone number is already exists', 406)
                }
                reviwerData.password = await hashPassword(reviwerData.password)
                let reviewer = await reviewerRepository.createReviwer(reviwerData);
                return reviewer;

            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }
        },

        reviewrRefreshToken: async (refreshToken) => {
            try {
                const decoded = await decodeRefreshToken(refreshToken);
                const accessToken = await generateAccessToken(decoded.userId, decoded.role);
                return accessToken;
            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }
        },



    },
    adminAuthService: {

        adminLogin: async (email, password) => {
            try {
                const reviewer = await adminRepository.getReviwerByEmailForAuthentication(email);
                if (!reviewer || reviewer.role != 'admin') {
                    throw new CustomError('Invalide Crendentials', 406);
                }

                const isMatch = await comparePassword(password, reviewer.password);
                if (!isMatch) {
                    throw new CustomError('Invalid Crendentials', 406);
                };

                const [accessToken, refreshToken] = await Promise.all([
                    generateAccessToken(reviewer._id, reviewer.role),
                    generateRefreshToken(reviewer._id, reviewer.role),
                ]);

                return { accessToken, refreshToken, username: reviewer.username }
            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }

        },

        adminRegister: async (adminData) => {
            try {
                adminData.password = await hashPassword(adminData.password)
                let admin = await adminRepository.createAdmin(adminData);
                return admin;
            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }
        },

        adminRefreshToken: async (refreshToken) => {
            try {
                const decoded = await decodeRefreshToken(refreshToken);
                const accessToken = await generateAccessToken(decoded.userId, decoded.role);
                return accessToken;
            } catch (error) {
                throw new CustomError(
                    error.message,
                    500,
                )
            }
        }

    },
}




import CustomError from "../../utils/customError.js";
import { adminLogin } from "../auth/authController";
import Admin from './adminModel.js';

export const adminRepository ={
    findAdminForAuthentication : async (email) => {
        try {
            return await Admin.findOne({ email });
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    },

    createAdmin: async (adminData) => {
        try {
            const admin = new Admin(adminData);
            return await admin.save();
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    }
}
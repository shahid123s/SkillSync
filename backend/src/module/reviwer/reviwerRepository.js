import Reviwer from './reviwerModel.js';
import CustomError from '../../utils/customError.js';


export const reviewerRepository = {
        getReviwerByEmailForAuthentication: async (email) => {
        try {
            return await Reviwer.findOne({ email });
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },

    findReviwerEmailForChecking: async (email) => {
        try {
            const reviwer = await Reviwer.findOne({ email }, '-password');
            return reviwer ? true : false;
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },

    findReviwerPhoneForChecking: async (phone) => {
        try {
            const reviwer = await Reviwer.findOne({ phone }, '-password');
            return reviwer ? true : false;
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },

    createReviwer: async (reviwerData) => {
        try {
            const reviwer = new Reviwer(reviwerData);
            return await reviwer.save();
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },

    

}


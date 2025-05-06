import { Review } from "./reviewsModel.js"; 
import CustomError from "../../utils/customError.js";

export const reviewsRepositorty = {
    createReviews: async (data) => {
        try {
            const review = await Review.create(data);
            return review;
        } catch (error) {
            throw new CustomError("Error creating review", 500);
        }
    },

    getReviews: async (studentId) => {
        const reviews = await Review.find({ studentId, status: { $nin: ['pending', 'accepted'] } }).populate('taskId');
        return reviews;
    },
    getUpcommingReviews: async (studentId) => {
        const reviews = await Review.findOne({ studentId, status: { $in: ['pending', 'accepted'] } }).populate('taskId');
        return reviews;
    }
}
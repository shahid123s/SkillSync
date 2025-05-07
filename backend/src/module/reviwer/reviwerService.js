import CustomError from "../../utils/customError.js";
import { reviewsRepositorty } from "../reviews/reviewsRepository.js";
import { reviewerRepository } from "./reviwerRepository.js";

export const reviewerService = {
   getReviewerProfile: async (id) => {
    console.log(id, 'Service Id')
    try {
        const result = await reviewerRepository.fetchReviewerProfile(id);
        return result;
    } catch (error) {
        throw new CustomError(
            error.message,
            500,
        );
    }
   },
   getReviewerStatus: async (id) => {
    try {
        const result = await reviewerRepository.getReviewerStatus(id);
        return result;
    } catch (error) {
        throw new CustomError(
            error.message,
            500,
        );
    }
   }, 
   getPendingReviews: async (id) => {
    try {
        const result = await reviewsRepositorty.getReviewsForReviewer(id);
        return result;
    } catch (error) {
        throw new CustomError(
            error.message,
            500,
        );
    }
   } , 
   updateReviews: async (reviewerId, status) => {
        try {
            return await reviewsRepositorty.updateStatus(reviewerId, status)
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
   }
}
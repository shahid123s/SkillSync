import { reviewerRepository } from "./reviwerRepository.js";

export const reviewerService = {
   getReviewerProfile: async (id) => {
    try {
        const result = await reviewerRepository.fetchReviewerProfile(id);
        return result;
    } catch (error) {
        throw new CustomError(
            error.message,
            500,
        );
    }
   }
}
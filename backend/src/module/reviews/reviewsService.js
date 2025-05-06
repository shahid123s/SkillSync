import { reviewsRepositorty } from "./reviewsRepository.js";


export const reviewsService = {
    createReviews: async (data) => {
        const review = await reviewsRepositorty.createReviews(data);
        return review;
    },

    getReviews: async (courseId) => {
        const reviews = await reviewsRepositorty.getReviews(courseId);
        return reviews;
    }
}
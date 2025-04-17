 import { reviewerService } from "./reviwerService.js";
 export const reviewerController = {
    getReviewer: async (req, res, next) => {
        try {
            const {reviewerId} = req.query || req.params;

            const result = await  reviewerService.getReviewerProfile(reviewerId);

            if(!result){
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'Reviewer not found',
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Reviewer found',
                    data: result
                })
        } catch (error) {
            next(error)
        }
    },
 }
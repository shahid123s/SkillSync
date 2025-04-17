 import { reviewerService } from "./reviwerService.js";
 export const reviewerController = {
    getReviewer: async (req, res, next) => {
        try {
            let {reviewerId} = req.params || req.reviewer;
            reviewerId = reviewerId || req.reviewer
            console.log(reviewerId, 'Controller Id ');
            const result = await  reviewerService.getReviewerProfile(reviewerId);

            console.log(result, 'result');

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
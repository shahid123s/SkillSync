 import { reviewerService } from "./reviwerService";
 export const reviewerController = {
    getReviewer: (req, res, next) => {
        try {
            const {id} = req.query;
            const result = reviewerService.getReviewerProfile(id);
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
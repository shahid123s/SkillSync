 import { reviewerService } from "./reviwerService.js";
 export const reviewerController = {
    getReviewer: async (req, res, next) => {
        try {
            const reviewerId = req.params.reviewerId || req.reviewer || req.user; // Try all valid paths
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
    getReviewerStatus: async(req, res, next) => {
        try {
            console.log((req.reviewer))
            const reviewerId = req.params.reviewerId || req.reviewer || req.user; // Try all valid paths
            const result = await  reviewerService.getReviewerStatus(reviewerId);



            if(!result){
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'Reviewer n not found',
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
    getPendingReviews: async(req, res, next) => {
        try {
            const reviewerId =  req.reviewer; // Try all valid paths
            console.log(reviewerId, 'Controller Id ', req.reviewer);
            const result = await  reviewerService.getPendingReviews(reviewerId);

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
    toggleStatus: async(req, res, next) => {
        try {
            const {reviweId, status} = req.body;
        const result = await reviewerService.updateReviews(reviweId, status);
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
    }
         catch (error) {
            next()
        }
 }}
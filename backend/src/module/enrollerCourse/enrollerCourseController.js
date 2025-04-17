import { enrollerCourseService } from "./enrollerCourseService.js";


export const enrollerCourseController = {
 paymentSuccess: async (req, res, next) => {
        try {
            const {courseId, paymentStatus, price} = req.body;
            const userId = req.user;
            console.log(courseId, paymentStatus, price, userId)
            const result = await enrollerCourseService.paymentSuccess({courseId, paymentStatus, price, userId});
            if(!result){
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'Payment Failed',
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Payment Success',
                    data: result
                })
        } catch (error) {
            next(error)
        }
 }
}




// courseId , paymentStatus,  price userId = req.user ;
import { courseService } from "./courseService.js";



export const getAllCourses = async (req, res, next ) => {
    try {
        console.log("hi")
        const result = await courseService.getAllCourse();
        if(!result){
            return res
                .status(404)
                .json({
                    success: false,
                    message: 'Course not found',
                })
        }   
        return res.status(200).json({
            success: true,
            message: 'Course found',
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const getCourse = async (req, res, next) => {
    try {
        const {courseId}  = req.query ;
    
        const result = await courseService.getCourse(courseId);
        console.log(result)
        if(!result){
            return res
                .status(404)
                .json({
                    success: false,
                    message: 'Course not found',
                })
        }
        return res
            .status(200)
            .json({
                success: true,
                message: 'Course found',
                data: result
            })


    } catch (error) {
        next()
    }
}


// export const addCourse = async (req, res, next) => {
//     try {
//         const {courseData} = req.body;
//         console.log(req.body, 'body')
//         const result = await courseService.addCourse(req.body);
//         if(!result) {
//             return res
//             .status(404)
//             .json({
//                 success: false,
//                 message: `Course didn't add`,
           
//             });
//         }
//         console.log(result, 'result')
//         return res
//         .status(200)
//         .json({
//             success: true,
//             message: "Course Add Successfully",
//             data : result
//         })
//     } catch (error) {
//         next()
//     }
// }


export const updateCourse = async (req, res, next) => {
    try {
        const {courseId} = req.params;
        const courseData = req.body;

        const result = await courseService.updateCourse(courseId, courseData);
        if(!result){
            return res
                .status(404)
                .json({
                    success: false,
                    message: 'Course not found',
                })
        }
        return res
            .status(200)
            .json({
                success: true,
                message: 'Course updated successfully',
                data: result
            })
    } catch (error) {
        next()
    }
}




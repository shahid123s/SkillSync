import { courseRepository } from "./courseRepository";
import { courseService } from "./courseService";



export const getAllCourses = async (req, res, next ) => {
    try {
        const result = await courseService.getAllCourse();
    } catch (error) {
        next(error)
    }
};

export const getCourse = async (req, res, next) => {
    try {
        const {courseId}  = req.query || req.params;

        const result = await courseService.getCourse(courseId);
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


export const addCourse = async (req, res, next) => {
    try {
        const {courseData} = req.body;
        const result = await courseService.addCourse(courseData);
        if(!result) {
            return res
            .status(404)
            .json({
                success: false,
                message: `Course didn't add`,
            });
        }
        return res
        .status(200)
        .json({
            success: true,
            message: "Course Add Successfully",
        })
    } catch (error) {
        next()
    }
}





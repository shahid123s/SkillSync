import {studentService} from './studentService.js';

export const studentController = {
    getAllStudent: async (req, res, next) => {
        try {
            const result = await studentService.getAllStudent();
            if(!result){
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'Student not found',
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Student found',
                    data: result
                })
        } catch (error) {
            next()
        }
    },

    getStudent: async (req, res, next) => {
        try {
            const {id} = req.query;
            const result = await studentService.getStudent(id);
            if(!result){
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'Student not found',
                    })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Student found',
                    data: result
                })
        } catch (error) {
            next()
        }
    }
}
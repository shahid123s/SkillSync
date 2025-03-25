import {taskService} from  './taskService.js'

export const taskController = {
    getAllTasks: async (req, res, next) => {
        try {
            const tasks = await taskService.getAllTasks();
            return res
                .status(200)
                .json({
                    success: true,
                    tasks
                })
        } catch (error) {
            next(error)
        }
    },

    getTask: async (req, res, next) => {
        try {
            const {_id} = req.params;
            const task = await taskService.getTask(_id);
            return res
                .status(200)
                .json({
                    success: true,
                    task
                })  
        } catch (error) {
            next(error)
        }
    },
    createTask: async(req, res, next) => {
        try {
            const taskData = req.body;
            const task = await taskService.createTask(taskData);
            return res
                .status(201)
                .json({
                    success: true,
                    task
                })
        } catch (error) {
            next(error)
        }
    },
    updateTask: async(req, res, next) => {
        try {
            const {_id} = req.query || req.params;
            const taskData = req.body;
            const task = await taskService.updateTask(_id, taskData);
            return res
                .status(200)
                .json({
                    success: true,
                    task
                })
        } catch (error) {
            next(error)
        }
    },
    deleteTask: async(req, res, next) => {
        try {
            const {_id} = req.params;
            const task = await taskService.deleteTask(_id);
            return res
                .status(200)
                .json({
                    success: true,
                    task
                })
        } catch (error) {
            next(error)
        }
    },
    getCourseTasks: async(req, res, next) => {
        try {
            const {courseId} = req.params;
            const tasks = await taskService.getCourseTasks(courseId);
            return res
                .status(200)
                .json({
                    success: true,
                    tasks
                })
        } catch (error) {
            next(error)
        }
    },
    getCourseWeekTask: async(req, res, next) => {
        try {
            const {courseId, week} = req.params;
            const tasks = await taskService.getCourseWeekTask(courseId, week);
            return res
                .status(200)
                .json({
                    success: true,
                    tasks
                })
        } catch (error) {
            next(error)
        }
    },
}
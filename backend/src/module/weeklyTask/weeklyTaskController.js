import {weeklyTaskService} from './weeklyTaskService.js';

export const createTask = async (req, res, next) => {
  try {
    const taskData = req.body;
    const newTask = await weeklyTaskService.createWeeklyTask(taskData);
    if (!newTask) {
        return res.status(400).json({ message: 'Task creation failed' });
    }
    res.status(201).json(newTask);
  } catch (error) {
    next(error)
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedTask = await weeklyTaskService.updateWeeklyTask(id, updates);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await weeklyTaskService.deleteWeeklyTask(id);
    if (!result) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await weeklyTaskService.getWeeklyTaskById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await weeklyTaskService.getAllWeeklyTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const associateTaskWithCourse = async (req, res, next) => {
  try {
    const { taskId, courseId } = req.body;
    const linkedTask = await weeklyTaskService.linkTaskToCourse(taskId, courseId);
    res.json(linkedTask);
  } catch (error) {
    next(error);
  }
};

export const removeTaskFromCourse = async (req, res, next) => {
  try {
    const { taskId, courseId } = req.body;
    const unlinkedTask = await weeklyTaskService.unlinkTaskFromCourse(taskId, courseId);
    res.json(unlinkedTask);
  } catch (error) {
    next(error);
  }
};
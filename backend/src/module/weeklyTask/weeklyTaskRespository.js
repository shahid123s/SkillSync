import CustomError from '../../utils/customError.js';
import { WeeklyTask, WeeklyTaskCourse } from './weeklyTaksModel.js';

export const WeeklyTaskRepository = {
  // Add new task
  async addTask(taskData) {
    try {
      const task = await WeeklyTask.create(taskData);
      return task;
    } catch (error) {
      throw new CustomError('Error creating task: '+ error.message, 500);
    }
  },

  // Edit existing task
  async editTask(taskId, updatedData) {
    try {
      const task = await WeeklyTask.findByIdAndUpdate(
        taskId,
        updatedData,
        { new: true }
      );
      return task;
    } catch (error) {
      throw new CustomError('Error updating task: ' + error.message, 500);
    }
  },

  // Remove task
  async removeTask(taskId) {
    try {
      await WeeklyTask.findByIdAndDelete(taskId);
      return true;
    } catch (error) {
      throw new CustomError('Error removing task: ' + error.message, 500);
    }
  },

  // Add task-course relation
  async addTaskCourseRelation(taskId, courseId, weekNum) {
    try {
      const relation = await WeeklyTaskCourse.create({
        taskId,
        courseId,
        weekNum
      });
      return relation;
    } catch (error) {
      throw new CustomError('Error adding task-course relation: ' + error.message, 500);
    }
  },

  // Remove task-course relation
  async removeTaskCourseRelation(taskId, courseId) {
    try {
      await WeeklyTaskCourse.findOneAndDelete({
        taskId,
        courseId
      });
      return true;
    } catch (error) {
      throw new CustomError('Error removing task-course relation: ' + error.message, 500);
    }
  },

  // Get tasks by course and week
  async getTasksByCourseAndWeek(courseId, weekNum) {
    try {
      const relations = await WeeklyTaskCourse.find({
        courseId,
        weekNum
      }).populate('taskId');
      return relations.map(relation => relation.taskId);
    } catch (error) {
      throw new CustomError('Error fetching tasks: ' + error.message, 500);
    }
  }
};

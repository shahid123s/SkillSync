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
  async addTaskCourseRelation(weeklyTaskId, courseId, weekNum) {
    console.log(weekNum)
    try {
      const relation = await WeeklyTaskCourse.create({
        weeklyTaskId,
        courseId,
        weekNum
      });
      return relation;
    } catch (error) {
        console.log(error, 'error in Repo weeklyTask')
      throw new CustomError('Error adding task-course relation: ' + error.message, 500);
    }
  },

  // Remove task-course relation
  async removeTaskCourseRelation(taskId, courseId) {
    try {
      console.log(taskId, courseId, 'in repo')
      const result = await WeeklyTaskCourse.findOneAndDelete({
        weeklyTaskId:taskId,
        courseId
      });
      console.log(result, 'result in repo')
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
  },
  async getAllTasks() {
    try {
        const allTasks = await WeeklyTask.find();
    
        const tasksWithCourses = await Promise.all(
          allTasks.map(async (task) => {
            const taskCourses = await WeeklyTaskCourse.find({ weeklyTaskId: task._id })
              .populate('courseId', 'name description') // Only get needed fields
            
            return {
              ...task.toObject(),
              assignedWeeks: taskCourses.map(tc => ({
                weekNumber: tc.weekNum,
                course: tc.courseId ? {
                  _id: tc.courseId._id,
                  name: tc.courseId.name,
                  description: tc.courseId.description
                } : null
              }))
            };
          })
        );
        
        return tasksWithCourses;
    } catch (error) {
      throw new CustomError('Error fetching tasks: ' + error.message, 500);
    }
  },
  getNextTask: async (weekNum, courseId) => {
    try {
        const nextTask = await WeeklyTaskCourse.findOne({
            weekNum,
            courseId
        })
        .populate('weeklyTaskId');

        return nextTask ? nextTask.weeklyTaskId : null;
    } catch (error) {
        throw new CustomError('Error fetching next task: ' + error.message, 500);
    }

  }
};

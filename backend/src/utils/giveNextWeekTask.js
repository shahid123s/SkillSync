import { WeeklyTaskRepository } from "../module/weeklyTask/weeklyTaskRespository.js";

export const nextWeeekTask = async (week, courseId) => {
console.log(week, courseId, 'week and courseId in function')
    const nextTask = await WeeklyTaskRepository.getNextTask(week +1, courseId)
    console.log(nextTask, 'nextTask in function')
    return nextTask;
}
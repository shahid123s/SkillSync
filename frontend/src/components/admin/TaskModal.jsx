// components/admin/TaskModal.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function TaskModal({ isOpen, onClose, course, task, onSave, existingTasks }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const weekNumber = watch('weekNumber');

  // Initialize form
  useEffect(() => {
    if (isOpen) {
      if (task) {
        reset({
          ...task,
          courseId: course._id
        });
      } else {
        reset({
          courseId: course?._id,
          weekNumber: '',
          description: ''
        });
      }
    }
  }, [isOpen, task, course, reset]);

  // Validate week number uniqueness
  useEffect(() => {
    if (weekNumber) {
      const isDuplicate = existingTasks.some(
        t => t.weekNumber === parseInt(weekNumber) && (!task || t._id !== task._id)
      );
      
      if (isDuplicate) {
        setError('weekNumber', {
          type: 'manual',
          message: 'This week number already exists for this course'
        });
      } else {
        clearErrors('weekNumber');
      }
    }
  }, [weekNumber, existingTasks, task, setError, clearErrors]);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      weekNumber: parseInt(data.weekNumber),
      courseId: course._id
    };
    onSave(finalData);
  };

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {task ? 'Edit Task' : 'Add New Task'} for {course.name}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Week Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Week Number*</label>
              <input
                {...register('weekNumber', {
                  required: 'Week number is required',
                  min: { value: 1, message: 'Week number must be at least 1' },
                  max: { value: 52, message: 'Week number must be at most 52' }
                })}
                type="number"
                min="1"
                max="52"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 p-2"
              />
              {errors.weekNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.weekNumber.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Task Description*</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Hidden course ID */}
            <input type="hidden" {...register('courseId')} />

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || errors.weekNumber}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
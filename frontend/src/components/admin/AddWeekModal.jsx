// components/admin/AddWeekModal.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AddWeekModal({ isOpen, onClose, task, courses, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchTerm, setSearchTerm] = useState('');
  const weekNumber = watch('weekNumber');
  const courseId = watch('courseId');

  useEffect(() => {
    if (isOpen) {
      reset({
        taskId: task?._id,
        courseId: '',
        weekNumber: ''
      });
      setSearchTerm('');
    }
  }, [isOpen, task, reset]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCourses(courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredCourses(courses);
    }
  }, [searchTerm, courses]);

  useEffect(() => {
    if (weekNumber && courseId && task) {
      const isDuplicate = task.weeks?.some(
        week => week.weekNumber === parseInt(weekNumber) && week.courseId === courseId
      );
      
      if (isDuplicate) {
        setError('weekNumber', {
          type: 'manual',
          message: 'This week number already exists for the selected course'
        });
      } else {
        clearErrors('weekNumber');
      }
    }
  }, [weekNumber, courseId, task, setError, clearErrors]);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      weekNumber: parseInt(data.weekNumber)
    };
    onSave(finalData);
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Add Week to Task: {task.title}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Course*</label>
              
              <select
                {...register('courseId', { required: 'Course selection is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 p-2"
              >
                <option value="">Select a course</option>
                {filteredCourses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {errors.courseId && (
                <p className="text-red-500 text-xs mt-1">{errors.courseId.message}</p>
              )}
            </div>

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

            {/* Hidden task ID */}
            <input type="hidden" {...register('taskId')} />

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
                {isSubmitting ? 'Saving...' : 'Add Week'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
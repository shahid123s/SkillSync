// components/admin/TaskFormModal.jsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function TaskFormModal({ isOpen, onClose, task, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      // Convert array to newline-separated string for textarea
      let initialDescription = '';
      if (task?.description) {
        if (Array.isArray(task.description)) {
          initialDescription = task.description.join('\n');
        } else if (typeof task.description === 'string') {
          // Handle legacy string format if needed
          initialDescription = task.description;
        }
      }

      reset({
        title: task?.title || '',
        description: initialDescription
      });
    }
  }, [isOpen, task, reset]);

  const onSubmit = (data) => {
    // Convert newlines to array and clean up
    const processedData = {
      ...data,
      description: data.description
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
    };
    onSave(processedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title*</label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 p-2"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description*</label>
              <textarea
                {...register('description', { 
                  required: 'Description is required',
                  validate: value => {
                    const lines = value.split('\n').filter(line => line.trim().length > 0);
                    return lines.length > 0 || 'At least one description line is required';
                  }
                })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 whitespace-pre-wrap"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Enter each description point on a new line
              </p>
            </div>

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
                disabled={isSubmitting}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center min-w-[100px]"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : 'Save Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
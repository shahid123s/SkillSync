import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function CourseForm({ isOpen, onClose, course, onSave }) {
  const { 
    register, 
    handleSubmit, 
    reset, 
    watch,
    formState: { errors } 
  } = useForm();

  const hasOffer = watch('hasOffer');
  const price = watch('price');
  const offerPrice = watch('offerPrice');
  const imageUrl = watch('imageUrl');

  useEffect(() => {
    if (course) {
      reset({
        ...course,
        hasOffer: course.offerPrice !== null && course.offerPrice > 0
      });
    } else {
      reset({
        name: '',
        description: '',
        imageUrl: '',
        price: 0,
        offerPrice: 0,
        hasOffer: false,
        status: 'draft'
      });
    }
  }, [course, reset]);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      price: Number(data.price),
      offerPrice: data.hasOffer ? Number(data.offerPrice) : null
    };
    onSave(finalData);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? '' : 'hidden'} z-50`}>
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"> {/* Scrollable modal */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {course ? 'Edit Course' : 'Create Course'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Course Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Name*</label>
              <input
                {...register('name', { required: 'Course name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            {/* Image URL Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course Image
              </label>
              <div className="mt-1 flex flex-col gap-2">
                <input
                  {...register('imageUrl')}
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Image URL or upload file"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      reset({ ...watch(), imageUrl: url });
                    }
                  }}
                />
              </div>
              {imageUrl && (
                <div className="mt-2">
                  <img 
                    src={imageUrl} 
                    alt="Course preview" 
                    className="h-32 w-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Pricing Section */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-medium text-gray-900">Pricing (₹)</h3> {/* Changed to Indian Rupees */}

              {/* Regular Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Regular Price*</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span> {/* Changed to ₹ */}
                  </div>
                  <input
                    {...register('price', { 
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' },
                      valueAsNumber: true
                    })}
                    type="number"
                    step="0.01"
                    min="0"
                    className="block w-full pl-7 pr-12 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    placeholder="0.00"
                  />
                </div>
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
              </div>

              {/* Offer Section */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    {...register('hasOffer')}
                    type="checkbox"
                    id="hasOffer"
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="hasOffer" className="ml-2 block text-sm text-gray-700">
                    Enable Special Offer
                  </label>
                </div>

                {hasOffer && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Offer Price*</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₹</span> {/* Changed to ₹ */}
                      </div>
                      <input
                        {...register('offerPrice', { 
                          required: hasOffer ? 'Offer price is required' : false,
                          min: { value: 0, message: 'Offer must be positive' },
                          max: { 
                            value: price || 0, 
                            message: 'Offer price must be less than regular price' 
                          },
                          valueAsNumber: true
                        })}
                        type="number"
                        step="0.01"
                        min="0"
                        className="block w-full pl-7 pr-12 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        placeholder="0.00"
                      />
                    </div>
                    {errors.offerPrice && (
                      <p className="text-red-500 text-xs mt-1">{errors.offerPrice.message}</p>
                    )}
                    {offerPrice >= price && hasOffer && (
                      <p className="text-yellow-600 text-xs mt-1">
                        Offer price should be lower than regular price
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                {...register('status')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Form Actions */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
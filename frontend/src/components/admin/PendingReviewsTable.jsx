// components/admin/PendingReviewsTable.jsx
import { User, Calendar, Book, Info, Clock, Check } from 'lucide-react';
import { useState } from 'react';

export const PendingReviewsTable = ({ reviews, reviewers, onAssign, processingId }) => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedReviewer, setSelectedReviewer] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleAssign = () => {
        if (!selectedReviewer) {
            toast.error('Please select a reviewer');
            return;
        }
        if (!selectedDate || !selectedTime) {
            toast.error('Please select date and time');
            return;
        }
        
        const reviewDateTime = new Date(`${selectedDate}T${selectedTime}`);
        onAssign(selectedReview._id, selectedReviewer, reviewDateTime);
        setSelectedReview(null);
    };

    const getAvailableSlots = (reviewerId) => {
        const reviewer = reviewers.find(r => r._id === reviewerId);
        if (!reviewer) return [];
        
        // Generate time slots based on reviewer availability
        return [
            '09:00', '10:00', '11:00', '13:00', '14:00', '15:00'
        ];
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Week</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {reviews.map((review) => (
                        <tr key={review._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <User className="h-5 w-5 text-gray-400 mr-2" />
                                    <div>
                                        <p className="font-medium">{review.studentId.name}</p>
                                        <p className="text-sm text-gray-500">{review.studentId.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    Week {review.week}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <Book className="h-5 w-5 text-gray-400 mr-2" />
                                    <div>
                                        <p className="font-medium">{review.taskId.title}</p>
                                        <p className="text-sm text-gray-500 line-clamp-1">{review.taskId.description}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                    {new Date(review.reviewDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => setSelectedReview(review)}
                                    className="text-teal-600 hover:text-teal-900 flex items-center"
                                    disabled={processingId === review._id}
                                >
                                    <Check className="h-5 w-5 mr-1" />
                                    Assign
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Assign Reviewer Modal */}
            {selectedReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Assign Reviewer</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Reviewer
                                </label>
                                <select
                                    value={selectedReviewer}
                                    onChange={(e) => {
                                        setSelectedReviewer(e.target.value);
                                        setSelectedDate('');
                                        setSelectedTime('');
                                    }}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    disabled={processingId === selectedReview?._id}
                                >
                                    <option value="">Choose a reviewer</option>
                                    {reviewers.map((reviewer) => (
                                        <option key={reviewer._id} value={reviewer._id}>
                                            {reviewer.name} ({reviewer.specialty})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedReviewer && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Select Date
                                        </label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => {
                                                setSelectedDate(e.target.value);
                                                setSelectedTime('');
                                            }}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                        />
                                    </div>

                                    {selectedDate && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Select Time Slot
                                            </label>
                                            <select
                                                value={selectedTime}
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                                disabled={!selectedDate}
                                            >
                                                <option value="">Select a time slot</option>
                                                {getAvailableSlots(selectedReviewer).map((time) => (
                                                    <option key={time} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    onClick={() => {
                                        setSelectedReview(null);
                                        setSelectedReviewer('');
                                        setSelectedDate('');
                                        setSelectedTime('');
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAssign}
                                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50"
                                    disabled={!selectedReviewer || !selectedDate || !selectedTime || processingId === selectedReview?._id}
                                >
                                    {processingId === selectedReview?._id ? (
                                        'Assigning...'
                                    ) : (
                                        'Confirm Assignment'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
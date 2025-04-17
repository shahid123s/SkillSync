// components/admin/PendingReviewers.jsx
export default function PendingReviewers({ reviewers, onAction, processingId }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviewers.length !== 0 ? reviewers.map(reviewer => (
            <tr key={reviewer._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{reviewer.fullname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{reviewer.email}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button
                  onClick={() => onAction(reviewer._id, 'approve')}
                  disabled={processingId === reviewer._id}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-100"
                >
                  {processingId === reviewer._id ? (
                    <span className="flex items-center gap-1">
                      <svg 
                        className="animate-spin h-4 w-4" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        ></circle>
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Approve'}
                </button>
                <button
                  onClick={() => onAction(reviewer._id, 'reject')}
                  disabled={processingId === reviewer._id}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-100"
                >
                  {processingId === reviewer._id ? (
                    <span className="flex items-center gap-1">
                      <svg 
                        className="animate-spin h-4 w-4" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        ></circle>
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Reject'}
                </button>
              </td>
            </tr>
          )) : <tr><td colSpan={3} className="text-center p-5">No pending reviewers</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
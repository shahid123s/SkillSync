// pages/user/WeeklyTaskPage.jsx
import React, { useState } from "react";
import { X, RefreshCw, Clock, FileText } from "lucide-react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";

const WeeklyTaskPage = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  
  // Mock data
  const upcomingTask = {
    weekNumber: 5,
    reviewDate: "Not scheduled yet",
    reviewer: "TBD",
    task: "Complete advanced React patterns implementation"
  };

  const completedTasks = [
    { id: 1, date: "2024-03-15", weekNumber: 4, reviewer: "John Doe", type: "Code Review", status: "Passed" }
  ];

  const taskDetails = {
    1: { mark: 8, feedback: "Excellent implementation! Consider edge cases for more robustness." }
  };

  const TaskDetailsModal = ({ isOpen, onClose, details }) => (
    isOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-center w-full">REVIEW DETAILS</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex gap-2 mb-4">
              <button 
                className={`flex-1 py-2 text-sm ${selectedTab === 'marks' ? 
                  'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500'}`}
                onClick={() => setSelectedTab('marks')}
              >
                Marks
              </button>
              <button 
                className={`flex-1 py-2 text-sm ${selectedTab === 'feedback' ? 
                  'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500'}`}
                onClick={() => setSelectedTab('feedback')}
              >
                Feedback
              </button>
            </div>

            {selectedTab === 'marks' ? (
              details?.mark ? (
                <div className="border rounded-md p-4 mb-4">
                  <div className="font-medium">Mark: {details.mark}/10</div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">No mark available</div>
              )
            ) : (
              details?.feedback ? (
                <div className="border rounded-md p-4">
                  <p>{details.feedback}</p>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">No feedback available</div>
              )
            )}
          </div>

          <div className="flex justify-center mt-6">
            <button 
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition-colors"
              onClick={onClose}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    )
  );

  const CompletedTasks = () => {
    const getStatusStyle = (status) => {
      const styles = {
        Passed: 'bg-green-100 text-green-800',
        Repeat: 'bg-red-100 text-red-800',
        Absent: 'bg-yellow-100 text-yellow-800'
      };
      return styles[status] || 'bg-gray-100 text-gray-800';
    };

    return (
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 text-center p-3 text-sm font-medium">Sl No</th>
              <th className="text-left p-3 text-sm font-medium">Date</th>
              <th className="text-left p-3 text-sm font-medium">Week</th>
              <th className="text-left p-3 text-sm font-medium">Reviewer</th>
              <th className="text-left p-3 text-sm font-medium">Type</th>
              <th className="text-left p-3 text-sm font-medium">Status</th>
              <th className="text-center p-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map((task, index) => (
              <tr key={task.id} className="border-t">
                <td className="text-center p-3">{index + 1}</td>
                <td className="p-3">{task.date}</td>
                <td className="p-3">{task.weekNumber}</td>
                <td className="p-3">{task.reviewer}</td>
                <td className="p-3">{task.type}</td>
                <td className="p-3">
                  <span className={`${getStatusStyle(task.status)} px-2 py-1 rounded-full text-xs`}>
                    {task.status}
                  </span>
                </td>
                <td className="text-center p-3">
                  <button 
                    className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-xs"
                    onClick={() => setSelectedTaskId(task.id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const UpcomingTask = () => (
    <div className="bg-gray-100 border-0 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <span className={`bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm 
                          flex items-center gap-1`}>
          <Clock className="h-4 w-4" />
          Not Scheduled
        </span>
        <h2 className="text-xl font-semibold">Week {upcomingTask.weekNumber}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-md p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Review Date</p>
          <p className="font-medium">{upcomingTask.reviewDate}</p>
        </div>
        <div className="bg-white rounded-md p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Reviewer</p>
          <p className="font-medium">{upcomingTask.reviewer}</p>
        </div>
      </div>

      <div className="bg-white rounded-md p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <p className="text-sm text-gray-500">Task Details</p>
        </div>
        <p className="font-medium">{upcomingTask.task}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reviews</h1>
          <button className="p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b mb-6">
          <div className="flex gap-8">
            <button
              className={`pb-2 px-1 ${selectedTab === 'upcoming' ? 
                'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('upcoming')}
            >
              UPCOMING
            </button>
            <button
              className={`pb-2 px-1 ${selectedTab === 'completed' ? 
                'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500'}`}
              onClick={() => setSelectedTab('completed')}
            >
              COMPLETED
            </button>
          </div>
        </div>

        {selectedTab === 'upcoming' ? <UpcomingTask /> : <CompletedTasks />}
        
        <TaskDetailsModal 
          isOpen={!!selectedTaskId} 
          onClose={() => setSelectedTaskId(null)}
          details={taskDetails[selectedTaskId]} 
        />
      </main>

      <Footer />
    </div>
  );
};

export default WeeklyTaskPage;
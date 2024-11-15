import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleTaskAPI, updateTaskAPI } from '../services/allApi';

const EditTask = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [TaskDetails, setTaskDetails] = useState({
      title: "",
      description: "",
      status: "",
      progress:0
    });

    useEffect(() => {
        const fetchTaskDetails = async () => {
          try {
            const response = await getSingleTaskAPI(id);
            setTaskDetails(response.data);
          } catch (err) {
            console.error('Failed to fetch task details:', err);
          }
        };
    
        fetchTaskDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { title, content, image } = TaskDetails;
        if (title && content && image) {
          try {
            const response = await updateTaskAPI(id, TaskDetails);
            if (response.status >= 200 && response.status < 300) {
              alert("Task updated successfully!");
              navigate('/profile'); 
            }
          } catch (err) {
            console.error('Failed to update Task:', err);
            alert("Failed to update Task. Please try again.");
          }
        } else {
          alert("Please fill in all fields before submitting.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-3/4 lg:w-1/2 p-8">
                <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
                <form className="space-y-4" onSubmit={handleSubmit} >
                    <input 
                       
                        name="title"
                        type="text" 
                        placeholder="Task Title" 
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea 
                       
                        name="description"
                        placeholder="Task Description" 
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <select
                        
                        name="status"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input 
                       
                        name="progress"
                        type="number"
                        placeholder="Progress (%)" 
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="100"
                        required
                    />
                    <button 
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditTask;

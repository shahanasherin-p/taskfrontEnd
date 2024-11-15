import React, { useEffect, useState } from 'react';
import { addTaskAPI, allTaskAPI, removeTaskAPI } from '../services/allApi';
import { Link, useNavigate } from 'react-router-dom';

  const Tasks = () => {
    const navigate=useNavigate()
      const [user, setUser] = useState("");
      const [userEmail, setUserEmail] = useState("");
      const [activeModal, setActiveModal] = useState(null);
      const [taskDetails, setTaskDetails] = useState({ title: "", description: "", status: "", progress: 0 });

      const [allTask, setAllTask] = useState([]);
    
      useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
          setUser(user.username);
          setUserEmail(user.email);
        }
      }, []);
    
      console.log(taskDetails);
    
      useEffect(() => {
        getTasks();
      }, [taskDetails]);
    
      const getTasks = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          try {
            const result = await allTaskAPI(reqHeader);
            if (result.status === 200) {
              setAllTask(result.data);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
      console.log(allTask);
    
      const openModal = (type) => {
        setActiveModal(type);
      };
    
      const closeModal = () => {
        setActiveModal(null);
      };
    
      const handleAddTask = async (e) => {
        e.preventDefault();
      
        if (taskDetails.title && taskDetails.description && taskDetails.status && taskDetails.progress) {
          const reqBody = taskDetails;
          const token = sessionStorage.getItem("token");
      
          if (token) {
            const reqHeader = {
              "Authorization": `Bearer ${token}`
            };
            
            try {
              const result = await addTaskAPI(reqBody, reqHeader);
              if (result.status === 200) {
                alert("Task added successfully!!!");
                getTasks(); 
                closeModal();
              } else {
                alert(result.response.data);
              }
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          alert("Please Fill The Form Completely!!");
        }
      };
      
    

    
      const handleRemoveTask = async (id) => {
        const token = sessionStorage.getItem("token");
        if (token) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          try {
            await removeTaskAPI(id, reqHeader);
            getTasks();  
          } catch (err) {
            console.log(err);
          }
        }
      }

     const handleLogout = () => { sessionStorage.clear(); 
       navigate('/login')}

    return (
        <div className="h-[100vh]">
            <nav className="bg-blue-200 border-gray-200">
                <div className="h-[20%] flex flex-wrap items-center justify-between mx-auto p-4">
                   <Link to={'/'}> <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                        Task Management App
                    </span></Link>
                </div>
            </nav>
            <div className="h-[91%] flex w-full bg-gray-100">
                <div className="bg-white p-8 w-3/4">
                    <h2 className="text-2xl font-bold mb-6 text-center">All Tasks</h2>
                    <button
                        onClick={() => openModal('add')}
                        className="block mt-2 mb-50 float-right text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Add Task
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                        {
                            allTask?.length>0 ? 
                            allTask.map(task=>(
                                <div key={task?._id} className="p-4 bg-gray-200 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">{task?.title}</h3>
                                <div className="flex space-x-2">
                                    <Link to={'/edit-task'}>                                    <button
                                        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition duration-200"
                                    >
                                        Update
                                    </button></Link>
                                    <button
                                        onClick={() => handleRemoveTask(task?._id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-2">{task?.description}</p>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-700">{task?.progress}%</span>
                                <div className="w-full bg-white border rounded-full h-2.6">
                                <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${task?.progress}%` }}></div>
                                </div>
                            </div>
                            <span className="text-gray-600">{task?.status}</span>
                        </div>
                            ))
                            :
                            <div className='text-red-500'>no task to display</div>
                        }
                    </div>
                </div>
                <div className="bg-white p-8 flex flex-col justify-center items-center shadow-md w-1/4">
                     <h2 className="text-2xl font-bold mb-6 text-center">Task Management</h2>
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg
                            className="absolute w-12 h-12 text-gray-400 -left-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <h2 className="mt-2 text-xl">{user}</h2>
                    <h2 className="mt-2 text-gray-600">{userEmail}</h2>
                    <button
                        type="button"
                        className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>


            {activeModal === 'add' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-full max-w-md max-h-full bg-white rounded-lg shadow">
                        <form className="p-4" onSubmit={handleAddTask}>
                            <h3 className="text-xl font-semibold mb-4">Add Task</h3>
                            <div className="grid gap-4 mb-4">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                                        Task Name
                                    </label>
                                    <input
                                        onChange={e => setTaskDetails({ ...taskDetails, title: e.target.value })}
                                        type="text"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2"
                                        placeholder="Enter task name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium">
                                        Description
                                    </label>
                                    <textarea
                                        onChange={e => setTaskDetails({ ...taskDetails, description: e.target.value })}
                                        id="description"
                                        className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2"
                                        rows="4"
                                        placeholder="Enter task description"
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="status" className="block mb-2 text-sm font-medium"> Status </label>
                                    <select onChange={e => setTaskDetails({ ...taskDetails, status: e.target.value })}
                                        id="status" className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2" >
                                        <option value="pending">Pending</option>
                                        <option value="in progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="progress" className="block mb-2 text-sm font-medium"> Progress </label>
                                    <input onChange={e => setTaskDetails({ ...taskDetails, progress:parseInt( e.target.value )})}
                                        type="number" id="progress" className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2" placeholder="Enter task progress (0-100)" />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
                                Add Task
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Tasks;





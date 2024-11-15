import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {


  return (
    <>
      <section className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Organize Your Life, One Task at a Time
          </h1>
          <p className="text-lg text-white mb-8">
            Take control of your tasks with our intuitive task management app.
          </p>
          <Link to={'/login'}><button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out">
            Get Started</button></Link>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Track Progress</h3>
              <p className="text-gray-700">
                Monitor the status and progress of your tasks in real-time.
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Set Reminders</h3>
              <p className="text-gray-700">
                Never miss a deadline with customizable reminders.
              </p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Manage Tasks</h3>
              <p className="text-gray-700">
                Add, update, and delete tasks effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

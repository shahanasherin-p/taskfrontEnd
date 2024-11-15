import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allApi';

const Auth = ({ insideRegister}) => {
    const [inputData,setInputData]=useState({
        username:"",
        email:"",
        password:""
    })
    // const[isLogined,setIsLogined]=useState(false)
    const navigate=useNavigate()
  
    //   console.log(inputData);

    const handleRegister=async(e)=>{
        e.preventDefault()
        if(inputData.email && inputData.password && inputData.username){
          try{
            const result=await registerAPI(inputData)
            console.log(result)
            if(result.status==200){
              alert(`Welcome ${result.data?.username}, Please login to explore our website!!`)
              navigate('/login')
              setInputData({username:"",
                email:"",
                password:""})
            }else{
              if(result.response.status==406){
                alert(result.response.data)
                setInputData({username:"",email:"",password:""})
              }
            }
          }catch(err){
            console.log(err)
          }
    
        }else{
          alert("Please fill the form !!")
        }
    }
    
    
    const handleLogin=async(e)=>{
            e.preventDefault()
            if(inputData.email && inputData.password){
              try{
                const result=await loginAPI(inputData)
                if(result.status==200){
                  sessionStorage.setItem("user",JSON.stringify(result.data.user))
                  sessionStorage.setItem("token",result.data.token)
                //   setIsAuthorised(true)
                //   setIsLogined(true)
                  setTimeout(()=>{
                    setInputData({username:"",
                      email:"",
                      password:""})
                      navigate('/tasks')
                  },2000)
                }else{
                  if(result.response.status==404){
                    alert(result.response.data)
                  }
                }
              }catch(err){
                console.log(err)
              }
            }else{
              alert("Please fill the form completely")
            }
    }




  return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600">      <div className="container w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2">
              <img className="object-cover rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg" src="https://img.freepik.com/premium-vector/account-login-password-laptop-screen-data-protection-cyber-security-online-registration_501813-2098.jpg?w=900" alt="Authentication" />
            </div>
            <div className="w-full lg:w-1/2 px-6 py-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                <i className="fas fa-user-circle"></i> Task Management
              </h1>
              <h5 className="text-lg text-gray-600 mb-6">Sign {insideRegister ? "Up" : "In"} to Your Account</h5>
              <form>
                {insideRegister && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={inputData.username}
                      onChange={(e)=>setInputData({...inputData,username:e.target.value})}
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={inputData.email} 
                    onChange={(e)=>setInputData({...inputData,email:e.target.value})}
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    value={inputData.password} 
                    onChange={(e)=>setInputData({...inputData,password:e.target.value})}
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  {insideRegister ? (
                    <>
                      <button
                       onClick={handleRegister}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Register
                      </button>
                      <p className="text-sm text-blue-500 mt-4 lg:mt-0">
                        Already a User? <Link to="/login" className="text-blue-700 hover:underline">Login</Link>
                      </p>
                    </>
                  ) : (
                    <>
                      <button
                      onClick={handleLogin}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Login
                      </button>
                      <p className="text-sm text-blue-500 mt-4 lg:mt-0">
                        Don't have an account? <Link to="/register" className="text-blue-700 hover:underline">Register</Link>
                      </p>
                    </>
                  )}
                        <Link to="/" className="text-sm text-blue-500 hover:underline float-right">
                        Go Back to Home
                    </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

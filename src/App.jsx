import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pnf from './pages/Pnf'
import Auth from './pages/Auth'
import Tasks from './pages/Tasks'
import EditTask from './pages/Edit'


function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/edit-task' element={<EditTask/>}/>
      <Route path='/register' element={<Auth insideRegister={true}/>}/>
      <Route path='/tasks' element={<Tasks/>}/>
      <Route path='/pnf' element={<Pnf/>}/>
     </Routes>
    </>
  )
}

export default App

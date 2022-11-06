import React from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Todolist from './Todolist/Todolist';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
const Todo = () => {
  return (
    <div>
          <BrowserRouter>
        <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/todolist" element={<Todolist/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Todo;

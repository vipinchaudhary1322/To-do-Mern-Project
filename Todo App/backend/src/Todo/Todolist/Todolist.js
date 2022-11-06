import React, { useEffect, useState } from 'react'
import "./Todolist.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
const Todolist = () => {
  const Navigate = useNavigate()
  const [input ,setinput] = useState({activity : "",status : "pending",time:""})
  const [data,setdata] = useState([])
  const [show, setShow] = useState(false);
  const user = localStorage.getItem("user")
  const auth = localStorage.getItem("authtoken")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [get,setget] = useState(true)
  useEffect(()=>{
    if(!user){
       Navigate("/")
    }
    axios({
      url : "http://localhost:5003/todolist",
      method : "GET",
      headers : {
        authorization : auth
      },
      data : {}
    }).then((data)=>{
      setdata(data.data[0].todolist)
    })
  },[get])
  const logouthandler = ()=>{
    localStorage.setItem("user","")
    localStorage.setItem("authtoken","")
    Navigate("/")
  }
  const sumbithandler =(e)=>{
    e.preventDefault()
      axios({
          url : "http://localhost:5003/todolist/addtodo",
          method : "POST",
          headers : {
            authorization : auth
          },
          data : input
      }).then((data)=>{
          handleClose()
          setget(!get)
      }).catch((err)=>{
          console.log(err)
      })
 }
 const inputhandler = (e)=>{
   setinput({...input,activity:e.target.value})
 }
  return (
    <div className='todolist'>
      <div className='todo-header'>
        <div style={{"fontWeight":"bolder"}}>{user}</div>
      </div>
      <div className='todo-content'>
        <div className='sidebar'>
            <div className='sidebar-top'>
              <div className='todolist'>
                To do List
              </div>
              <div className='history'>
                History
              </div>
            </div>
            <div className='sidebar-bottom' style={{"cursor": "pointer"}} onClick={()=>logouthandler()}>
               Logout
            </div>
        </div>
        <div className='main'>
           <div className='addtodo'>
               <div style={{"cursor":"pointer"}} onClick={(e)=>handleShow()}>
                Add New Activity
               </div>
           </div>
           <div className='main-table'>
               <table>
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Status</th>
                    <th>Time Taken (Hrs : Min : Secs)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item,idx)=>{
                      return (
                        <tr key={idx}>
                          <td>
                           {item.activity}
                          </td>
                          <td>
                           {item.status}
                          </td>
                          <td>
                            {item.time}
                          </td>
                          <td>
                            <button className='start'>Start</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
               </table>
           </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add TodoList</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='addtodolist'>
                    <form onSubmit={(e)=>sumbithandler(e)}>
                        <input type='text' placeholder='Activity' value={input.activity} onChange={(e)=>inputhandler(e)} />
                        <div>
                        <button type='submit'>Add Todo</button>
                        </div>
                        
                    </form>
                </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Todolist

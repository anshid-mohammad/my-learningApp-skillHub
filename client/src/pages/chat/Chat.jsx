import React, { useEffect, useState } from 'react'
import styles from "./Chat.module.css"
import { Container } from 'react-bootstrap'
import { checkAuthStatus } from '../../redux/UserSlice'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


function Chat() {
    const dispatch=useDispatch()
  const { loggedIn, user, userId } = useSelector((state) => state.auth);
    const [contacts,setContacts]=useState([])
const {id}=useParams()
const navigate=useNavigate()

    useEffect(()=>{
dispatch(checkAuthStatus())
    },[dispatch])

     useEffect(() => {
        if (!loggedIn || !user) {
          navigate("/login");
        }
      }, [loggedIn, user, navigate]);


      useEffect(()=>{
    const    fetchStudentData=async()=>{
        try{
const response= await axios(`/api/auth/student-details${id}`)
console.log("data",response.data)
        }catch(error){
            console.error("error fetching data",error)
        }
    }
fetchStudentData()
      },[])
  return (
    <Container>
 <div className={styles.container}>
      
      </div>
    </Container>
   
  )
}

export default Chat

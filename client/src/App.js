import React from "react";
import {Route,Routes} from "react-router-dom"
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Header from "./componets/header/Header";
import Login from "./pages/login/Login";
import LearnersHome from "./pages/learnersHome/LearnersHome";
import SignupTeacher from "./pages/SignupTeachers/SignupTeachers";
import LoginTeachers from "./pages/loginTeachers/LoginTeachers";
import TeachersHome from "./pages/home/teachersHome/TeachersHome";
import TeachersForm from "./pages/home/teachersForm/TeachersForm";
import Sample from "./componets/sample/Sample";
import AdminHome from "./pages/admin/AdminHome";
import CourseList from "./pages/admin/CourseList/CourseList";
import CourseDetailsPage from "./pages/learnersHome/CourseDetailsPage/CourseDetailsPage";


function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
        <Route  path='/' element={<Home/>}></Route>
        <Route  path='/signup' element={<Signup/>}></Route>
        <Route  path='/login' element={<Login/>}></Route>
        <Route  path='/teacher-signup' element={<SignupTeacher/>}></Route>
        <Route  path='/teacher-login' element={<LoginTeachers/>}></Route>
        <Route  path='/teachers' element={<TeachersHome/>}></Route>


        <Route  path='/learners' element={<LearnersHome/>}></Route>
        <Route  path='/course-details/:id' element={<CourseDetailsPage/>}></Route>


        <Route  path='/teachers-form' element={<TeachersForm/>}></Route>


        <Route  path='/sample' element={<Sample/>}></Route>
        <Route  path='/admin' element={<AdminHome/>}></Route>
        <Route  path='/admin-courselist/:id' element={<CourseList/>}></Route>


        
        </Routes>
    </div>
  );
}

export default App;

import React, { ReactElement } from 'react'
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import AdminHome from './Routes/Admin/Home/Home'
import AssignmentInstruction from './Routes/AssignmentInstruction/AssignmentInstruction'
import AssignmentSubmission from 'Routes/AssignmentSubmission/AssignmentSubmission'
import Cookies from 'Utilities/Cookies'
import CourseSlides from './Routes/CourseSlides/CourseSlides'
import ForgotPassword from './Routes/ForgotPassword/ForgotPassword'
import Grades from './Routes/Grades/Grades'
import Home from './Routes/Home/Home'
import JwtValidator from 'Utilities/JwtValidator'
import LessonDetails from './Routes/LessonDetails/LessonDetails'
import Login from './Routes/Login/Login'
import ResetPassword from 'Routes/ForgotPassword/ResetPassword/ResetPassword'
import Settings from './Routes/Settings/Settings'
import Students from './Routes/Admin/Students/Students'
import UpdatePassword from './Routes/Settings/UpdatePassword/UpdatePassword'
import UploadAssignment from './Routes/UploadAssignment/UploadAssignment'
import './App.css'
import './theme.css'

function App(): ReactElement {
  const StudentAuthProtectedRoute = (routeProps: RouteProps) => {
    if (Cookies.get('auth') && JwtValidator.validate(Cookies.get('auth'))) {
      return <Route {...routeProps} />
    } else {
      localStorage.clear()
      Cookies.remove('auth')
      return <Redirect to='/login' />
    }
  }

  const AdminAuthProtectedRoute = (routeProps: RouteProps) => {
    if (Cookies.get('adminAuth') && JwtValidator.validate(Cookies.get('adminAuth'))) {
      return <Route {...routeProps} />
    } else {
      localStorage.clear()
      Cookies.remove('adminAuth')
      return <Redirect to='/login' />
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/forgotPassword' component={ForgotPassword} />
        <Route path='/resetPassword' component={ResetPassword} />
        <AdminAuthProtectedRoute exact path='/admin' component={AdminHome} />
        <AdminAuthProtectedRoute path='/admin/students' component={Students} />
        <StudentAuthProtectedRoute path='/assignment' component={AssignmentSubmission} />
        <StudentAuthProtectedRoute exact path='/' component={Home} />
        <StudentAuthProtectedRoute
          path='/assignmentInstruction/:homeworkId?'
          component={AssignmentInstruction}
        />
        <StudentAuthProtectedRoute path='/uploadAssignment' component={UploadAssignment} />
        <StudentAuthProtectedRoute path='/lessonDetails/:lessonId?' component={LessonDetails} />
        <StudentAuthProtectedRoute path='/grades' component={Grades} />
        <StudentAuthProtectedRoute path='/courseSlides' component={CourseSlides} />
        <StudentAuthProtectedRoute path='/settings' exact component={Settings} />
        <StudentAuthProtectedRoute
          exact
          path='/settings/resetPassword'
          component={UpdatePassword}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App

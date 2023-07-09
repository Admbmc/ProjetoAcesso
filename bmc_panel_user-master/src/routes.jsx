import React from 'react'
import { Route, BrowserRouter as Routers, Switch } from "react-router-dom";

import Auth from './services/auth';

import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ChangePassword'
import ActivateAccount from './pages/ActivateAccount'

import Dashboard from './pages/Dashboard'
import Quizzes from './pages/Quizzes'
import Quiz from './pages/ShowQuiz'
import ResultQuiz from './pages/ResultQuiz'
import Profile from './pages/Profile'

const Routes = () => {

  return  (
      <Routers>
            <Switch>
                <Route component={ Login } path="/login" exact />
                <Route component={ Register } path="/register" exact />
                <Route component={ ResetPassword } path="/reset-password" exact />
                <Route component={ ChangePassword } path="/change-password" exact />
                <Route component={ ActivateAccount } path="/conta/ativar-conta" exact />

                <Auth component={ Dashboard } path="/" exact />
                <Auth component={ Quizzes } path="/questionarios" exact />
                <Auth component={ ResultQuiz } path="/questionario/:id/resultado" exact />
                <Auth component={ Quiz } path="/questionarios/:id" exact />
                <Auth component={ Profile } path="/perfil" exact />
            </Switch>
      </Routers>
  )
}
export default Routes

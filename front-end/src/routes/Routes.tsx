import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Doctor from '../pages/Doctor'
import Specialty from '../pages/Specialty'

const routes: React.FC = () => {
  return (
    <Dashboard>
      <Switch>
        <Route exact path="/">
          <Doctor />
        </Route>

        <Route exact path="/Specialty">
          <Specialty />
        </Route>
      </Switch>
    </Dashboard>
  )
}

export default routes

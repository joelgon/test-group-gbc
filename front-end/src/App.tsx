import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Route from './routes/Routes'
// import { Container } from './styles';

const src: React.FC = () => {
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  )
}

export default src

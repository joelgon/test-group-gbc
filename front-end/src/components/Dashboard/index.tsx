import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

interface DashboardProps {
  children: React.ReactNode
}

const Dashboard: React.FC<DashboardProps> = ({ children }: DashboardProps) => {
  const [expanded, setExpanded] = useState(false)
  const [option, setOption] = useState<'specialty' | 'doctor'>('doctor')
  const path = window.location.pathname

  const handleMouse = (isOpen: boolean): void => {
    setExpanded(isOpen)
    setOption(path === '/' ? 'doctor' : 'specialty')
  }
  return (
    <div className="main">
      <nav
        className="dash"
        style={{
          width: `${expanded ? '250px' : ''}`,
        }}
        onMouseLeave={() => handleMouse(false)}
        onMouseEnter={() => handleMouse(true)}
      >
        <ul className="options">
          <li onMouseEnter={() => setOption('doctor')}>
            <Link
              to="/"
              style={{
                color: `${expanded && option === 'doctor' ? '#00FF00' : ''}`,
              }}
            >
              {expanded ? 'Médico' : 'M'}
            </Link>
          </li>
          <li onMouseEnter={() => setOption('specialty')}>
            <Link
              to="/Specialty"
              style={{
                color: `${expanded && option === 'specialty' ? '#00FF00' : ''}`,
              }}
            >
              {expanded ? 'Especialidade' : 'E'}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="handler-component">{children}</div>
    </div>
  )
}

export default Dashboard

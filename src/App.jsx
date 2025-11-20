import React, { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [selectedCase, setSelectedCase] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <ThemeProvider>
      <div className="app">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div className={`app-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
          <Dashboard selectedCase={selectedCase} setSelectedCase={setSelectedCase} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App


import React, { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [selectedCase, setSelectedCase] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <ThemeProvider>
      <div className="app">
        {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
        <Sidebar 
          collapsed={sidebarCollapsed} 
          open={sidebarOpen}
          onToggle={toggleSidebar} 
          onClose={closeSidebar}
        />
        <div className={`app-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} isMobile={isMobile} sidebarOpen={sidebarOpen} />
          <Dashboard selectedCase={selectedCase} setSelectedCase={setSelectedCase} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App


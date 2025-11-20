import React from 'react'
import { LayoutDashboard, CheckSquare, Calendar, BarChart3, Users, Settings, HelpCircle, LogOut, Menu, X } from 'lucide-react'
import './Sidebar.css'

const Sidebar = ({ collapsed, open, onToggle, onClose }) => {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">D</div>
          {!collapsed && <span className="logo-text">Donezo</span>}
        </div>
        <button className="sidebar-toggle" onClick={onToggle}>
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {!collapsed && <div className="nav-section-title">MENU</div>}
          <a href="#" className="nav-item active">
            <LayoutDashboard size={20} />
            {!collapsed && <span>Dashboard</span>}
          </a>
          <a href="#" className="nav-item">
            <CheckSquare size={20} />
            {!collapsed && <span>Tasks</span>}
            {!collapsed && <span className="badge">12</span>}
          </a>
          <a href="#" className="nav-item">
            <Calendar size={20} />
            {!collapsed && <span>Calendar</span>}
          </a>
          <a href="#" className="nav-item">
            <BarChart3 size={20} />
            {!collapsed && <span>Analytics</span>}
          </a>
          <a href="#" className="nav-item">
            <Users size={20} />
            {!collapsed && <span>Team</span>}
          </a>
        </div>

        <div className="nav-section">
          {!collapsed && <div className="nav-section-title">GENERAL</div>}
          <a href="#" className="nav-item">
            <Settings size={20} />
            {!collapsed && <span>Settings</span>}
          </a>
          <a href="#" className="nav-item">
            <HelpCircle size={20} />
            {!collapsed && <span>Help</span>}
          </a>
          <a href="#" className="nav-item">
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </a>
        </div>
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="mobile-app-card">
            <div className="mobile-app-header">
              <div className="mobile-app-icon">📱</div>
              <h3>Download our Mobile App</h3>
            </div>
            <p>Get easy in another way</p>
            <button className="download-btn">Download</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar


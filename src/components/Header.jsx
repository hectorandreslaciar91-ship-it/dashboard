import React from 'react'
import { Search, Mail, Bell, User, Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import './Header.css'

const Header = ({ onToggleSidebar, sidebarCollapsed }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header-left">
        {sidebarCollapsed && onToggleSidebar && (
          <button className="menu-toggle-btn" onClick={onToggleSidebar}>
            <Menu size={20} />
          </button>
        )}
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search task" />
          <span className="search-shortcut">⌘F</span>
        </div>
      </div>
      <div className="header-right">
        <button className="theme-toggle-btn" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button className="icon-btn">
          <Mail size={20} />
        </button>
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <div className="user-name">Totok Michael</div>
            <div className="user-email">tmichael20@mail.com</div>
          </div>
        </div>
        <button className="btn-primary">+ Add Project</button>
        <button className="btn-primary">Import Data</button>
      </div>
    </header>
  )
}

export default Header


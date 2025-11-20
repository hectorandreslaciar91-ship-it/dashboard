import React, { useState } from 'react'
import { CheckCircle, FileText, Clock, RefreshCw, Filter } from 'lucide-react'
import './QuickLookup.css'

const QuickLookup = ({ metrics, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const cards = [
    {
      title: 'Completed',
      value: metrics.completed,
      subtitle: '(last 10 days)',
      icon: CheckCircle,
      color: '#3b82f6',
      bgColor: '#dbeafe',
    },
    {
      title: 'New Intakes',
      value: metrics.newIntakes,
      subtitle: '(last 14 days)',
      icon: FileText,
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      title: 'Stale Cases',
      value: metrics.staleCases,
      subtitle: '(10 days or older)',
      icon: Clock,
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
    {
      title: 'Status Updated',
      value: metrics.statusUpdated,
      subtitle: '(last 5 days)',
      icon: RefreshCw,
      color: '#ec4899',
      bgColor: '#fce7f3',
    },
  ]

  return (
    <div className="quick-lookup">
      <div className="quick-lookup-header">
        <h2 className="quick-lookup-title"></h2>
        <div className="quick-lookup-search">
          <Filter size={18} />
          <input 
            type="text" 
            placeholder="Search cases..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="quick-lookup-cards">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="quick-lookup-card" style={{ borderLeftColor: card.color }}>
              <div className="quick-lookup-card-header">
                <div className="quick-lookup-icon" style={{ backgroundColor: card.bgColor, color: card.color }}>
                  <Icon size={20} />
                </div>
                <div className="quick-lookup-card-content">
                  <div className="quick-lookup-value">{card.value}</div>
                  <div className="quick-lookup-title-text">{card.title}</div>
                  <div className="quick-lookup-subtitle">{card.subtitle}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuickLookup


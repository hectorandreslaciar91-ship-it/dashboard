import React from 'react'
import { X, Clock, DollarSign, Calendar, User, FileText } from 'lucide-react'
import './CaseSummary.css'

const CaseSummary = ({ caseData, onClose }) => {
  if (!caseData) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h${mins}m`
  }

  const summaryFields = [
    { label: 'Client', value: caseData.clientName, icon: User },
    { label: 'Title', value: caseData.title, icon: FileText },
    { label: 'Description', value: caseData.description, icon: FileText },
    { label: 'Status', value: caseData.status, icon: FileText },
    { label: 'Status Updated', value: formatDate(caseData.statusUpdated), icon: Calendar },
    { label: 'Caseworker', value: caseData.caseworker, icon: User },
    { label: 'Time Spent', value: formatTime(caseData.timeSpent || 177), icon: Clock },
    { label: 'Paralegal Cost', value: `$${caseData.paralegalCost || 300}`, icon: DollarSign },
    { label: 'Matter lifetime', value: caseData.matterLifetime || '8 months', icon: Calendar },
    { label: 'Matter last touched', value: formatDate(caseData.lastTouched), icon: Calendar },
    { label: 'Client fee charged', value: `$${caseData.clientFeeCharged || 5000}`, icon: DollarSign },
  ]

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose()
    }
  }

  return (
    <div className="case-summary-modal-overlay" onClick={handleBackdropClick}>
      <div className="case-summary-modal" onClick={(e) => e.stopPropagation()}>
      <div className="case-summary-header">
        <h2>Case Summary</h2>
        {onClose && (
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        )}
      </div>
      <div className="case-summary-content">
        <table className="summary-table">
          <tbody>
            {summaryFields.map((field, index) => {
              const Icon = field.icon
              return (
                <tr key={index}>
                  <td className="summary-field">
                    <div className="summary-field-header">
                      <Icon size={16} />
                      <span>{field.label}</span>
                    </div>
                  </td>
                  <td className="summary-value">{field.value}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default CaseSummary


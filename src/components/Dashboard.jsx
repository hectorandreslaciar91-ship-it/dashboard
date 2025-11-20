import React, { useState } from 'react'
import QuickLookup from './QuickLookup'
import CaseTable from './CaseTable'
import CaseSummary from './CaseSummary'
import { mockCases } from '../data/mockData'
import './Dashboard.css'

const Dashboard = ({ selectedCase, setSelectedCase }) => {
  const [cases] = useState(mockCases)
  const [searchQuery, setSearchQuery] = useState('')

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem)
  }

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase())
  }

  const filteredCases = searchQuery
    ? cases.filter(c => 
        c.title.toLowerCase().includes(searchQuery) ||
        c.description.toLowerCase().includes(searchQuery) ||
        c.clientName.toLowerCase().includes(searchQuery) ||
        c.clientEmail.toLowerCase().includes(searchQuery) ||
        c.status.toLowerCase().includes(searchQuery) ||
        c.caseworker.toLowerCase().includes(searchQuery)
      )
    : cases

  const metrics = {
    completed: cases.filter(c => c.status === 'Case Approved').length,
    newIntakes: cases.filter(c => {
      const daysSinceCreated = Math.floor((new Date() - new Date(c.created)) / (1000 * 60 * 60 * 24))
      return daysSinceCreated <= 14
    }).length,
    staleCases: cases.filter(c => {
      const daysSinceTouched = Math.floor((new Date() - new Date(c.lastTouched)) / (1000 * 60 * 60 * 24))
      return daysSinceTouched >= 10
    }).length,
    statusUpdated: cases.filter(c => {
      const daysSinceUpdated = Math.floor((new Date() - new Date(c.statusUpdated)) / (1000 * 60 * 60 * 24))
      return daysSinceUpdated <= 5
    }).length,
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Track paralegal performance and case productivity metrics</p>
        </div>
      </div>

      <QuickLookup metrics={metrics} onSearch={handleSearch} />

      <div className="dashboard-content">
        <div className="dashboard-main">
          <CaseTable cases={filteredCases} onCaseSelect={handleCaseSelect} selectedCase={selectedCase} />
        </div>
      </div>
      
      {selectedCase && (
        <CaseSummary caseData={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </div>
  )
}

export default Dashboard


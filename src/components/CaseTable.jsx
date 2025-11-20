import React, { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import './CaseTable.css'

const CaseTable = ({ cases, onCaseSelect, selectedCase }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [filterCaseworker, setFilterCaseworker] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const caseworkers = [...new Set(cases.map(c => c.caseworker))]
  const statuses = [...new Set(cases.map(c => c.status))]

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const filteredCases = cases.filter(c => {
    if (filterCaseworker !== 'all' && c.caseworker !== filterCaseworker) return false
    if (filterStatus !== 'all' && c.status !== filterStatus) return false
    return true
  })

  const sortedCases = [...filteredCases].sort((a, b) => {
    if (!sortConfig.key) return 0

    let aValue = a[sortConfig.key]
    let bValue = b[sortConfig.key]

    if (sortConfig.key === 'created' || sortConfig.key === 'lastTouched' || sortConfig.key === 'statusUpdated') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'today'
    if (diffDays === 1) return 'yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
  }

  return (
    <div className="case-table-container">
      <div className="case-table-header">
        <h2>Case Management</h2>
        <div className="case-table-filters">
          <select 
            value={filterCaseworker} 
            onChange={(e) => setFilterCaseworker(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Caseworkers</option>
            {caseworkers.map(cw => (
              <option key={cw} value={cw}>{cw}</option>
            ))}
          </select>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="case-table-wrapper">
        <table className="case-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')} className="sortable">
                Title <SortIcon columnKey="title" />
              </th>
              <th onClick={() => handleSort('description')} className="sortable">
                Description <SortIcon columnKey="description" />
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status <SortIcon columnKey="status" />
              </th>
              <th onClick={() => handleSort('clientName')} className="sortable">
                Client Name <SortIcon columnKey="clientName" />
              </th>
              <th onClick={() => handleSort('clientEmail')} className="sortable">
                Client Email <SortIcon columnKey="clientEmail" />
              </th>
              <th>Client Phone</th>
              <th onClick={() => handleSort('caseworker')} className="sortable">
                Caseworker <SortIcon columnKey="caseworker" />
              </th>
              <th onClick={() => handleSort('statusUpdated')} className="sortable">
                Status Updated <SortIcon columnKey="statusUpdated" />
              </th>
              <th onClick={() => handleSort('lastTouched')} className="sortable">
                Last Touched <SortIcon columnKey="lastTouched" />
              </th>
              <th onClick={() => handleSort('created')} className="sortable">
                Created <SortIcon columnKey="created" />
              </th>
              <th>Docketwis</th>
            </tr>
          </thead>
          <tbody>
            {sortedCases.map((caseItem, index) => {
              const isSelected = selectedCase && 
                selectedCase.title === caseItem.title && 
                selectedCase.clientName === caseItem.clientName
              return (
              <tr 
                key={index} 
                onClick={() => onCaseSelect(caseItem)}
                className={isSelected ? 'selected' : ''}
              >
                <td className="title-cell">{caseItem.title}</td>
                <td className="description-cell">{caseItem.description}</td>
                <td>
                  <span className={`status-badge status-${caseItem.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {caseItem.status}
                  </span>
                </td>
                <td>{caseItem.clientName}</td>
                <td className="email-cell">{caseItem.clientEmail}</td>
                <td>{caseItem.clientPhone || '-'}</td>
                <td>{caseItem.caseworker}</td>
                <td>{formatTimeAgo(caseItem.statusUpdated)}</td>
                <td>{formatTimeAgo(caseItem.lastTouched)}</td>
                <td>{formatDate(caseItem.created)}</td>
                <td>
                  <a href="#" className="docketwise-link" onClick={(e) => e.stopPropagation()}>
                    open <ExternalLink size={12} />
                  </a>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CaseTable


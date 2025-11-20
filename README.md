# Productivity Dashboard Demo

A modern, responsive dashboard for tracking paralegal performance metrics and case management in an immigration law firm.

## Features

- **Quick Lookup Metrics**: Real-time overview of completed cases, new intakes, stale cases, and status updates
- **Case Management Table**: Comprehensive table with sorting, filtering, and case selection
- **Case Summary Panel**: Detailed view of selected case with all relevant information
- **Modern UI/UX**: Clean, minimalist design inspired by Donezo dashboard with green accent colors
- **Responsive Design**: Works seamlessly on desktop and tablet devices

## Tech Stack

- React 18
- Vite
- Lucide React (icons)
- Pure CSS (no framework dependencies)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Left navigation sidebar
│   ├── Header.jsx           # Top header with search and user info
│   ├── Dashboard.jsx        # Main dashboard container
│   ├── QuickLookup.jsx     # Metrics cards component
│   ├── CaseTable.jsx        # Case data table with filters
│   └── CaseSummary.jsx     # Case details panel
├── data/
│   └── mockData.js         # Sample case data
├── App.jsx                 # Main app component
├── App.css                 # App styles
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## Features in Detail

### Quick Lookup Metrics
- **Completed**: Cases approved in the last 10 days
- **New Intakes**: Cases created in the last 14 days
- **Stale Cases**: Cases not touched in 10+ days
- **Status Updated**: Cases with status updates in the last 5 days

### Case Table
- Sortable columns (click headers to sort)
- Filter by caseworker and status
- Click any row to view detailed case summary
- Responsive design with horizontal scroll on smaller screens

### Case Summary
- Displays comprehensive case information
- Shows client details, status, time tracking, and financials
- Sticky panel that stays visible while scrolling

## Customization

The dashboard uses a green color scheme (`#10b981`) that can be easily customized by updating CSS variables or color values in the component stylesheets.

## Notes

This is a frontend-only demo with mock data. For production use, you would need to:
- Integrate with 8am API or your case management system
- Add authentication and authorization
- Implement real-time data updates
- Add more advanced filtering and reporting features
- Connect to a backend for data persistence


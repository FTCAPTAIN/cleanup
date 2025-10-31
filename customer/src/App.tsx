import React, { useState } from 'react'
import BookingForm from './components/BookingForm'
import JobsList from './components/JobsList'
import MapPicker from './components/MapPicker'
import LiveTracker from './components/LiveTracker'
import SettingsToggle from './components/SettingsToggle'

export default function App(){ 
  const [view, setView] = useState<'home'|'book'|'jobs'|'track'|'settings'>('home');
  return (<div className="app">
    <header><div className="logo">CZ</div><div><h1>Cleanzup - Customer</h1><div className="muted">Nellore demo</div></div></header>
    <div className="card">
      <div style={display:'flex',gap:8,marginBottom:10}>
        <button onClick={() => setView('home')}>Home</button>
        <button onClick={() => setView('book')}>Book</button>
        <button onClick={() => setView('jobs')}>Jobs</button>
        <button onClick={() => setView('track')}>Track</button>
        <button onClick={() => setView('settings')}>Settings</button>
      </div>
      {view==='home' && <div>Welcome to Cleanzup (Customer)</div>}
      {view==='book' && <BookingForm/>}
      {view==='jobs' && <JobsList/>}
      {view==='track' && <LiveTracker jobId="demo-job-1"/>}
      {view==='settings' && <SettingsToggle/>}
    </div>
  </div>)
}

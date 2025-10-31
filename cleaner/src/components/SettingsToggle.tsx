import React, {useState} from 'react'
export default function SettingsToggle(){ const [auto, setAuto] = useState(true); return (<div><div className='muted'>Theme</div><div style={{marginTop:8}}><label style={{display:'flex',gap:8,alignItems:'center'}}><input type='checkbox' checked={auto} onChange={e=>setAuto(e.target.checked)} /> Auto switch (system)</label></div></div>) }

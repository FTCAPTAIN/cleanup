import React from 'react'
export default function JobsList(){ 
  const sample = [ {id:'r1', loc:'MG Road', status:'Pending', price:500 }, {id:'r2', loc:'Central Park', status:'In Progress', price:1000 } ]
  return (<div>{sample.map(s=>(<div key={s.id} style={{padding:10,borderRadius:10,background:'rgba(255,255,255,0.02)',marginTop:8}}><div style={{display:'flex',justifyContent:'space-between'}}><strong>{s.loc}</strong><span className='muted'>₹{s.price}</span></div><div className='muted'>Status: {s.status}</div><div style={{marginTop:8}}><button onClick={()=>alert('Accept job (demo)')}>Accept</button></div></div>))}</div>)
}

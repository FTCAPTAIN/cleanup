import React, {useState} from 'react'
import MapPicker from './MapPicker'

export default function BookingForm(){ 
  const [location, setLocation] = useState<any>(null)
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState(500)

  async function payAndBook(){
    const resp = await fetch('/server/create-order', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amount: amount*100 }) }).then(r=>r.json()).catch(()=>null)
    if(!resp || !resp.order){ alert('Order creation failed'); return; }
    const order = resp.order;
    const options = { key: 'rzp_test_KEY', amount: order.amount, currency: order.currency, name:'Cleanzup', description: desc, order_id: order.id, handler: function(res:any){ alert('Payment demo success'); } }
    const rzp = new (window as any).Razorpay(options)
    rzp.open()
  }

  return (<div>
    <div className="muted">Select location</div>
    <MapPicker onSelect={(lat,lng)=>setLocation([lat,lng])} />
    <div style={{marginTop:8}}><input placeholder="Describe the issue" value={desc} onChange={e=>setDesc(e.target.value)} style={{width:'100%',padding:10,borderRadius:10,border:'none'}} /></div>
    <div style={{marginTop:8,display:'flex',gap:8,alignItems:'center'}}>
      <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} style={{padding:8,borderRadius:8,width:120}} />
      <button onClick={payAndBook}>Pay & Book</button>
    </div>
  </div>)
}

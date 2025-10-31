import React from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
const icon = L.icon({ iconUrl:'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize:[32,32] })
export default function MapPicker({onSelect}:{onSelect:(lat:number,lng:number)=>void}){
  function MarkerMaker(){ useMapEvents({ click(e){ onSelect(e.latlng.lat,e.latlng.lng) } }); return null }
  return (<div style={{height:260,borderRadius:12,overflow:'hidden'}}><MapContainer center={[14.4426,79.9865]} zoom={13} style={{height:'100%',width:'100%'}}><TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' /><Marker position={[14.4426,79.9865]} icon={icon} /><MarkerMaker/></MapContainer></div>)
}

import "./style.css"
//import Reader from "../utils/scanner";
import QrReader from 'react-qr-scanner'
import { useState } from "react"
const TicketVerification =()=>{

  const[scanResult,setScanResult]=useState(null)
  const[isStart,setIsStart]=useState(true)

  function handleError(error){
    console.log(error)
  }
  function handleScan(value){
    if(value){
      setScanResult(value.text)
      setIsStart (false)
    }
  }
  console.log(scanResult)
  return(
    <>
    <button
    onClick={()=>{if(isStart)setIsStart(false)
       else setIsStart(true) }}
    > {isStart?"Stop":"Scanne"} </button>

      {isStart &&<QrReader
      delay={100}
      style={{
        height: 350,
        width: 350,
      }}
      onError={handleError}
      onScan={handleScan}
      />
      }
      <div className="scanne_result"> {scanResult} </div>
    </>
  )
}
export default TicketVerification;
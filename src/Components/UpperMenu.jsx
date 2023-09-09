import React from 'react'
import { useTestMode } from '../Context/TestModeContext';

const UpperMenu=({countDown})=> {
  //return the set test from testmode
  const{setTestTime}=useTestMode();
//used to update the time
  const updateTime=(e)=>{
      //set the number,number because default it is string and get the target id
       setTestTime(Number(e.target.id));
  }
  return (
    //this the counter modes display
    <div className='upper-menu'>
             <div className='counter'>
          {countDown}
         </div>
         <div className='modes'>
          
         <div className='time-mode' id={15}onClick={updateTime}>15s</div>
         <div className='time-mode' id={30}onClick={updateTime}>30s</div>
         <div className='time-mode' id={60}onClick={updateTime}>60s</div>

         </div>
        
    </div>
    
  )
}

export default UpperMenu
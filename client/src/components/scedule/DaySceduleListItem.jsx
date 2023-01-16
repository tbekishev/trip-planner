import React from 'react'
import './Scedule.scss';
import HourTimeCell from './HourTimeCell'

let basicScedule = [ 
  {time:'05:00', content:'content'},{time:'06:00', content:'content'}, {time:'07:00', content:'content'},{time:'08:00', content:'content'},{time:'09:00', content:'content'},{time:'10:00', content:'content'},{time:'11:00', content:'content'},{time:'12:00', content:'content'},{time:'13:00', content:'content'},{time:'14:00', content:'content'},{time:'15:00', content:'content'},{time:'16:00', content:'content'},{time:'17:00', content:'content'},{time:'18:00', content:'content'},{time:'19:00', content:'content'},{time:'20:00', content:'content'},{time:'21:00', content:'content'},{time:'22:00', content:'content'},{time:'23:00', content:'content'},{time:'00:00', content:'content'},{time:'01:00', content:'content'},{time:'02:00', content:'content'},{time:'03:00', content:'content'},{time:'04:00', content:'content'}]


export default function DaySceduleListItem (props) {

  const start_time = props.start_time
  const end_time = props.end_time
  let i=0;
  let j=23;
  const userTime = function (basicScedule, start_time, end_time) {
  
   basicScedule.map ((element ,index) => {
      if (element.time = start_time){
        let i = index
      }
      if (element.time = end_time){
        let j = index
      }
    }); 
    console.log(basicScedule.slice(i,j), "MARZI")
    const limited = basicScedule.slice(i,j)
    return limited
    
  }
  const limited = userTime (basicScedule, start_time, end_time);

  const dayScedule = basicScedule.map(elem => {
    <HourTimeCell 
    start_time = {elem.start_time}
    content = {elem.content}
    />
  });

return (

 <div className="times">
    {dayScedule}
 </div>
)
}

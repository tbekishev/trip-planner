import './Scedule.scss';

export default function HourTimeCell (props) {
  const [start_time, content] = [props.start_time, props.content]
  
  return (
  <div>
   <span> {start_time} </span><span> {content} </span> 
  </div>
  )
}
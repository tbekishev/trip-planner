import './GenerateButton.scss';
import { useNavigate } from "react-router-dom";

export default function GenerateButton(props) {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/advanced`; 
    navigate(path);
  }

  return <button className='generate-plan' onClick={routeChange}>{props.children}</button>;

}
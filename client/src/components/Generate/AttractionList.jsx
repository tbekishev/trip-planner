import axios from 'axios';
import { useEffect, useState } from 'react';
import './AttractionListItem';
import AttractionListItem from './AttractionListItem';

export default function AttractionList() {

  const [state, setState] = useState([]);

  useEffect(() => {
    const url = `/api/trend-attarctions`;
    axios
    .get(url)
    .then((response) =>{
      setState(response.data);
    })
  }, []);

  

  return (
    <div className='attraction-list'>{state.map(location => (
      <AttractionListItem 
        key={location.id}
        name={location.name}
        city={location.city}
        rate={location.rate}
        photo_url={location.photo_url}
      />
  ))}
    </div>

  );
}

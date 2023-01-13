import { useEffect, useState } from 'react';
import Header from '../Header';
import Map from './Map';
import List from './List';
import axios from "axios"

export default function Places(props) {

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
  const getPlaceData = async (sw, ne) => {
    try {
      const res = await axios.get(url, {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'X-RapidAPI-Key': 'ad129e69d9msh1bc8db670184f5ep1caed1jsn2c11b92740f0',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      });
      console.log("DATA: ", res.data.data)
      return res.data.data;
    }
    catch (error) {
      console.log("ERROR: ", error);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlaceData(bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setIsLoading(false);
        });
    }
  }, [bounds]);

  return (
    <main>
      <Header 
        setCoordinates={setCoordinates}
      />
      <Map 
        setCoordinates={setCoordinates}
        setBounds={setBounds}
        coordinates={coordinates}
        places={places}
      />    
      <List 
        places={places}
      />  
    </main>
  );
}
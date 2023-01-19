import React, { useEffect, useState, useRef } from 'react';
import Header from '../Header';
import Map from './Map';
import List from './List';
import { Box } from '@chakra-ui/react';

import { getPlacesData } from '../../api';
import { Autocomplete } from "@react-google-maps/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faEarthAmericas, faGripLines } from '@fortawesome/free-solid-svg-icons';

import { openNavH, closeNavH, } from '../../helpers/dropDownHelper';


import './Places.scss';

export default function Places() {

  const [type, setType] = useState('attractions');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState(null);
  const [bounds, setBounds] = useState(null);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const [attractions, setAttractions] = useState([]);
  localStorage.setItem("attractions", JSON.stringify(attractions));

  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > Number(rating));

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, type]);

  
  const textInput = useRef(null);
  useEffect(() => {
    textInput.current?.focus();
  }, []);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });

  };

  const autocompleteRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (autocompleteRef.current) {
        if (window.scrollY > 0) {
          autocompleteRef.current.classList.add('hidden');
        } else {
          autocompleteRef.current.classList.remove('hidden');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>    
      <Header />
      <section className='layout'>

        <Autocomplete  onLoad={onLoad} onPlaceChanged={onPlaceChanged}>

          <section ref={autocompleteRef} className='place-search'>

            <FontAwesomeIcon icon={faMagnifyingGlass} className='place-search--icon'/>
            <input 
              placeholder="Search location"
              className='place-search--bar'
              ref={textInput}
            />
            
              {coords && 
                <FontAwesomeIcon 
                    icon={faEarthAmericas} 
                    className="show-map" 
                    onClick={() => openNavH('show-map')}  
                  />
              }
          </section>
        </Autocomplete>


          <section className='map-container'>

            <Box id="show-map" className='map-container--overlay'>

              <Map 
                setBounds={setBounds}
                setCoords={setCoords}
                coords={coords}
                places={filteredPlaces.length ? filteredPlaces : places}
              /> 
            </Box>  
              <FontAwesomeIcon icon={faGripLines} className='map-container--overlay__hide' onClick={() => closeNavH('show-map')}/>

            <Box>
              <List
                isLoading={isLoading}
                places={filteredPlaces.length ? filteredPlaces : places}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating} 
                value={attractions}
                onChange={setAttractions}
                />
            </Box> 
            
          </section>
        

        
      </section> 
    </>
  );
}
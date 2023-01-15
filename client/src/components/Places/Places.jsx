import { Fragment, useEffect, useState, useRef } from 'react';
import Header from '../Header';
import Map from './Map';
import List from './List';
import { Box, useColorMode, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { getPlacesData } from '../../api';
import { Autocomplete } from "@react-google-maps/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRight, faEarthAmericas, faGripLines } from '@fortawesome/free-solid-svg-icons';

import { openNav, closeNav } from '../../helpers/dropDownHelper';

import './Places.scss';

export default function Places(props) {

  const [type, setType] = useState('attractions');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState(null);
  const [bounds, setBounds] = useState(null);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

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
  const { colorMode } = useColorMode()

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });

  };
  return (
    <>    
      <Header />
      <section className='layout'>

        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>

          <section className='place-search'>

            <FontAwesomeIcon icon={faMagnifyingGlass} className='place-search--icon'/>
            <input 
              placeholder="Search location"
              className='place-search--bar'
              ref={textInput}
            />
            <FontAwesomeIcon icon={faArrowRight} className='place-search--button'/>

          </section>
        </Autocomplete>


          <section className='map-container'>

            <Box>
              <List
                isLoading={isLoading}
                places={filteredPlaces.length ? filteredPlaces : places}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating} />
            </Box> 

            <Box id="show-map" className='map-container--overlay'>
              <FontAwesomeIcon icon={faGripLines} className='map-container--overlay__hide' onClick={() => closeNav('show-map')}/>

              <Map 
                setBounds={setBounds}
                setCoords={setCoords}
                coords={coords}
                places={filteredPlaces.length ? filteredPlaces : places}
              /> 
            </Box>  
            
          </section>
        
          {coords && 
            <FontAwesomeIcon 
                icon={faEarthAmericas} 
                className="show-map" 
                onClick={() => openNav('show-map')}  
              />
          }
      </section> 
    </>
  );
}
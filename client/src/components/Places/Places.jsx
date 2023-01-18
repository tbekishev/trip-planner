import { useEffect, useRef, useState } from 'react';
import Header from '../Header';
import Map from './Map';
import List from './List';
import { Box, Flex, Input, useColorMode } from '@chakra-ui/react';
import { getPlacesData } from '../../api';
import { Autocomplete } from "@react-google-maps/api";
import { SearchIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Places.scss';

export default function Places(props) {

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
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

  const onLoad = (autoC) => setAutocomplete(autoC);
  const { colorMode } = useColorMode()

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };
  const textInput = useRef(null);
  useEffect(() => {
    textInput.current?.focus();
  }, []);
  return (
    <>    
        <Header />
      <Box pt={50}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>

          <section className='place-search'>

            <FontAwesomeIcon icon={faMagnifyingGlass} className='place-search--icon'/>
            <input 
              placeholder="Search location"
              className='place-search--bar'
              ref={textInput}
            />
          </section>
        </Autocomplete>
        <Box width='20'></Box>
        <Flex direction="row" justifyContent="center" alignItems="center">
          <Box w="100%" maxW="40%">
            <List
              isLoading={isLoading}
              places={filteredPlaces.length ? filteredPlaces : places}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating} />
          </Box> 
          <Box w="100%" maxW="60%">
            <Map 
              setBounds={setBounds}
              setCoords={setCoords}
              coords={coords}
              places={filteredPlaces.length ? filteredPlaces : places}
            /> 
           </Box>   
        </Flex>
      </Box> 
    </>
  );
}
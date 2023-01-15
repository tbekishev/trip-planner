import React, { Fragment, useEffect, useState, useRef } from 'react';
import Header from '../Header';
import Map from './Map';
import List from './List';
import { Box, useColorMode, Select, useToast, Image, Button, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Text, InputLeftElement, InputGroup  } from '@chakra-ui/react';
import { RangeDatepicker, SingleDatepicker } from 'chakra-dayzed-datepicker';

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [planName, setPlanName] = useState('');

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);

  const handlePlanNameChange = (event) => {
    setPlanName(event.target.value);
  }

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
            <FontAwesomeIcon icon={faArrowRight} className='place-search--button' onClick={onOpen}/>

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

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Other Preferences</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

              <FormControl>

                <FormControl>
                  <FormLabel>Name the Plan</FormLabel>
                  <Input ref={initialRef} placeholder='Plan name...' onChange={handlePlanNameChange}/>
                </FormControl>

                <FormLabel>Select Dates</FormLabel>
                <RangeDatepicker
                  selectedDates={selectedDates}
                  onDateChange={setSelectedDates}
                  minDate={new Date()}
                />

                <FormLabel>Select Daily Starting Time</FormLabel>
                <Select placeholder='Select option'>
                  <option value='option1'>5:00AM</option>
                  <option value='option2'>6:00AM</option>
                  <option value='option3'>7:00AM</option>
                  <option value='option4'>8:00AM</option>
                  <option value='option5'>9:00AM</option>
                  <option value='option6'>10:00AM</option>
                  <option value='option7'>11:00AM</option>
                  <option value='option8'>--Noon--</option>
                  <option value='option9'>1:00PM</option>
                  <option value='option10'>2:00PM</option>
                  <option value='option11'>3:00PM</option>
                  <option value='option12'>4:00PM</option>
                  <option value='option13'>5:00PM</option>
                  <option value='option14'>6:00PM</option>
                  <option value='option15'>7:00PM</option>
                  <option value='option16'>8:00PM</option>
                  <option value='option17'>9:00PM</option>
                  <option value='option18'>10:00PM</option>
                  <option value='option19'>11:00PM</option>
                  <option value='option20'>--Midnight--</option>
                  <option value='option21'>1:00AM</option>
                  <option value='option22'>2:00AM</option>
                  <option value='option23'>3:00AM</option>
                  <option value='option24'>4:00AM</option>
                </Select>

                <FormLabel>Select Daily Ending Time</FormLabel>
                <Select placeholder='Select option'>
                  <option value='option8'>--Noon--</option>
                  <option value='option9'>1:00PM</option>
                  <option value='option10'>2:00PM</option>
                  <option value='option11'>3:00PM</option>
                  <option value='option12'>4:00PM</option>
                  <option value='option13'>5:00PM</option>
                  <option value='option14'>6:00PM</option>
                  <option value='option15'>7:00PM</option>
                  <option value='option16'>8:00PM</option>
                  <option value='option17'>9:00PM</option>
                  <option value='option18'>10:00PM</option>
                  <option value='option19'>11:00PM</option>
                  <option value='option20'>--Midnight--</option>
                  <option value='option21'>1:00AM</option>
                  <option value='option22'>2:00AM</option>
                  <option value='option23'>3:00AM</option>
                  <option value='option24'>4:00AM</option>
                  <option value='option1'>5:00AM</option>
                  <option value='option2'>6:00AM</option>
                  <option value='option3'>7:00AM</option>
                  <option value='option4'>8:00AM</option>
                  <option value='option5'>9:00AM</option>
                  <option value='option6'>10:00AM</option>
                  <option value='option7'>11:00AM</option>
                </Select>

                <FormControl>
                  <FormLabel>Group Size</FormLabel>
                  <Input placeholder='Group of...'/>
                </FormControl>
                
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Confirm
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section> 
    </>
  );
}
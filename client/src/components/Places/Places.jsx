import React, { useEffect, useState, useRef } from 'react';
import Header from '../Header';
import Map from './Map';
import List from './List';
import { Box, useColorMode, Select, useToast, Image, Button, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Text, InputLeftElement, InputGroup  } from '@chakra-ui/react';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { useNavigate } from "react-router-dom";

import { getPlacesData } from '../../api';
import { Autocomplete } from "@react-google-maps/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRight, faEarthAmericas, faGripLines } from '@fortawesome/free-solid-svg-icons';

import { openNav, closeNav } from '../../helpers/dropDownHelper';

import axios from 'axios';


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

  const [attractions, setAttractions] = useState([]);
  localStorage.setItem("attractions", JSON.stringify(attractions));

  const [groupSize, setGroupSize] = useState([]);
  const [startingTime, setStartingTime] = useState([]);
  const [endingTime, setEndingTime] = useState([]);


  const handlePlanNameChange = (event) => {
    setPlanName(event.target.value);
  }

  const handleStartingTime = (event) => {
    setStartingTime(event.target.value);
  }

  const handleEndingTime = (event) => {
    setEndingTime(event.target.value);
  }

  const handleGroupSizeChange = (event) => {
    setGroupSize(event.target.value);
  }

  const obj = JSON.parse(localStorage.getItem("user"));
  const toast = useToast()

  let navigate = useNavigate(); 

  const userPlanning = {
    user_id: obj.id,
    name: planName,
    attractions: attractions,
    start_date: selectedDates[0],
    end_date: selectedDates[1],
    starting_time: startingTime,
    ending_time: endingTime,
    group_size: groupSize,
  }

  const clickHandler = (event) => {
    event.preventDefault();
    axios
      .post("/addplanning", {

        user_id: obj.id,
        name: planName,
        start_date: selectedDates[0],
        end_date: selectedDates[1],
        starting_time: startingTime,
        ending_time: endingTime,
        group_size: groupSize,
        
      })
      .then((result) => {
        onClose();
        toast({
          title: 'Location is added to your plan.',
          description: "We've created your plan for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        navigate('/planningId');
      })
      .catch((error) => {
        toast({
          title: 'Error.',
          description: "Your plan is not created. Try again later.",
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
    }

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

              {coords && 
                <FontAwesomeIcon 
                    icon={faEarthAmericas} 
                    className="show-map" 
                    onClick={() => openNav('show-map')}  
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
              <FontAwesomeIcon icon={faGripLines} className='map-container--overlay__hide' onClick={() => closeNav('show-map')}/>

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
                <Select placeholder='Select option' onChange={handleStartingTime}>
                  <option value='5:00AM'>5:00AM</option>
                  <option value='6:00AM'>6:00AM</option>
                  <option value='7:00AM'>7:00AM</option>
                  <option value='8:00AM'>8:00AM</option>
                  <option value='9:00AM'>9:00AM</option>
                  <option value='10:00AM'>10:00AM</option>
                  <option value='11:00AM'>11:00AM</option>
                  <option value='Noon'>--Noon--</option>
                  <option value='1:00PM'>1:00PM</option>
                  <option value='2:00PM'>2:00PM</option>
                  <option value='3:00PM'>3:00PM</option>
                  <option value='4:00PM'>4:00PM</option>
                  <option value='5:00PM'>5:00PM</option>
                  <option value='6:00PM'>6:00PM</option>
                  <option value='7:00PM'>7:00PM</option>
                  <option value='8:00PM'>8:00PM</option>
                  <option value='9:00PM'>9:00PM</option>
                  <option value='10:00PM'>10:00PM</option>
                  <option value='11:00PM'>11:00PM</option>
                  <option value='Midnight'>--Midnight--</option>
                  <option value='1:00AM'>1:00AM</option>
                  <option value='2:00AM'>2:00AM</option>
                  <option value='3:00AM'>3:00AM</option>
                  <option value='4:00AM'>4:00AM</option>
                </Select>

                <FormLabel>Select Daily Ending Time</FormLabel>
                <Select placeholder='Select option' onChange={handleEndingTime}>
                  <option value='Noon'>--Noon--</option>
                  <option value='1:00PM'>1:00PM</option>
                  <option value='2:00PM'>2:00PM</option>
                  <option value='3:00PM'>3:00PM</option>
                  <option value='4:00PM'>4:00PM</option>
                  <option value='5:00PM'>5:00PM</option>
                  <option value='6:00PM'>6:00PM</option>
                  <option value='7:00PM'>7:00PM</option>
                  <option value='8:00PM'>8:00PM</option>
                  <option value='9:00PM'>9:00PM</option>
                  <option value='10:00PM'>10:00PM</option>
                  <option value='11:00PM'>11:00PM</option>
                  <option value='Midnight'>--Midnight--</option>
                  <option value='1:00AM'>1:00AM</option>
                  <option value='2:00AM'>2:00AM</option>
                  <option value='3:00AM'>3:00AM</option>
                  <option value='4:00AM'>4:00AM</option>
                  <option value='5:00AM'>5:00AM</option>
                  <option value='6:00AM'>6:00AM</option>
                  <option value='7:00AM'>7:00AM</option>
                  <option value='8:00AM'>8:00AM</option>
                  <option value='9:00AM'>9:00AM</option>
                  <option value='10:00AM'>10:00AM</option>
                  <option value='11:00AM'>11:00AM</option>
                </Select>

                <FormControl>
                  <FormLabel>Group Size</FormLabel>
                  <Input placeholder='Group of...' onChange={handleGroupSizeChange}/>
                </FormControl>
                
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type='submit' onClick={clickHandler}>
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
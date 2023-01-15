import { useToast, Image, Button, Box, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Text, InputLeftElement, InputGroup } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RangeDatepicker, SingleDatepicker } from 'chakra-dayzed-datepicker';
import axios from 'axios';

export default function ListItems(props) {

  const defaultImageUrl = `https://api.unsplash.com/search/photos?page=1&query=restaurant&client_id=${process.env.REACT_APP_UNSPLASHKEY}&per_page=10&orientation=landscape`;

  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  const obj = JSON.parse(localStorage.getItem("user"));
  const [amount, setAmount] = useState('');
  const [planName, setPlanName] = useState('');
  const toast = useToast()

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const handlePlanNameChange = (event) => {
    setPlanName(event.target.value);
  }

  const clickHandler = (event) => {
    event.preventDefault();
    axios
      .post("/addlocation", {
        name: planName, 
        start_date: selectedDates[0], 
        end_date: selectedDates[1],  
        user_id: obj.id, 
        location_id: props.place.location_id,
        locationName: props.place.name,
        cityName: props.place.location_string,
        rate: props.place.rating, 
        average_budget: amount
      })
      .then((result) => {
        onClose();
        toast({
          title: 'Location is added to your plan.',
          description: "We've created your plan for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
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


  return (
    <Box 
      borderWidth='1px' 
      borderRadius='lg' 
      overflow='hidden'>
      <Image 
        src={props.place.photo ? props.place.photo.images.small.url : defaultImageUrl}
        alt={props.place.name} />

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {props.place.name}
        </Box>

        <Box>
          {property.formattedPrice}
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? 'gold' : 'gray.300'}
                icon='star'
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {property.reviewCount} reviews
          </Box>
        </Box>
      <Button variant='solid' colorScheme='blue' onClick={onOpen} >
        Add to my plan
      </Button>
      {localStorage.getItem("user") ? (
        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add this location to your plan</ModalHeader>
          <ModalCloseButton />
          <Text fontSize='3xl'>{property.name}</Text>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Select Dates</FormLabel>
              <RangeDatepicker
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
                minDate={new Date()}
              />
              <FormControl>
                <FormLabel>Average Budget</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children='$'
                  />
                  <Input placeholder='Enter amount' onChange={handleAmountChange} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Name the Plan</FormLabel>
                <Input ref={initialRef} placeholder='Plan name...' onChange={handlePlanNameChange}/>
              </FormControl>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={clickHandler} colorScheme='blue' mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      ):(
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Log in to your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input ref={initialRef} placeholder='First name' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input placeholder='Last name' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Login
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
              <Link color='teal.500' to='/register'>Don't have an account? Register here</Link>
          </ModalContent>
        </Modal>)};
      
      </Box>      
    </Box>
  );
}
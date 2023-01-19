import './PlanningListItem.scss';
import { useEffect, useState } from "react";
import axios from 'axios';
import noImage from '../img/no_image.jpg';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Image,
  Divider, 
  ButtonGroup, 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';

export default function PlanningListItem(props) {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const toast = useToast();

  const clickHandler = (event) => {
    event.preventDefault();
    axios
      .post("/reschedule", {
        location_id: props.id,
        new_date: selectedDate
      })
      .then((result) => {
        onClose();
        toast({
          title: 'Reschedule is done',
          description: "We've rescheduled your plan for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((error) => {
        toast({
          title: 'Error.',
          description: "Your plan is not rescheduled. Try again later.",
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
    
  }

  return (  
    
    <Card maxW='sm'>
    <CardBody>
    <Heading size='md'>{new Date(props.plan_date).toLocaleDateString()}</Heading>
      <Image
        src={props.photo_url === 'noImage' ? noImage : props.photo_url}
        alt={props.name}
        borderRadius='lg'
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>{props.name}</Heading>
        <Text>{props.city}</Text>
        <Text color='blue.600' fontSize='2xl'>
        {Array(5)
                        .fill('')
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            color={i < Number(props.rate) ? 'gold' : 'gray.300'}
                            icon='star'
                          />
                        ))}
        </Text>
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        <Button variant='solid' colorScheme='yellow' onClick={onOpen}>
          Reschedule
        </Button>
        <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Whant to reschedule?</ModalHeader>
          <ModalCloseButton />
          <Text fontSize='3xl'>{props.name}</Text>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Select Date</FormLabel>
              <SingleDatepicker
                date={selectedDate}
                onDateChange={setSelectedDate}
                minDate={new Date()}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={clickHandler} colorScheme='blue' mr={3}>
              Reschedule
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        <Button variant='ghost' colorScheme='red'>
          Delete
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
  );
}

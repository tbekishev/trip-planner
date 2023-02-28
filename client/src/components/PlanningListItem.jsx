import './PlanningListItem.scss';
import { useRef, useState } from "react";
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
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export default function PlanningListItem(props) {
  
  const rescheduleDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const toast = useToast();
  const cancelRef = useRef();

  const deleteHandler =(event) => {
    event.preventDefault();
    axios
      .post("/locationdelete", {
        location_id: props.id
      })
      .then((result) => {
        deleteDisclosure.onClose();
        props.setEdited(true);
        toast({
          title: 'Location is deleted!',
          description: "We've deleted your location for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((error) => {
        toast({
          title: 'Error.',
          description: "Your location is not deleted. Try again later.",
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
  }
  const clickHandler = (event) => {
    event.preventDefault();
    axios
      .post("/reschedule", {
        location_id: props.id,
        new_date: selectedDate
      })
      .then((result) => {
        rescheduleDisclosure.onClose();
        props.setEdited(true);
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
        <Button variant='solid' colorScheme='yellow' onClick={rescheduleDisclosure.onOpen}>
          Reschedule
        </Button>
        <Modal
        isOpen={rescheduleDisclosure.isOpen}
        onClose={rescheduleDisclosure.onClose}
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
            <Button onClick={rescheduleDisclosure.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        <Button variant='ghost' colorScheme='red' onClick={deleteDisclosure.onOpen}>
          Delete
        </Button>
        <AlertDialog
        isOpen={deleteDisclosure.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteDisclosure.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' >
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={deleteDisclosure.onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deleteHandler} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </ButtonGroup>
    </CardFooter>
  </Card>
  );
}

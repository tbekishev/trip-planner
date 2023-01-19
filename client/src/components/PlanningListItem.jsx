import './PlanningListItem.scss';
import { useEffect, useState } from "react";
import axios from 'axios';
import noImage from '../img/no_image.jpg';

import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionPanel,
  Image,
  Tag,
  CircularProgress, Divider, ButtonGroup, Button
} from '@chakra-ui/react'
import { EmailIcon, PhoneIcon, StarIcon } from '@chakra-ui/icons';

export default function PlanningListItem(props) {
  
  return (  
    // <Card
    //   direction={{ base: 'column', sm: 'row' }}
    //   overflow='hidden'
    //   variant='outline'
    //   className='planning-item'
    // >

    //   <Stack>
    //     <CardBody 
    //     borderWidth='1px' 
    //     borderRadius='lg' 
    //     overflow='hidden'
    //     width='350px'
    //     height='430px'>
    //       <Heading size='md'>{new Date(props.plan_date).toLocaleDateString()}</Heading>             
    //             <Box 
    //               borderWidth='1px' 
    //               borderRadius='lg' 
    //               overflow='hidden'>
    //               <Image 
    //                 style={{ height: 150, width: '100%', objectFit: 'cover' }}
    //                 src={props.photo_url === 'noImage' ? noImage : props.photo_url}
    //                 alt={place.name} />

    //               <Box p='6'>

    //                 <Box display='flex' mt='2' alignItems='center'>
    //                   {Array(5)
    //                     .fill('')
    //                     .map((_, i) => (
    //                       <StarIcon
    //                         key={i}
    //                         color={i < Number(props.rate) ? 'gold' : 'gray.300'}
    //                         icon='star'
    //                       />
    //                     ))}
    //                 </Box>
    //                   <Text as="p" mb={2} color="gray.600">
    //                     <EmailIcon name="location" mr={2} /> {props.city}
    //                   </Text>                   
                  
    //               </Box>      
    //             </Box>
      
    //     </CardBody>
    //   </Stack>
    // </Card>
    <Card maxW='sm'>
    <CardBody>
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
        <Button variant='solid' colorScheme='yellow'>
          Reschedule
        </Button>
        <Button variant='ghost' colorScheme='red'>
          Delete
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
  );
}

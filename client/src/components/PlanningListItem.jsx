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
  Image,
  Divider, 
  ButtonGroup, 
  Button
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';

export default function PlanningListItem(props) {
  
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

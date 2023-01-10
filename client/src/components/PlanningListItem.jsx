import './PlanningListItem.scss';
import { useEffect, useState } from "react";
import axios from 'axios';

import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react'

export default function PlanningListItem(props) {

  const [state, setState] = useState('');
  const locationName = props.name.replace(/\s+/g, '-').toLowerCase();
  const imageUrl = `https://api.unsplash.com/search/photos?page=1&query=${locationName}&client_id=${process.env.REACT_APP_UNSPLASHKEY}&per_page=10&orientation=landscape`;
  const random = Math.floor(Math.random() * 9 + 1);
  useEffect(() => {
    axios
    .get(imageUrl)
    .then((response) =>{
      setState(response.data.results[random].urls.regular);
    })
  }, []);
  return (      
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      className='planning-item'
    >
      <img
        src={state}
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <Heading size='md'>{props.name}</Heading>

          <Text className='planning-item--discription' py='2'>
            Caffè latte is a coffee beverage of Italian origin made with espresso
            and steamed milk.
          </Text>
        </CardBody>
        
        <CardFooter className='planning-item--footer'>
          4 days | ${props.budget} | Group of 4 | {props.city}
        </CardFooter>
      </Stack>
    </Card>
  );
}

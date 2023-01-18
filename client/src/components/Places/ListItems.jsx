import { Image, Box, Text, Tag } from '@chakra-ui/react';
import { StarIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import noImage from '../../img/no_image.jpg'
import classNames from "classnames";

import './ListItems.scss';

export default function ListItems(props) {

  const placeCardClass = classNames('place-card', {
    'place-card--selected': props.value.includes(props.place.name)
  })

  return (
    <Box 
      borderWidth='1px' 
      borderRadius='lg' 
      overflow='hidden'
      width='350px'
      height='400px'    
      onClick={() => {

        if (props.value.includes(props.place.name)) {
          props.setAttractions(() => [])
        }
        if (!props.value.includes(props.place.name)) {
          props.setAttractions([...props.value, props.place.name])}
        }
      }
      className={placeCardClass}
      >
      <Image 
        style={{ height: 150, width: '100%', objectFit: 'scale-down' }}
        src={props.place.photo ? props.place.photo.images.small.url : noImage}
        alt={props.place.name} />

      <Box p='6'>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {props.place.name}
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < Number(props.place.rating) ? 'gold' : 'gray.300'}
                icon='star'
              />
            ))}
          <Box as='span' ml='40' color='gray.600' fontSize='sm'>
            {props.place.num_reviews} reviews
          </Box>
        </Box>
        {props.place.price_level &&
        <Box >
          Price
        <Box as='span' ml='60'>
          {props.place.price_level}
        </Box>
        </Box> }
        <Box >
          Ranking
        <Box as='span' ml='5'>
          {props.place.ranking}
        </Box>
        </Box>
        {props.place?.awards?.map((award) => (
          <Box d="flex" justifyContent="space-between" my={1} alignItems="center">
          <img src={award.images.small} alt={props.place.name} />
          <Text variant="subtitle2" color="gray.600">{award.display_name}</Text>
          </Box>
        ))}
        <Box>
        {props.place?.cuisine?.map(({ name }) => (
          <Tag key={name} size="sm" variantColor="green" mr={2} >{name}</Tag>
        ))}
        </Box>
        {props.place.address && (
          <Text as="p" mb={2} color="gray.600">
            <EmailIcon name="location" mr={2} /> {props.place.address}
          </Text>
        )}
        {props.place.phone && (
          <Text as="p" color="gray.600">
            <PhoneIcon mr={2} /> {props.place.phone}
          </Text>
        )}
        
      
      </Box>      
    </Box>
  );
}
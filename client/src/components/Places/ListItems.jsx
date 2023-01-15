import { useToast, Alert, AlertIcon, Card, CardBody, Heading, Stack, Image, Divider, CardFooter, ButtonGroup, Button, Box, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Text, InputLeftElement, InputGroup, Tag } from '@chakra-ui/react';
import { StarIcon, Icon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RangeDatepicker, SingleDatepicker } from 'chakra-dayzed-datepicker';
import axios from 'axios';
import noImage from '../../img/no_image.jpg'

export default function ListItems(props) {

  const defaultImageUrl = '../../img/no_image.jpg';

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

  return (
    <Box 
      borderWidth='1px' 
      borderRadius='lg' 
      overflow='hidden'>
      <Image 
        style={{ height: 350 }}
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
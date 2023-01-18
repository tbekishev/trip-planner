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
  CircularProgress,
} from '@chakra-ui/react'
import { EmailIcon, PhoneIcon, StarIcon } from '@chakra-ui/icons';

export default function PlanningListItem(props) {

  const [isLoading, setisLoading] = useState(false);
  const place = {
    "location_id": "706333",
    "name": "Little Louis' Oyster Bar",
    "latitude": "46.09636",
    "longitude": "-64.80754",
    "num_reviews": "300",
    "timezone": "America/Moncton",
    "location_string": "Moncton, New Brunswick",
    "photo": {
        "images": {
            "small": {
                "width": "150",
                "url": "https://media-cdn.tripadvisor.com/media/photo-l/0f/1a/e2/19/photo0jpg.jpg",
                "height": "150"
            },
            "thumbnail": {
                "width": "50",
                "url": "https://media-cdn.tripadvisor.com/media/photo-t/0f/1a/e2/19/photo0jpg.jpg",
                "height": "50"
            },
            "original": {
                "width": "1536",
                "url": "https://media-cdn.tripadvisor.com/media/photo-o/0f/1a/e2/19/photo0jpg.jpg",
                "height": "2048"
            },
            "large": {
                "width": "550",
                "url": "https://media-cdn.tripadvisor.com/media/photo-p/0f/1a/e2/19/photo0jpg.jpg",
                "height": "733"
            },
            "medium": {
                "width": "338",
                "url": "https://media-cdn.tripadvisor.com/media/photo-s/0f/1a/e2/19/photo0jpg.jpg",
                "height": "450"
            }
        },
        "is_blessed": true,
        "uploaded_date": "2017-04-27T11:01:03-0400",
        "caption": "",
        "id": "253420057",
        "helpful_votes": "0",
        "published_date": "2017-04-27T11:01:03-0400",
        "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
        }
    },
    "awards": [],
    "doubleclick_zone": "na.can.new_brunswick",
    "preferred_map_engine": "default",
    "raw_ranking": "4.701162815093994",
    "ranking_geo": "Moncton",
    "ranking_geo_id": "154958",
    "ranking_position": "1",
    "ranking_denominator": "214",
    "ranking_category": "restaurant",
    "ranking": "#1 of 176 Restaurants in Moncton",
    "distance": "0.39913930487672594",
    "distance_string": "0.4 km",
    "bearing": "south",
    "rating": "5.0",
    "is_closed": false,
    "open_now_text": "Closed Now",
    "is_long_closed": false,
    "price_level": "$$$$",
    "description": "",
    "web_url": "https://www.tripadvisor.com/Restaurant_Review-g154958-d706333-Reviews-Little_Louis_Oyster_Bar-Moncton_New_Brunswick.html",
    "write_review": "https://www.tripadvisor.com/UserReview-g154958-d706333-Little_Louis_Oyster_Bar-Moncton_New_Brunswick.html",
    "ancestors": [
        {
            "subcategory": [
                {
                    "key": "city",
                    "name": "City"
                }
            ],
            "name": "Moncton",
            "abbrv": null,
            "location_id": "154958"
        },
        {
            "subcategory": [
                {
                    "key": "province",
                    "name": "Province"
                }
            ],
            "name": "New Brunswick",
            "abbrv": null,
            "location_id": "154956"
        },
        {
            "subcategory": [
                {
                    "key": "country",
                    "name": "Country"
                }
            ],
            "name": "Canada",
            "abbrv": null,
            "location_id": "153339"
        }
    ],
    "category": {
        "key": "restaurant",
        "name": "Restaurant"
    },
    "subcategory": [
        {
            "key": "sit_down",
            "name": "Sit down"
        }
    ],
    "parent_display_name": "Moncton",
    "is_jfy_enabled": false,
    "nearest_metro_station": [],
    "phone": "+1 506-855-2022",
    "website": "http://www.littlelouis.ca/",
    "address_obj": {
        "street1": "245 Collishaw St 2nd Floor",
        "street2": "",
        "city": "Moncton",
        "state": null,
        "country": "Canada",
        "postalcode": "E1C 9P9"
    },
    "address": "245 Collishaw St 2nd Floor, Moncton, New Brunswick E1C 9P9 Canada",
    "hours": {
        "week_ranges": [
            [
                {
                    "open_time": 1020,
                    "close_time": 1290
                }
            ],
            [
                {
                    "open_time": 1020,
                    "close_time": 1290
                }
            ],
            [
                {
                    "open_time": 1020,
                    "close_time": 1290
                }
            ],
            [
                {
                    "open_time": 1020,
                    "close_time": 1290
                }
            ],
            [
                {
                    "open_time": 1020,
                    "close_time": 1290
                }
            ],
            [
                {
                    "open_time": 1020,
                    "close_time": 1290
                }
            ],
            [
                {
                    "open_time": 1020,
                    "close_time": 1290
                }
            ]
        ],
        "timezone": "America/Moncton"
    },
    "is_candidate_for_contact_info_suppression": false,
    "cuisine": [
        {
            "key": "10643",
            "name": "Seafood"
        },
        {
            "key": "10699",
            "name": "Canadian"
        },
        {
            "key": "10665",
            "name": "Vegetarian Friendly"
        },
        {
            "key": "10697",
            "name": "Vegan Options"
        },
        {
            "key": "10992",
            "name": "Gluten Free Options"
        }
    ],
    "dietary_restrictions": [
        {
            "key": "10665",
            "name": "Vegetarian Friendly"
        },
        {
            "key": "10697",
            "name": "Vegan Options"
        },
        {
            "key": "10992",
            "name": "Gluten Free Options"
        }
    ],
    "establishment_types": [
        {
            "key": "10591",
            "name": "Restaurants"
        }
    ]
}
  return (  
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      className='planning-item'
    >

      <Stack>
        <CardBody>
          <Heading size='md'>{props.name}</Heading>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                  {new Date(props.start_date).toLocaleDateString()} - {new Date(props.end_date).toLocaleDateString()}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} >
              {isLoading ? (
        <Box width="100%" height="100%" justifyContent="center" alignItems="center" d="flex">
          <CircularProgress isIndeterminate color="orange" size="5rem" />
        </Box>
      ) : (
      
                <Box 
                  borderWidth='1px' 
                  borderRadius='lg' 
                  overflow='hidden'>
                  <Image 
                    style={{ height: 150, width: '100%', objectFit: 'cover' }}
                    src={place.photo ? place.photo.images.small.url : noImage}
                    alt={place.name} />

                  <Box p='6'>
                    <Box
                      mt='1'
                      fontWeight='semibold'
                      as='h4'
                      lineHeight='tight'
                      noOfLines={1}
                    >
                      {place.name}
                    </Box>

                    <Box display='flex' mt='2' alignItems='center'>
                      {Array(5)
                        .fill('')
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            color={i < Number(place.rating) ? 'gold' : 'gray.300'}
                            icon='star'
                          />
                        ))}
                      <Box as='span' ml='40' color='gray.600' fontSize='sm'>
                        {place.num_reviews} reviews
                      </Box>
                    </Box>
                    {place.price_level &&
                    <Box >
                      Price
                    <Box as='span' ml='60'>
                      {place.price_level}
                    </Box>
                    </Box> }
                    <Box >
                      Ranking
                    <Box as='span' ml='5'>
                      {place.ranking}
                    </Box>
                    </Box>
                    {place?.awards?.map((award) => (
                      <Box d="flex" justifyContent="space-between" my={1} alignItems="center">
                      <img src={award.images.small} alt={place.name} />
                      <Text variant="subtitle2" color="gray.600">{award.display_name}</Text>
                      </Box>
                    ))}
                    <Box>
                    {place?.cuisine?.map(({ name }) => (
                      <Tag key={name} size="sm" variantColor="green" mr={2} >{name}</Tag>
                    ))}
                    </Box>
                    {place.address && (
                      <Text as="p" mb={2} color="gray.600">
                        <EmailIcon name="location" mr={2} /> {place.address}
                      </Text>
                    )}
                    {place.phone && (
                      <Text as="p" color="gray.600">
                        <PhoneIcon mr={2} /> {place.phone}
                      </Text>
                    )}
                    
                  
                  </Box>      
                </Box>
      )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Stack>
    </Card>
  );
}

import { Card, CardBody, Heading, Stack, Image, Divider, CardFooter, ButtonGroup, Button, Box, Badge } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
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

  return (
    <Box m
      axW='sm' 
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
          {props.place.price_level}
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
      <Button variant='solid' colorScheme='blue'>
        Add to my plan
      </Button>
      </Box>
    </Box>
  )
}
//   return (
//       <Card maxW={'sm'}>
//         <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
//           <Image
//             src={props.place.photo ? props.place.photo.images.small.url : defaultImageUrl}
//             alt={props.place.name}
//           />
//           <Box p='6'>
//             <Box display='flex' alignItems='baseline'>
//             </Box>
//             <Box>
//               {props.place.price_level}
//             </Box>
//           </Box>
//         </Box>
//         <CardBody>
//           <Stack mt='6' spacing='3'>
//             <Heading size='md'>{props.place.name}</Heading>
            
//           </Stack>
//         </CardBody>
//         <Divider/>
//         <CardFooter>
//           <ButtonGroup spacing='2'>
//             <Button variant='solid' colorScheme='yellow'>Add to my plan</Button>
//           </ButtonGroup>
//         </CardFooter>
//       </Card>
//   );
// }
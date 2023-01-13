import { Card, CardBody, Heading, Stack, Image, Divider, CardFooter, ButtonGroup, Button, Box, Badge, ChakraProvider } from '@chakra-ui/react';

export default function ListItems(props) {

  const defaultImageUrl = `https://api.unsplash.com/search/photos?page=1&query=restaurant&client_id=${process.env.REACT_APP_UNSPLASHKEY}&per_page=10&orientation=landscape`;

  return (
    <ChakraProvider>
      <Card maxW={'sm'}>
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Image
            src={props.place.photo ? props.place.photo.images.small.url : defaultImageUrl}
            alt={props.place.name}
          />
          <Box p='6'>
            <Box display='flex' alignItems='baseline'>
            </Box>
            <Box>
              {props.place.price_level}
            </Box>
          </Box>
        </Box>
        <CardBody>
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{props.place.name}</Heading>
            
          </Stack>
        </CardBody>
        <Divider/>
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='yellow'>Add to my plan</Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      </ChakraProvider>
  );
}
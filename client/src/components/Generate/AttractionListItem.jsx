import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react'

export default function AttractionListItem() {

  return (      
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      className='planning-item'
    >
      <img
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <Heading size='md'>Attraction Title</Heading>

          <Text className='planning-item--discription' py='2'>
            Caffè latte is a coffee beverage of Italian origin made with espresso
            and steamed milk.
          </Text>
        </CardBody>
        
        <CardFooter className='planning-item--footer'>
          Average spent $2000 | Average time 2 ~ 3 hrs
        </CardFooter>
      </Stack>
    </Card>
  );
}

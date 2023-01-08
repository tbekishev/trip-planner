import './PlanningListItem.scss';
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react'

export default function PlanningListItem() {

  return (      
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      className='planning-items'
    >
      <img
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <Heading size='md'>Trip 1</Heading>

          <Text py='2'>
            Caffè latte is a coffee beverage of Italian origin made with espresso
            and steamed milk.
          </Text>
        </CardBody>
        
        <CardFooter className='planning-items--footer'>
          4 days | $2000 | Group of 4 | @Toronto
        </CardFooter>
      </Stack>
    </Card>
  );
}

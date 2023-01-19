import { StarIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react'
import noImage from '../../img/no_image.jpg';
import './AttractionListItem.scss';

export default function AttractionListItem(props) {

  return (      
    <Card className='attraction'>
    <CardBody>
    <Heading fontWeight='300' size='md'>{props.name}</Heading>
      <Image
        src={props.photo_url === 'noImage' ? noImage : props.photo_url}
        alt={props.name}
        className='attraction-img'
      />
      <Stack>
        <Text className='attraction-city'>{props.city}</Text>
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
  </Card>
  );
}

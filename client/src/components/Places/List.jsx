import ListItems from './ListItems';
import { Box, SimpleGrid } from '@chakra-ui/react';

export default function List(props) {

  return (
    <div>
      <Box boxShadow='md' p='6' rounded='md' bg='white'>
      <SimpleGrid spacing='4' templateColumns={'repeat(auto-fill, minmax(200px, 1fr))'}>
      {props.places?.map((place, index) => (
        <div key={index}>
          <ListItems place={place}/>
        </div>
      ))}
      </SimpleGrid>
      </Box>
    </div>
  );
}
import ListItems from './ListItems';
import { Box, CircularProgress, FormControl, FormLabel, Select, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function List(props) {

  const isLoading = false;
  const [rating, setRating] = useState('');
  return (
    <Box style={{padding: '25px'}}>
      <Text fontSize="xl">Attractions, Accomodations & Dining around you</Text>
      {isLoading ? (
        <Box justifyContent="center" alignItems="center" d="flex">
          <CircularProgress isIndeterminate color="teal" size="5rem" />
        </Box>
      ) : (
      <>
        <FormControl style={{margin: '1rem', minWidth: 120, marginBottom: '30px'}}>
          <FormLabel>Type</FormLabel>
          <Select value={props.type} onChange={(e) => props.setType(e.target.value)}>
            <option value="restaurants">Restaurants</option>
            <option value="hotels">Hotels</option>
            <option value="attractions">Attractions</option>
          </Select>
        </FormControl>
        <FormControl style={{margin: '1rem', minWidth: 120, marginBottom: '30px'}}>
          <FormLabel>Rating</FormLabel>
          <Select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">All</option>
            <option value="3">Above 3.0</option>
            <option value="4">Above 4.0</option>
            <option value="4.5">Above 4.5</option>
          </Select>
        </FormControl> 
        <Box display="flex" flexWrap="wrap" style={{height: '75vh', overflow: 'auto'}}>
          {/* <Box p={2}>
            <ListItems  />
          </Box> */}
           {props.places?.map((place, i) => (
            <Box key={i} p={2}>
              <ListItems place={place} />
            </Box>
          ))}
        </Box>       
      </>
      )}
    </Box>
  );
}
import ListItems from './ListItems';
import { Box, CircularProgress, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useState } from 'react';
import './List.scss';

export default function List(props) {

  const isLoading = false;
  const [rating, setRating] = useState('');
  return (
    <Box style={{padding: '25px'}}>

      {isLoading ? (
        <Box justifyContent="center" alignItems="center" d="flex">
          <CircularProgress isIndeterminate color="teal" size="5rem" />
        </Box>
      ) : (
      <div>
        <section className='top-container'>
          <div className='filter'>

            <FormControl className='filter-item'>
              <FormLabel>Type</FormLabel>
              <Select value={props.type} onChange={(e) => props.setType(e.target.value)}>
                <option value="attractions">Attractions</option>
                <option value="restaurants">Restaurants</option>
                <option value="hotels">Hotels</option>
              </Select>
            </FormControl>

            <FormControl className='filter-item'>
              <FormLabel>Rating</FormLabel>
              <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="">All</option>
                <option value="3">Above 3.0</option>
                <option value="4">Above 4.0</option>
                <option value="4.5">Above 4.5</option>
              </Select>
            </FormControl> 
          </div>

        </section>


        <Box display="flex" flexWrap="wrap" style={{height: '75vh', overflow: 'auto'}}>
           {props.places?.map((place, i) => (
            <Box key={i} p={2}>
              <ListItems place={place} />
            </Box>
          ))}
        </Box>       
      </div>
      )}
    </Box>
  );
}
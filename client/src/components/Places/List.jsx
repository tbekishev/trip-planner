import ListItems from './ListItems';
import { Box, CircularProgress, FormControl, FormLabel, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import './List.scss';

export default function List(props) {

  return (
    <Box style={{padding: '25px'}}>

        <section className='top-container'>
          <div className='filter'>

          <FormControl className='filter-item'>
            <FormLabel>Type</FormLabel>
            <RadioGroup value={props.type} onChange={props.setType}>
              <Stack direction="row">
                <Radio value="attractions">Attractions</Radio>
                <Radio value="restaurants">Restaurants</Radio>
                <Radio value="hotels">Hotels</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

            <FormControl className='filter-item'>
              <FormLabel>Rating</FormLabel>
              <RadioGroup value={props.rating} onChange={props.setRating}>
              <Stack direction="row">
                <Radio value="">All</Radio>
                <Radio value="3">Above 3.0</Radio>
                <Radio value="4">Above 4.0</Radio>
                <Radio value="4.5">Above 4.5</Radio>
              </Stack>
              </RadioGroup>
            </FormControl> 
          </div>

        </section>
      {props.isLoading ? (
        <Box justifyContent="center" alignItems="center" d="flex">
          <CircularProgress isIndeterminate color="teal" size="5rem" />
        </Box>
      ) : (


        <Box display="flex" flexWrap="wrap" style={{height: '75vh', overflow: 'auto'}}>
           {props.places?.map((place, i) => (
            <Box key={i} p={2}>
              <ListItems place={place} />
            </Box>
          ))}
        </Box> 
      )}
    </Box>
  );
}
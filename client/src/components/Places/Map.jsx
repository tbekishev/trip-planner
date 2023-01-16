import GoogleMapReact from 'google-map-react';
import './Map.scss';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';

export default function Map(props) {
  const changeHandler = (event) => {
    props.setCoords({lat: event.center.lat, lng: event.center.lng});
    props.setBounds({ne: event.marginBounds.ne, sw: event.marginBounds.sw});
  }
  return (
    <main>
      <div className='map-style'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={props.coords}
          center={props.coords}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={{ disableDefaultUI: true, zoomControl: true }}          
          onChange={changeHandler}
          >
            {props.places?.map((place, index) => (
              <div
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={index}
                style={{position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 }}}
              >
                <Box 
                  style={{
                    padding: '10px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    width: '80px',
                    backgroundColor: 'white'
                  }}
                  >
                <Text as="h2"  mb={2}>{place.name}</Text>
                <img src={place.photo && place.photo.images.thumbnail.url} alt={place.name}></img>
                <Box>
              {Array(5)
                .fill('')
                .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < Number(place.rating) ? 'gold' : 'gray.300'}
                  icon='star'
                />
              ))}</Box></Box>
              </div>
            ))}
        </GoogleMapReact>     
      </div>
    </main>
  );
}
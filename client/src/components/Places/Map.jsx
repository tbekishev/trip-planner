import GoogleMapReact from 'google-map-react';
import mapStyles from './mapStyles';

export default function Map(props) {
  const changeHandler = (event) => {
    props.setCoordinates({lat: event.center.lat, lng: event.center.lng});
    props.setBounds({ne: event.marginBounds.ne, sw: event.marginBounds.sw});
  }
  return (
    <main>
      <div style={{height: '85vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={props.coordinates}
          center={props.coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}          
          onChange={changeHandler}
          // onChildClick={() => {}}
          >
            {props.places?.map((place, index) => (
              <div
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={index}
              >
              {
                <img src={place.photo ? place.photo.images.thumbnail.url : `https://api.unsplash.com/search/photos?page=1&query=restaurant&client_id=${process.env.REACT_APP_UNSPLASHKEY}&per_page=10&orientation=landscape`} alt={place.name}></img>
              }
              </div>
            ))}
        </GoogleMapReact>     
      </div>
    </main>
  );
}
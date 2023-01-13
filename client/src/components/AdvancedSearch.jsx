import Header from "./Header";
import './AdvancedSearch.scss'
import GenerateButton from './GenerateButton';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'


export default function AdvancedSearch () {
  return (
    <main>

      <section className='header'>
        <Header />
      </section>
      <GenerateButton>Generate Trip</GenerateButton>
      <section className='planning-list' style={{'marginTop': '110px'}}>

        <span className='planning-list--title'>Advanced Preferences</span>
        <br/><br/>

        <form className='preference-form'>

          <ul>
            <li>
              <span className="preference-title">
                Name of your trip
              </span>
              <input
                className='advanced-input'
                name="name"
                type="text"
              />
            </li>

            <li>
              <span className="preference-title">
                Buget of your trip
              </span>
              <Slider defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

            </li>

            <li>
              <span className="preference-title">
                Group size
              </span>

            </li>

            <li>
              <span className="preference-title">
                Start date
              </span>

            </li>
          </ul>



        </form>
      </section>


    </main>
  );
}
import Header from "./Header";
import './AdvancedSearch.scss'
import GenerateButton from './GenerateButton';

export default function AdvancedSearch () {

  return (
    <main>
      <section className='header'>
        <Header />
      </section>
      <GenerateButton>Generate Trip</GenerateButton>
      <section className='planning-list' style={{'margin-top': '110px'}}>

        <span className='planning-list--title'>Advanced Preferences</span>
        <br/><br/>


      </section>
    </main>
  );
}
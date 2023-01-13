import Header from "../Header";
import AttractionList from './AttractionList'
import GenerateButton from '../GenerateButton';

export default function Generate() {

  return (
    <main>
      <section className='header'>
        <Header />
      </section>
      <GenerateButton>Next step</GenerateButton>

      <section className='planning-list' style={{'marginTop': '110px'}}>

        <span className='planning-list--title'>Plannings for <span className='location'>Toronto</span></span>
        <br/><br/>
        <div className='planning-list--container'>
          <AttractionList />
        </div>
      </section>
    </main>
  );
}
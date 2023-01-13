import './PlanningListItem.scss';
import './Plannings.scss';
import PlanningList from './PlanningList';
import Header from './Header';

export default function Plannings() {

  return (
    <main>
      <section className='header'>
        <Header />
      </section>
      <section className='planning-list' style={{'marginTop': '110px'}}>

        <span className='planning-list--title'>Plannings for <span className='location'>Toronto</span></span>
        <br/><br/>
        <div className='planning-list--container'>
          <PlanningList />
        </div>
      </section>
    </main>
  );
}
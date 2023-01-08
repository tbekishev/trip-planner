import './App.scss';
import Header from './Header';
import PlanningList from './PlanningList';

export default function App() {

  return (
    <main>

      <section className='header'>
        <Header />
      </section>

      <section className='planning-list'>
        <span className='planning-list--title'>Popular Plannings</span>

        <div className='planning-list--container'>
          <PlanningList />
        </div>
      </section>

    </main>
  );
}

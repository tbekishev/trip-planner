import Header from "./Header";
import PlanningList from "./PlanningList";
import './Home.scss';

export default function Home() {
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
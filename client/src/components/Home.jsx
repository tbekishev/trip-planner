import Header from "./Header";
import './Home.scss';
import { useNavigate, useLocation } from "react-router-dom";
import AttractionList from "./Generate/AttractionList";

export default function Home() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <main>

      <Header />

      <section onClick={() => {navigate('/places')}} className="start-planning">
        <span>
          Start planning today
        </span>
        <span className="start-planning--description">
          Let's go wild with a trip you didn't plan for.
        </span>
      </section>
      
      <section className='planning-list' style={{marginTop: pathname === '/' ? '30px' : ''}}>

        <span className='planning-list--title'>Popular locations</span>

        <div className='planning-list--container'>
          <AttractionList/>
        </div>
      </section>

    </main>
  );
}
import Header from "./Header";
import PlanningList from "./PlanningList";
import './Home.scss';
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main>

    <section className='header'>
      <Header />
    </section>
    <section className='planning-list'>
    <Button onClick={() => {navigate('/places')}} colorScheme='yellow' size='lg'>
    Start now!
  </Button>
    <p>
    "Welcome to our trip planner site! We're excited to help you plan your next adventure. Whether you're looking to explore a new city or take a relaxing beach vacation, we have everything you need to make your trip a success. Browse through our wide selection of destinations and accommodations, and let us help you plan the trip of a lifetime."

"Start by searching for your desired destination, or take a look at our featured trips and popular destinations for inspiration. We offer a variety of travel options, from budget-friendly to luxury, to suit your needs. You can also customize your trip by adding activities, tours, and transportation. With our user-friendly interface, planning your dream trip has never been easier!"
    </p>
      <span className='planning-list--title'>Popular Plannings</span>

      <div className='planning-list--container'>
        <PlanningList />
      </div>
    </section>

  </main>
  );
}
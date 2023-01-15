import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Plannings from './components/Plannings';
import Generate from './components/Generate';
import AdvancedSearch from './components/AdvancedSearch';
import UserProfile from './components/UserProfile';
import Places from "./components/Places/Places";
import TrendAttractions from './components/TrendAttractions';

const obj = JSON.parse(localStorage.getItem("user"));

export default function App() {
  return (
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>  
          <Route path='/login' element={<Login/>}/> 
          <Route path='/plannings' element={<Plannings/>}/>
          <Route path='/generate' element={<Generate/>}/>  
          <Route path='/advanced' element={<AdvancedSearch/>}/> 
          <Route path='/profile' element={obj ? <UserProfile /> : <Login />}/>
          <Route path='/places' element={<Places/>}/>
          <Route path='/trend-attrctions' element={<TrendAttractions/>}/>
      </Routes>
  );
}

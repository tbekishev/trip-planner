import './Register.scss';
import Header from './Header';
import { Input } from '@chakra-ui/react'

export default function Register() {

  return (
    <main>
      <Header />
      <ul>
        <li>
          <Input placeholder='First name' className='registration'/>
        </li>
      </ul>
    </main>
  );
}

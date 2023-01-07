import './Register.scss';
import Header from './Header';

export default function Register() {

  return (
    <main>
      <Header />

      <section className='register'>
        <h1 className='register-heading'><span>CREATE</span>
          <div>
            <span> an</span><span> acount</span>
          </div>
        </h1>

        <h4 className='promotion-line'>and start planning today!</h4>

        <form className='register-form'>
          <input
            className='input-contents'
            name="firstName"
            type="text"
            placeholder="First name"
          />
          <input
            className='input-contents'
            name="lastName"
            type="text"
            placeholder="Last name"
          />
          <input
            className='input-contents'
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            className='input-contents'
            name="password"
            type="password"
            placeholder="Password"
          />
          <input
            className='input-contents'
            name="passwordConfirmation"
            type="password"
            placeholder="Password confirmation"
          />
          <button type="submit" name="search-submit" className='register-button'>
            Submit
          </button>

        </form>

      </section>

    </main>
  );
}

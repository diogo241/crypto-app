import { Link } from 'react-router';

const Header = () => {
  return <div className="top-nav">
    <Link className='top-nav__link' to='/'>Home</Link>
    <Link className='top-nav__link' to='/about'>About</Link>
  </div>;
};

export default Header;

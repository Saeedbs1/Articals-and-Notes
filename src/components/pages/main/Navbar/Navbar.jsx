import './Navbar.scss';
import logo from '../assets/logo.png'
export default function Navbar(){
   return( <div className='navbar'>
    <div className='navbar-content'>
        <img src={logo} alt='Neo Logo'/>
        </div>
    </div>
   );
}
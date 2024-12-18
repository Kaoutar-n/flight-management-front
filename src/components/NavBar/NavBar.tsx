import { SiConsul } from "react-icons/si";
import { BsPhoneVibrate } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";

import logo from "../../assets/logo.png"
import { useState } from "react";
import { Link } from "react-router-dom";


function NavBar() {

    const [active, setActive] = useState<string>('navBarMenu');

    const showNavBar = (): void => {
        setActive('navBarMenu showNavBar');
    };
    
    const removeNavBar = (): void => {
        setActive('navBarMenu');
    };


  return (
    <div className="navBar flex">
      <div className="navBarOne flex">
        <div>
          <SiConsul className="icon"/>
        </div>
        <div className=" none flex">
          <li className="flex">
            <BsPhoneVibrate className="icon" /> Support
          </li>
          <li className="flex">
            <AiOutlineGlobal className="icon"/>
            Languages
          </li>
        </div>
        <div className="atb flex">
             <Link to={"/register"}><span>Sign up</span></Link>
           <Link to={"/login"}> <span>Sign in</span></Link>

        </div>


      </div>

      <div className="navBarTwo flex">
        <div className="logoDiv">
            <img src={logo} className="Logo" />
        </div>
        <div className={active}>

            <ul className="menu flex">

                <li onClick={removeNavBar} className="listItem">Home</li>
                <li onClick={removeNavBar} className="listItem">About</li>

                <li onClick={removeNavBar} className="listItem">Offers</li>

                <li onClick={removeNavBar} className="listItem">Services</li>

                <li onClick={removeNavBar} className="listItem">Other</li>

            </ul>
            <button onClick={removeNavBar} className='btn flex btnOne'>Contact</button>
            
        </div>
        <button className='btn flex btnTwo'>Contact</button>

         <div onClick={showNavBar} className="toggleIcon">
         <CgMenuGridO className="icon"/>

         </div>
      </div>
    </div>
  );
}

export default NavBar;

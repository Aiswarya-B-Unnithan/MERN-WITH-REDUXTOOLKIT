import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Home = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const name = userInfo?.name;
  const image = userInfo?.profileimage

  return (
    <div className="home-container">
      <div className="content">
        {name ? (
          <>
          
          {image && (
              <img src={image} alt="" className="fixed-image" />
            )}
            <h1 className="heading">Welcome, {name}!</h1>
            <p className="sub-heading">The Journey Begins here</p>
          </>
        ) : (
          <>

            <h1 className="heading">Hello User!</h1>
            <p className="sub-heading">
              Please
              <Link to='/login' style={{textDecoration:'none',color: 'grey'}}> Login </Link>
              if you're our existing customer,
              <br></br>
              or you can always join us now!
            </p>

          </>
        )}
      </div>
    </div>
  );
};

export default Home;


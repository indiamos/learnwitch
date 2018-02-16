import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../store';

/* --------------------------------- COMPONENT ---------------------------------
 *  The Main component is our 'picture frame' - it displays the navbar and
 *  anything else common to our entire app. The 'picture' inside the frame is
 *  the space rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props;

  return (
    <div className="main">
      <div className="main-top-area">
        <h1 className="nameplate">LearnWitch</h1>
        <nav className="main-nav">
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>Log Out</a>
              </div>
              : <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
          }
        </nav>
      </div>
      {children}
    </div>
  );
};

/* -------------------- CONTAINER ------------------- */

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/* -------------------- PROP TYPES ------------------- */

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

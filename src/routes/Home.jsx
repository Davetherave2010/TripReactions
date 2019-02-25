import React, { Component } from 'react';
import '../styles/Home.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { logout } from '../state/actions/user.js'

class Home extends Component {
  constructor (props) {
    super(props);
    this.renderUserName = this.renderUserName.bind(this)
  }

  renderUserName () {

    if (this.props.user.status === "logged-in") {
      return (
        <div>
          <p className="header__text">Welcome back {this.props.user.firstname}. Come to get more deals?</p>
          <p className="header__text">
            <button className="button header__button" onClick={() => this.props.dispatch(logout())}>Logout</button>
          </p>
        </div>
      )
    }
    return (
      <div>
        <p className="header__text">Hello there. Welcome to TripReactions</p>
        <Link to="/login"><button className="button header__button">Login</button></Link>
      </div>
    )
  }

  render() {
    const hotels = this.props.hotels
    return (
      <div className="Home">
        <header className="header">
          <h1 className="header__title">Hotels</h1>
          {this.renderUserName()}
        </header>
        <section>
          <ul className="hotels-list">
            {hotels.map((hotel, index) => {
              return (
                <li key={index} className="hotels-list__item">
                  <Link to={`/hotel/${hotel.id}`}>
                    <div className="hotels-list__item-image-wrapper">
                      <img className="hotels-list__item-image" src={hotel.image} alt={hotel.name}/>
                    </div>
                    <div className="hotels-list__item-text-wrapper">
                      <h2 className="hotels-list__item-heading">{hotel.name}</h2>
                      <p>{hotel.description}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

// He Connec
let ConnectedHome = connect(
  mapStateToProps,
  null
)(Home)
export default ConnectedHome

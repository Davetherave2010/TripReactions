import React, { Component } from 'react';
import history from '../history';
import { getWindowQueryValue } from '../helpers.js'
import '../styles/BookingSuccessful.css';
import {Link} from "react-router-dom";


class BookingSuccessful extends Component {
  constructor(props){
    super(props)
    this.hotelId = this.props.match.params.hotelId
    this.hotel = this.props.hotels.filter((hotel) => hotel.id === this.hotelId)[0]
    this.checkInDate = new Date(getWindowQueryValue('checkin'))
    if (this.hotel === undefined || getWindowQueryValue('checkin') === null) { return history.push('/error')}
  }

  render() {
    return (
      <div className="Booking-successful">
        <img className="Booking-successful__image" src="https://media.giphy.com/media/l0IygWpszunxnkMAo/giphy.gif" alt="Congratulations"/>
        <h1 className="Booking-successful__heading">Booking Successful</h1>
        <p>Thank you for making a booking at {this.hotel.name}</p>
        <p>We look forward to seeing you on {this.checkInDate.toDateString()}</p>
        <p>Want to <Link to="/">make another booking?</Link></p>
      </div>
    )
  }
}

export default BookingSuccessful;

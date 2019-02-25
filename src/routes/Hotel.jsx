import React, { Component } from 'react';
import history from '../history';
import {Link} from "react-router-dom";

import store from '../state/store.js'
import '../styles/Hotel.css';

class Hotel extends Component {
  constructor (props) {
    super(props)
    this.renderBookBlock = this.renderBookBlock.bind(this)
    this.hotelId = this.props.match.params.hotelId
    this.hotel = this.props.hotels.filter((hotel) => hotel.id === this.hotelId)[0]
    this.checkinDate = null
    this.checkoutDate = null
    this.book = this.book.bind(this)

    if (this.hotel === undefined) { history.push('/error')}
  }

  book (evt) {
    evt.preventDefault()
    const checkInDate = this.checkinDate.value
    const checkOutDate = this.checkoutDate.value

    // TODO: Add error functionality
    // TODO: Add Date checking (end date after start date etc)
    if (checkInDate !== "" && checkOutDate !== "") {
      const data = {
        checkInDate,
        checkOutDate
      }

      fetch('http://5c505db9ee97f600140480dd.mockapi.io/booking', {
        method: 'POST',
        headers: {
              "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((json) => {
        // TODO: What if hotel is fully booked
        if (json.success) {
          history.push({
            pathname: `/booked/${this.hotelId}`,
            search: `?checkin=${checkInDate}&checkout=${checkOutDate}`
          })
        }
      })
      .catch((err) => {
        // TODO: Add better error handling
        console.log(err)
      })
    }
  }

  renderBookBlock () {
    let userState = store.getState().user
    if (userState.status === 'logged-in') {
      return (
        <div className="Hotel__book-form--wrapper">
          <form action="POST" className="Hotel__book-form">
            <div className="Hotel__book-form__input-wrapper">
              <label htmlFor="check-in">Check in</label>
              <input className="Hotel__book-form__input" id="check-in" type="date" ref={(c) => this.checkinDate = c} placeholder="dd/mm/yyyy" />
            </div>
            <div className="Hotel__book-form__input-wrapper">
              <label htmlFor="check-out">Check out</label>
              <input className="Hotel__book-form__input" id="check-out" type="date" ref={(c) => this.checkoutDate = c} placeholder="dd/mm/yyyy"/>
            </div>
            <button className="button" type="submit" onClick={this.book}>Book Now!</button>
          </form>
        </div>
      )
    }

  const url= `/login?redirect-to=${this.props.match.url}`
    return (
      <Link to={url}>
        Login to make a booking
      </Link>
    )
  }

  render () {
    if (this.hotel) {
      return (
        <div className="Hotel">
          <div className="Hotel__image-wrapper">
            <img className="Hotel__image" src={this.hotel.image} alt={this.hotel.name} />
          </div>
          <h1 className="Hotel__title">{this.hotel.name}</h1>
          <p className="Hotel__description">{this.hotel.description}</p>
          <div className="Hotel__reviews-wrapper">
            <p className="Hotel__review"><span>Positive Reviews: </span> {this.hotel.positiveReviews}</p>
            <p className="Hotel__review"><span>Negative Reviews: </span> {this.hotel.negativeReviews}</p>
          </div>
          {this.renderBookBlock()}
          <Link to="/" className="Hotel__back-link">&larr; Back</Link>
        </div>
      )
    }
    return null
  }
}

export default Hotel;

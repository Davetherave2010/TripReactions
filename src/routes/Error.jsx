import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Error extends Component {
  render() {
    return (
      <div>
        <h1>Error</h1>
        <p>Something went wrong</p>
        <Link to="/">Return to the homepage?</Link>
      </div>
    )
  }
}

export default Error;

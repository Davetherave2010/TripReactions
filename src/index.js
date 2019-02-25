import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Switch } from "react-router-dom";
import './styles/index.css';
import Home from './routes/Home.jsx';
import Hotel from './routes/Hotel.jsx';
import Login from './routes/Login.jsx';
import BookingSuccessful from './routes/BookingSuccessful.jsx';
import Error from './routes/Error.jsx';
import history from './history';
import { Provider } from 'react-redux'
import store from './state/store.js'
import * as serviceWorker from './serviceWorker';

async function init () {
  const hotels = await fetch('https://5c505db9ee97f600140480dd.mockapi.io/hotels')
  const hotelsJson = await hotels.json()

    ReactDOM.render(
      <Provider store={store}>
        <App hotels={hotelsJson} />
      </Provider>,
      document.getElementById('root'));
}

init()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



const App = (props) => {
  return (
    <Router history={history}>
     <Switch>
       <Route exact path="/" render={() => (<Home {...props}/>)}/>
       <Redirect exact from="/hotel" to="/" />
       <Route path="/hotel/:hotelId" render={({match}) => (<Hotel match={match} {...props} />)} />
       <Route exact path="/booked/:hotelId" render={({match}) => (<BookingSuccessful match={match} {...props}/>)}/>
       <Route exact path="/login" render={() => (<Login {...props}/>)}/>
       <Route render={() => (<Error {...props} />)} />
     </Switch>
   </Router>
  )
};

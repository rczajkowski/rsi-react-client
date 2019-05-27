import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Films from './Films';
import Reservation from './Reservation';
import Reservations from './Reservations';
import EditReservation from './EditReservation';

class App extends Component {
  render() {
    return (
        <Fragment>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/reservations/">Rezerwacje</Link>
							</li>
						</ul>
					</nav>

					<Route path="/" exact component={Films} />
					<Route path="/film/:id" component={Reservation} />
					<Route path="/reservation/edit/:id" component={EditReservation} />
					<Route path="/reservations" exact component={Reservations} />
				</div>
			</Router>
        </Fragment>
    );
  }
}

function Home() {
	return <h2>Home</h2>;
}

export const getFormattedDate = (date) => {
	const dd = new Date(date);
	return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate() + " " + dd.getHours() + ":" + dd.getMinutes();
}

export default App;

import React from 'react';
import axios from 'axios/index';
import ReservationItem from './ReservationItem';

export default class Reservations extends React.Component {

	constructor(props) {
		super(props);
		this.state = { reservations: [] }
	}

	componentDidMount(){
		axios.get("http://localhost:8080/films/reservation/user").then(response => {
			this.setState({ reservations: response.data });
		}).catch((error) => { console.log('error', error)});
	}

	render(){
		return(
			<ul>
				{this.state.reservations.map(r => (<ReservationItem key={r.id} reservation={r} />))}
			</ul>
		)
	}
}
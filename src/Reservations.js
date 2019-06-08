import React from 'react';
import axios from 'axios/index';
import ReservationItem from './ReservationItem';

export default class Reservations extends React.Component {

	constructor(props) {
		super(props);
		this.state = { reservations: [] }
	}

	componentDidMount(){
		axios.get("http://localhost:8080/reservations").then(response => {
			console.log('ressss', response.data._embedded.reservationResourceList);
			this.setState({ reservations: response.data._embedded.reservationResourceList });
		}).catch((error) => { console.log('error', error)});
	}

	render(){
		return(
			<ul>
				{this.state.reservations.map(resource => {
					const links = resource._links;
					const data = resource.reservation;
					return (<ReservationItem key={data.id} reservation={data} links={links} />)
				})}
			</ul>
		)
	}
}


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios/index';
import { getFormattedDate } from './App';

const ReservationItem = ({ reservation }) => {
	const [textInfo, setInfo] = useState('');
	return (<li>
		<a href={`http://localhost:8080/films/pdf/${reservation.id}`} target="_blank">
			{`${getFormattedDate(reservation.date)} - ${reservation.film.name} - ${reservation.film.director} - ${reservation.seatsNo.toString()}`}
		</a>
		<Link to={{
			pathname: `/reservation/edit/${reservation.id}`,
			state: {reservation}
		}}>
			edytuj
		</Link>
		<button onClick={() => {
			axios.delete(`http://localhost:8080/films/resignation?tokenResignation=${reservation.resignationToken}`).then(response => {
				setInfo(response.data);
			}).catch((error) => { setInfo(error.message)})
		}}>
			zrezeygnuj z rezerwacji
		</button>
		<div>
			{textInfo}
		</div>
	</li>);
};

export default ReservationItem;
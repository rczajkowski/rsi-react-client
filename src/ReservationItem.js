

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios/index';
import { getFormattedDate } from './App';

const ReservationItem = ({ reservation, links }) => {
	const [textInfo, setInfo] = useState('');
	return (<li>
		<a href={links.downloadPdf.href} target="_blank">
			{`${getFormattedDate(reservation.date)} - ${reservation.film.name} - ${reservation.film.director} - ${reservation.seatsNo.toString()}`}
		</a>
		<Link to={{
			pathname: `/reservation/edit/${reservation.id}`,
			state: {reservation}
		}}>
			edytuj
		</Link>
		<button onClick={() => {
			axios.delete(links.resignation.href).then(response => {
				const resignation = response.data;
				setInfo(`Zrezygnowałeś z rezerwacji miejsc ${resignation.seatsNo.toString()} na film ${resignation.film.name} o godzinie ${resignation.date}`);
			}).catch((error) => { setInfo(error.response.data.message)})
		}}>
			zrezeygnuj z rezerwacji
		</button>
		<div>
			{textInfo}
		</div>
	</li>);
};

export default ReservationItem;
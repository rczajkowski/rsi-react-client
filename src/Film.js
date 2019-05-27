
import React from 'react';
import { Link } from 'react-router-dom';

const Film = ({ film }) => (
	<li>
		<Link to={{
			pathname: `/film/${film.id}`,
			state: { film }
		}}>
			{`${film.name} - ${film.director}`}
		</Link>
	</li>
);

export default Film;
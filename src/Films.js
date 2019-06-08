
import React from 'react';
import Film from './Film';
import axios from 'axios';

export default class Films extends React.Component {

	constructor(props) {
		super(props);
		this.state = { films: [] }
	}

	componentDidMount(){
		axios.get("http://localhost:8080/films").then(response => {
			console.log('data',response);
			this.setState({ films: response.data._embedded.filmResourceList });
		}).catch((error) => { console.log('error', error)});
	}

	render(){
		return(
			<ul>
				{this.state.films.map(resource => resource.film).map(f => (<Film key={f.id} film={f} />))}
			</ul>
		)
	}
}
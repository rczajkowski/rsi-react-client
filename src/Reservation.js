import React from 'react';
import axios from 'axios/index';
import { getFormattedDate } from './App';

export default class Reservation extends React.Component {

	constructor(props) {
		super(props);
		this.state = { value: props.location.state.film.schedule[0], seats: [1], name: '', errorMessage: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit = (e) => {
		console.log('ttttt', this.state.value)
		e.preventDefault();
		axios.post(`http://localhost:8080/reservations`, { filmId: this.props.location.state.film.id, date: this.state.value, seats: this.state.seats }).then(response => {
			this.props.history.push("/reservations")
		}).catch((error) => {
			this.setState({ errorMessage: error.response.data.message })
		});

	};

	handleChangeMultiple = (e) => {
		console.log('e.',e.target.options)
		let options = e.target.options;
		let selectedOptions = [];

		for(let i = 0; i < options.length; i++) {
			if( options[i].selected ) {
				selectedOptions.push(options[i].value);
			}
		}

		this.setState({seats: selectedOptions});
	}

	getOptions = () => {
		const array = [];
		for (let i=1; i < 100; i += 1){
			array.push(<option key={i} value={i}>{i}</option>)
		}
		return array;
	};


	renderOption = (data) => (<option key={data} value={data}>{new Date(data)}</option>);

	formatDatate = (date) => {

	}

	render(){
		 const { location: { state: { film, edit } } } = this.props;
		 console.log('props', this.state);
		 return(
		 	<div>
				<h1>O filmie</h1>
				<h2>Reżyser</h2>
				{film.director}
				<h2> Obsada:</h2>
				<ul>
					{film.cast.map(c => <li>{c}</li>)}
				</ul>
				<form onSubmit ={this.handleSubmit}>
					<div>
						<label>
							wybierz datę
							<select value={this.state.value} onChange={this.handleChange}>
								{film.schedule.map(d => (<option key={d} value={d}>{getFormattedDate(d)}</option>))}
							</select>
						</label>
					</div>

					<div>
						<label>
							Wpisz miejsca
							<select style={{ minWidth: '100px' }} multiple value={this.state.seats} onChange={this.handleChangeMultiple}>
								{this.getOptions()}
							</select>
							Wybrane miejsca:
							{this.state.seats.map(v => `${v}, `)}
						</label>
					</div>

					<div>
						<input type="submit" value="Zarezerwuj" />
					</div>
				</form>
				{this.state.errorMessage}
			</div>
		 )
	}
}
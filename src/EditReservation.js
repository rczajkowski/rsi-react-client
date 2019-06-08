import React from 'react';
import axios from 'axios/index';

export default class EditReservation extends React.Component {

	constructor(props) {
		super(props);
		this.state = { value: null, seats: [1], name: '', errorMessage: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('sss', this.state.seats);
		axios.put(`http://localhost:8080/reservations/${this.props.location.state.reservation.id}`, { seats: this.state.seats }).then(response => {
			this.props.history.goBack();
		}).catch((error) => { this.setState({ errorMessage: error.response.data.message })});

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

	render(){
		const { location: { state: { reservation } } } = this.props;
		console.log('props', this.props);
		const dd = new Date(reservation.date);
		const date = dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate() + " " + dd.getHours() + ":" + dd.getMinutes();
		return(
			<div>
				<h1>O filmie</h1>
				<h2>Reżyser</h2>
				{reservation.film.director}
				<h2> Obsada:</h2>
				<ul>
					{reservation.film.cast.map(c => <li>{c}</li>)}
				</ul>
				<h2>Data rezerwacji {date} </h2>
				<h2>Zarezerwowane miejsca: {reservation.seatsNo.toString()}</h2>
				<form onSubmit ={this.handleSubmit}>
					<div>
						<label>
							Wybierz miejsca
							<select style={{ minWidth: '100px' }} multiple value={this.state.seats} onChange={this.handleChangeMultiple}>
								{this.getOptions()}
							</select>
							Wybrane miejsca:
							{this.state.seats.map(v => `${v}, `)}
						</label>
					</div>

					<div>
						<input type="submit" value="Aktualizuj" />
					</div>
				</form>
				{this.state.errorMessage}
			</div>
		)
	}
}
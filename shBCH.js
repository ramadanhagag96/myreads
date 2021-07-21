import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShCh extends Component {
	state = {
		isUpdating: false
	};

	componentWillReceiveProps() {
		this.setState({
			isUpdating: false
		});
	}

	shelfHandler = shelf=> {
		this.props.onChangeShelf(this.props.book, shelf);
		this.setState({
			isUpdating: true
		});
	};

	render() {
		return (
			<div className={this.state.isUpdating ? 'book-shelf-changer loading' : 'book-shelf-changer'}>
				<select value={this.props.book.shelf} onChange={shelf=> this.shelfHandler(shelf)}>
					<option value="move" disabled>
						Move to...
					</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				</select>
				{this.state.isUpdating && <div className="loader-two" />}
			</div>
		);
	}
}

BookShelfChanger.propTypes = {
	book: PropTypes.object.isRequired,
	onChangeShelf: PropTypes.func.isRequired
};

export default BookShfCh;
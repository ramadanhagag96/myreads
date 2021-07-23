
import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './shBCH';
import './App.css'


export default class srch extends React.Component {
    state = {
        query: '',
        Books: []
    };

    Cat = (books) => {
        for (let book of books) {
            book.shelf = 'none'
        }
        for (let book of books) {
            for (let oldbook of this.props.addedBooks) {
                if (oldbook.id === book.id) {
                    book.shelf = oldbook.shelf
                }
            }
        }
        return books
    };

    /*Used for searching and storing the value of search result returned*/
    searchb = (event) => {
        let q = event.target.value;
        this.setState({
            query: q
        });
        BooksAPI.search(q).then(book => {
            if (book === undefined || (book.error)) {
                this.setState({
                    Books: []
                })
            }
            else {
                book = this.Cat(book)
                this.setState({
                    Books: book
                })
            }
        })
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search "
                               value={this.state.query}
                               onChange={this.searchb}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.Books && this.state.Books.map(book =>
                            <li key={book.id}>
                                <shBCH shelfHandler={this.props.shelfHandler} book={book}/>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }

}
import React from 'react'

   import { Route } from 'react-router-dom'
import * as BooksAPI from "./BooksAPI"
import ListBooks from "./shB"
import SearchBooks from "./SearchB"
import SearchBooks from "./shBCH"
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
      books : [] ,
       showSearchPage: false
    
  }
  state = {
		books: [],
      isLoaded: false
	};

	componentDidMount() {
		BooksAPI.getAll().then((res=> {
			this.setState({ 
                          books: res,
				         isLoaded: true
                          });
		}),
	
 /*shelves = [
    {key:'currentlyReading' , name: 'Currently Reading'},
    {key:'wantToRead' , name: 'Want to Read'},
    {key:'read' , name: 'Read'},
  ]*/
 shelfHandler = (book, shelf) => {
		BooksAPI.update(book, shelf)
			.then(() => {
				book.shelf = shelf;
				this.setState((currentState) => ({
					books: currentState.books.filter((c) => c.id !== book.id).concat(book),
				}));
			})
			.then(() => (shelf !== 'none' ? alert(`${book.authors} done`) : null))
			.catch(() => alert('not add'));
	},

  render() ,{
    return (
      <div className="app">
        
        <Route
					exact
					path="/"
					render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    key="Currently Reading"
                    shelfName="Currently Reading"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'currentlyReading')}
                    onChangeShelf={this.shelfHandler}
                  />
                  <BookShelf
                    key="Want to Read"
                    shelfName="Want to Read"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'wantToRead')}
                    onChangeShelf={this.shelfHandler}
                  />
                  <BookShelf
                    key="Read"
                    shelfName="Read"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'read')}
                    onChangeShelf={this.shelfHandler}
                  />
                </div>
              </div>
             
             <Route path='/search' render={() => (
                    <srch addedBooks={this.state.books} shelfHandler={this.shelfHandler}/> )}/>
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        
            
         
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        
      </div>
    )
  }
}
}}

export default BooksApp

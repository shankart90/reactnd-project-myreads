import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'


class SearchBooks extends Component {
  state = {
    query: '',
    showingBooks: []
  }

  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
  }

  updateQuery = (query) => {
    if(query){
      BooksAPI.search(query, 20).then((results) =>{
          //console.log(results.error)
          if(results){
            this.setState({ query })
             //console.log(results)
            this.setState({ showingBooks : results[1] })
          }
      })
    }
  }

  render(){
    const { onUpdateShelf } = this.props
    const { query, showingBooks } = this.state

    return(
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className='close-search'>Close</Link>
            <div className="search-books-input-wrapper">
              <input
                    type="text"
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {showingBooks.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}/>
                          <div className="book-shelf-changer">
                            <select defaultValue={book.shelf} onChange={(event) => onUpdateShelf(book, event)}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks;

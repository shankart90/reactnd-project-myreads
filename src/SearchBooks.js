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
          console.log(results.error)
          if(results){
            this.setState({ query })
            console.log(results)
            // this.setState({ showingBooks : results[1] })
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

            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks;

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Books from './Books'

class SearchBooks extends Component {
  state = {
    query: ''
  }

  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired,
    onSearchBooks: PropTypes.func.isRequired
  }

  updateQuery = (query) => {
    if(query){
      this.setState({query})
      this.props.onSearchBooks(query)
    }else{
      this.setState({query:''})
    }
  }

  render(){
    const {onUpdateShelf, books} = this.props
    const {query} = this.state
    let showingBooks = books

    if(!query){
      showingBooks = []
    }

    return(
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className='close-search'>Close</Link>
            <div className="search-books-input-wrapper">
              <input
                    type="text"
                    placeholder="Search books"
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <Books
                books={showingBooks}
                onUpdateShelf={onUpdateShelf}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks;

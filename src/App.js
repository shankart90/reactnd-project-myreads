import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      searchResults: []
    }
    this.updateBookShelf = this.updateBookShelf.bind(this);
    this.SearchBooks = this.SearchBooks.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBookShelf(book, event) {
    const shelf = event.target.value;
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          searchResults: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
    }
  }

  SearchBooks(query){
    BooksAPI.search(query, 20).then((showingBooks) =>{
        if(showingBooks.error === undefined){
          this.setState(state => ({
             searchResults: state.books.concat(showingBooks)
          }))
        }
    })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateShelf={this.updateBookShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.searchResults}
            onUpdateShelf={this.updateBookShelf}
            onSearchBooks={this.SearchBooks}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp

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
      books: []
    }
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBookShelf(book, event) {
    const shelf = event.target.value;
    BooksAPI.update(book, shelf).then(() => {
        BooksAPI.getAll().then(books => {
          this.setState({books});
        });
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
            books={this.state.books}
            onUpdateShelf={this.updateBookShelf}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp

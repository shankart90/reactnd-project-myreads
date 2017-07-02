import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Books from './Books'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render(){
     const {books, onUpdateShelf} = this.props

     const wantToRead = books.filter(book => book.shelf === 'wantToRead')
     const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
     const read = books.filter(book => book.shelf === 'read')

     return(
       <div className="app">
         <div className="list-books">
           <div className="list-books-title">
             <h1>MyReads</h1>
           </div>
           <div className="list-books-content">
             <div>
                <div className="bookshelf-books">
                   <h2 className="bookshelf-title">Currently Reading</h2>
                   {currentlyReading.length &&
                       <Books
                             books={currentlyReading}
                             onUpdateShelf={onUpdateShelf}
                        />
                    }
                </div>
                <div className="bookshelf-books">
                   <h2 className="bookshelf-title">Want to Read</h2>
                   {wantToRead.length &&
                       <Books
                             books={wantToRead}
                             onUpdateShelf={onUpdateShelf}
                        />
                    }
                </div>
                <div className="bookshelf-books">
                   <h2 className="bookshelf-title">Read</h2>
                   {read.length &&
                       <Books
                             books={read}
                             onUpdateShelf={onUpdateShelf}
                        />
                    }
                </div>
             </div>
           </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
         </div>
       </div>
     )}
}
export default ListBooks;

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BooksGrid extends Component{
  static propTypes = {
    showingBooks: PropTypes.array.isRequired,
    currentRead: PropTypes.string.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render(){
    const {showingBooks, currentRead, onUpdateShelf} = this.props
    return(
      <div className="bookshelf-books">
         <ol className="books-grid">
           {showingBooks.filter(function(books) {
                 return books.shelf === currentRead
             }).map((book) => (
             <li key={book.id}>
               <div className="book">
                 <div className="book-top">
                   <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}/>
                     <div className="book-shelf-changer">
                       <select value={book.shelf} onChange={(e) => onUpdateShelf(book, e)}>
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

    )
  }
}

export default BooksGrid;

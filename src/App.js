import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import BookmarksContext from './BookmarksContext';

class App extends Component {
  
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(
      bookmark => bookmark.id !== bookmarkId
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }

  updateBookmark = () => {};

  componentDidMount() {
    console.log('top of componentdidmount')
    console.log(`Able to access the config TEST being ${config.TEST}`)
    console.log(`Able to access config API_KEY being ${config.API_KEY}`)
    console.log(`Access test2 value ${config.TEST2}`)
    console.log(`Will fetch ${config.API_ENDPOINT}/api/bookmarks`)
    console.log(`Will attempt to use an Authorization header with 'Bearer ${config.API_KEY}'.`)
    fetch(config.API_ENDPOINT+`/api/bookmarks`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        console.log('fetch was attempted')
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark,
    }

    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route
              path='/add-bookmark'
              component={AddBookmark}
            />
            <Route
              exact
              path='/'
              component={BookmarkList}
            />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;

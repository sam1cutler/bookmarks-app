import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkItem from './BookmarkItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BookmarkItem 
      title='blank'
      url='http://blank'
    />
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Entries from './Entries';

it ('renders app without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <Entries/>
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
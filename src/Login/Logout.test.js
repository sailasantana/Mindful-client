import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Logout from './Logout';

it ('renders app without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <Logout/>
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

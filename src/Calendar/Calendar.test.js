import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Calendar from './Calendar';

it ('renders app without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <Calendar/>
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
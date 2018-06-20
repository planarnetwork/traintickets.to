import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IndexPage} from './IndexPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IndexPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

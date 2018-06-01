import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import 'react-dates/initialize';
import {IndexPage} from './Page/Index/IndexPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <IndexPage />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

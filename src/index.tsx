import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import {unregister} from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {App} from "./component/App";

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root') as HTMLElement);

unregister();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import {unregister} from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {Layout} from "./component/Layout";

ReactDOM.render((
  <BrowserRouter>
    <Layout/>
  </BrowserRouter>
), document.getElementById('root') as HTMLElement);

unregister();

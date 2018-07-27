import * as React from 'react';
import './Nav.css';
import {Link} from "react-router-dom";

export function Nav() {
  return (
    <nav className="d-none d-md-block">
      <ul className="nav">
        <li className="nav--item">
          <Link className="nav--link" to="/about">About</Link>
        </li>
        <li className="nav--item">
          <Link className="nav--link" to="/faq">FAQ</Link>
        </li>
      </ul>
    </nav>
  )
}


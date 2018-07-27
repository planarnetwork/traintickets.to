import * as React from 'react';
import './Nav.css';
import {NavLink} from "react-router-dom";

export function Nav() {
  return (
    <nav className="d-none d-md-block">
      <ul className="nav">
        <li className="nav--item">
          <NavLink className="nav--link" to="/about">About</NavLink>
        </li>
        <li className="nav--item">
          <NavLink className="nav--link" to="/faq">FAQ</NavLink>
        </li>
      </ul>
    </nav>
  )
}


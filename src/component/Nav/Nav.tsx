import * as React from 'react';
import './Nav.css';
import {NavLink} from "react-router-dom";

export function Nav() {
  return (
    <nav className="nav">
      <ul className="nav--list">
        <li className="nav--item d-block d-md-none">
          <NavLink className="nav--link" to="/">Home</NavLink>
        </li>
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


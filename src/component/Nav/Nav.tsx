import * as React from 'react';
import './Nav.css';

export function Nav() {
  return (
    <nav className="d-block d-md-none">
      <ul className="nav">
        <li className="nav--item">
          <a className="nav--link nav--link__search" href="#top">
            <span className="sr-only">Jump to search</span>
          </a>
        </li>
        <li className="nav--item">
          <a className="nav--link nav--link__out" href="#outward">
            <span className="sr-only">Jump to outward results</span>
          </a>
        </li>
        <li className="nav--item">
          <a className="nav--link nav--link__in" href="#inward">
            <span className="sr-only">Jump to inward results</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}


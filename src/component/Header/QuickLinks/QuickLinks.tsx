import * as React from 'react';
import './QuickLinks.css';

export function QuickLinks() {
  return (
    <nav className="d-block d-md-none">
      <ul className="quicklinks">
        <li className="quicklinks--item">
          <a className="quicklinks--link quicklinks--link__search" href="#top">
            <span className="sr-only">Jump to search</span>
          </a>
        </li>
        <li className="quicklinks--item">
          <a className="quicklinks--link quicklinks--link__out" href="#outward">
            <span className="sr-only">Jump to outward results</span>
          </a>
        </li>
        <li className="quicklinks--item">
          <a className="quicklinks--link quicklinks--link__in" href="#inward">
            <span className="sr-only">Jump to inward results</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}


import * as React from 'react';
import autobind from "autobind-decorator";
import {NavLink} from "react-router-dom";
import './Nav.css';

@autobind
export class Nav extends React.Component<NavProps> {

  public render() {
    const { isExpanded } = this.props;
    const navClasses = isExpanded ? 'nav is-expanded' : 'nav';

    return (
      <nav className={navClasses}>
        <ul className="nav--list">
          <li className="nav--item d-block d-md-none">
            <NavLink className="nav--link" to="/">Home</NavLink>
          </li>
          <li className="nav--item">
            <NavLink className="nav--link" to="/wallet">Wallet</NavLink>
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

}

export interface NavProps {
  isExpanded: boolean;
}


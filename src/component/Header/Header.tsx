import * as React from 'react';
import {Nav} from "./../Nav/Nav";
import {QuickLinks} from "./../QuickLinks/QuickLinks";
import './Header.css';
import {Link} from "react-router-dom";

export function Header() {
  return (
    <header className="header clearfix">
      <h1 className="header--logo">
        <Link className="header--link" to="/">train<span className='color-highlight'>tickets</span>.to</Link>
      </h1>
      <Nav />
      <QuickLinks />
    </header>
  )
}
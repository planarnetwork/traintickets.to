import * as React from 'react';
import './Header.css';

export function Header() {
  return (
    <header className="header bold clearfix">
      <h1 className="pull-left">train<span className='color-highlight'>tickets</span>.to</h1>
      <h2 className="pull-right">the <span className="color-highlight">cheapest</span> fare finder</h2>
    </header>
  )
}
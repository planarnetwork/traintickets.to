import * as React from 'react';
import './Header.css';

export function Header() {
  return (
    <header className="header clearfix">
      <h1 className="header--logo">train<span className='color-highlight'>tickets</span>.to</h1>
    </header>
  )
}
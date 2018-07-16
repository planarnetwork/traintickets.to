import * as React from 'react';
import './Loader.css';

export function Loader() {
  return (
    <div className="loader">
        <span className="sr-only">Please wait...loading</span>
        <div className="loader-cube" />
        <div className="loader-cube loader-cube2" />
        <div className="loader-cube loader-cube3" />
        <div className="loader-cube loader-cube4" />
    </div>
  )
}
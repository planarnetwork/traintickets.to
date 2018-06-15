import * as React from 'react';
import {Price} from "./../Price/Price";
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col-10">
          <p className="footer--copyright">
            &copy; traintickets.to
          </p>
        </div>
        <div className="col text-right">
          <div className="footer--total">
            <span className="footer--price">
              Total <Price value={20100} />
            </span>
            <p className="footer--pax">all passengers</p>
          </div>
        </div>
      </div>
      <div className="footer-pop">
        <p className="footer-pop--header">
          Ticket selection amended
        </p>
        <p className="footer-pop--message">
          The total of your selected tickets for <span className="bold">ALL</span> passengers is shown below. 
        </p>
        <button type="button" className="footer-pop--close">
          x<span className="sr-only">close</span>
        </button>
      </div>
    </footer>
  )
}
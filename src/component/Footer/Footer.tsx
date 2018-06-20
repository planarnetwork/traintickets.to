import * as React from 'react';
import {Price} from "./../Price/Price";
import './Footer.css';
import autobind from "autobind-decorator";

@autobind
export class Footer extends React.Component<FooterProps, FooterState> {

  public state = {
    open: true
  };

  public onClose() {
    this.setState({ open: false });
  }

  public render() {
    return (
      <footer className="footer">
        <div className="footer-bg max">
          <div className="row">
            <div className="col-10">
              <p className="footer--copyright">
                &copy; traintickets.to
              </p>
            </div>
            <div className="col text-right">
              <div className="footer--total">
                <span className="footer--price">
                  Total <Price value={this.props.price}/>
                </span>
                <p className="footer--pax">all passengers</p>
              </div>
            </div>
          </div>
          { this.state.open && this.renderPopup() }
        </div>
      </footer>
    );
  }

  public renderPopup() {
    return (
      <div className="footer-pop">
        <p className="footer-pop--header">
          Ticket selection amended
        </p>
        <p className="footer-pop--message">
          The total of your selected tickets for <span className="bold">ALL</span> passengers is shown below.
        </p>
        <button type="button" className="footer-pop--close" onClick={this.onClose}>
          <span className="sr-only">close</span>
        </button>
      </div>
    )
  }
}

export interface FooterProps {
  price: number;
}

interface FooterState {
  open: boolean;
}
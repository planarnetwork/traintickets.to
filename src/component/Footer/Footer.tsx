import * as React from 'react';
import {Price} from "./../Price/Price";
import './Footer.css';
import './Modal.css';
import autobind from "autobind-decorator";

@autobind
export class Footer extends React.Component<FooterProps, FooterState> {

  public state = {
    popupOpen: true,
    modalOpen: false
  };

  public closePopup() {
    this.setState({ popupOpen: false });
  }

  public openModal() {
    this.setState({ modalOpen: true });
  }

  public closeModal() {
    this.setState({ modalOpen: false });
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
              <button onClick={this.openModal}>Open modal</button>
              <div className="footer--total">
                <span className="footer--price">
                  Total <Price value={this.props.price}/>
                </span>
                <p className="footer--pax">all passengers</p>
              </div>
            </div>
          </div>
          { this.state.popupOpen && this.renderPopup() }
        </div>
        <div className={this.state.modalOpen ? 'modal--bg is-active' : 'modal--bg'}>
          {this.state.modalOpen && this.renderModal() }
        </div>
      </footer>
    );
  }

  public renderPopup() {
    return (
      <div className="footer-pop">
        <p className="footer-pop--header">
          Total ticket price
        </p>
        <p className="footer-pop--message">
          The total of your selected tickets for <span className="bold">ALL</span> passengers is shown below.
        </p>
        <button type="button" className="footer-pop--close" onClick={this.closePopup}>
          <span className="sr-only">close</span>
        </button>
      </div>
    )
  }

  public renderModal() {
    return (
      <div aria-modal={true}>
        <div className="modal--content" role="dialog" aria-label="Ticket modal">
          <div className="modal--header">
            <button type="button" className="modal--btn__close" onClick={this.closeModal}>Close</button>
            <h4 className="modal--title">Title</h4>
          </div>
          <div className="modal--body">
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
            <p>This is some text for the body</p>
          </div>
          <div className="modal--footer">
            <button
              type="button"
              className="modal--btn__footer"
              onClick={this.closeModal}
            >
            Close
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export interface FooterProps {
  price: number;
}

interface FooterState {
  popupOpen: boolean;
  modalOpen: boolean;
}
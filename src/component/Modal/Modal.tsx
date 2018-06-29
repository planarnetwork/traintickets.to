import * as React from "react";
import autobind from "autobind-decorator";

@autobind
export class Modal extends React.Component<ModalProps> {

  public closeModal() {
    this.props.onClose();
  }

  public handleKeyDown(event: any): void {
    if (event.keyCode === 27) {
      this.closeModal();
      event.preventDefault();
    }
  }

  public render() {
    return this.props.open === false ? null : (
      <div
        className="modal--content"
        aria-modal={true}
        tabIndex={0}
        role="dialog"
        aria-label={this.props.title}
        onKeyDown={this.handleKeyDown}
        aria-labelledby="modal_title"
        auto-focus="true"
      >
        <div className="modal--header">
          <button type="button" className="modal--btn__close" onClick={this.closeModal}>
            <span className="sr-only">Close</span>
          </button>
          <h3 id="modal_title" className="modal--title">{this.props.title}</h3>
        </div>
        <div className="modal--body">
          { this.props.children }
        </div>
        <div className="modal--footer">
          <button
            type="button"
            className="modal--footer-btn"
            onClick={this.closeModal}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export interface ModalProps {
  title: string;
  onClose: () => any;
  open: boolean;
}


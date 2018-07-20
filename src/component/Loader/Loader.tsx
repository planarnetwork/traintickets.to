import * as React from 'react';
import './Loader.css';

export class Loader extends React.Component<LoaderProps> {

  public render() {
    return (
      <div className="loader-container">
        <div className="loader">
          <div className="loader-cube" />
          <div className="loader-cube loader-cube2" />
          <div className="loader-cube loader-cube3" />
          <div className="loader-cube loader-cube4" />
        </div>
        <p className="loader-text">{this.props.text}</p>
      </div>
    )
  }
}

interface LoaderProps {
  text: string;
}
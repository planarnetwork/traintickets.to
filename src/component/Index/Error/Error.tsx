import * as React from 'react';
import './Error.css';

export class Error extends React.Component<ErrorProps> {
  public render() {
    const { text } = this.props;

    return (
        <div className="error">
          <p className="error--title">{text}</p>
        </div>
      )
    }
}

interface ErrorProps {
  text: string;
}
import * as React from 'react';
import autobind from "autobind-decorator";
import './Burger.css';

@autobind
export class Burger extends React.Component<BurgerProps> {

  public render() {
    const { onToggle, isExpanded } = this.props;
    const hamburgerClasses = isExpanded ? 'burger is-active d-block d-md-none' : 'burger d-block d-md-none';

    return (
      <button
        onClick={onToggle}
        className={hamburgerClasses}
        aria-label="navigation menu">
        <span className="burger-bar" />
        <span className="burger-bar" />
        <span className="burger-bar" />
      </button>
    );
  }

}

export interface BurgerProps {
  onToggle: (value: any) => void;
  isExpanded: boolean;
}

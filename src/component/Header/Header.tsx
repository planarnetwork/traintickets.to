import * as React from 'react';
import {Nav} from "./Nav/Nav";
import {QuickLinks} from "./QuickLinks/QuickLinks";
import {Burger} from "./Burger/Burger";
import './Header.css';
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import autobind from "autobind-decorator";

@autobind
class HeaderComponent extends React.Component<HeaderProps, HeaderState> {

  public state = {
    isExpanded: false
  };

  public onToggle() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  public render() {
    return (
      <header className="header clearfix">
        <Burger onToggle={this.onToggle} isExpanded={this.state.isExpanded}/>
        <h1 className="header--logo">
          <Link className="header--link" to="/">train<span className='color-highlight'>tickets</span>.to</Link>
        </h1>
        <Nav isExpanded={this.state.isExpanded}/>
        { this.props.location.pathname === "/" && <QuickLinks /> }
      </header>
    )
  };
}

export const Header = withRouter((props: HeaderProps) => <HeaderComponent {...props}/>);

interface HeaderProps {
  location: {
    pathname: string;
  };
}

interface HeaderState {
  isExpanded: boolean;
}
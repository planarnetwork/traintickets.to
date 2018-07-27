import * as React from 'react';
import {Nav} from "./../Nav/Nav";
import {QuickLinks} from "./../QuickLinks/QuickLinks";
import {Burger} from "./../Burger/Burger";
import './Header.css';
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';

class HeaderComponent extends React.Component<HeaderProps> {
  public render() {
    return (
      <header className="header clearfix">
        <Burger />
        <h1 className="header--logo">
          <Link className="header--link" to="/">train<span className='color-highlight'>tickets</span>.to</Link>
        </h1>
        <Nav />
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

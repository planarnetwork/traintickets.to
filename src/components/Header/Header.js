import React, {Component} from "react";

import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header bold clearfix">
                <h1 className="pull-left">train<span className='color-highlight'>tickets</span>.to</h1>
                <h2 className="pull-right">the <span className="color-highlight">cheapest fare</span> getter</h2>
            </header>
        );
    }
}

export default Header;

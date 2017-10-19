import React, {Component} from "react";

import './Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer">&copy; traintickets.to 2017</footer>
        );
    }
}

export default Footer;

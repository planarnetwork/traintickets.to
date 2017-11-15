import React, {Component} from "react";

import './Loader.css';

class Loader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loader">
                <div className='demo'>
                    <div className='circle'>
                        <div className='inner'></div>
                    </div>
                    <div className='circle'>
                        <div className='inner'></div>
                    </div>
                    <div className='circle'>
                        <div className='inner'></div>
                    </div>
                    <div className='circle'>
                        <div className='inner'></div>
                    </div>
                    <div className='circle'>
                        <div className='inner'></div>
                    </div>
                </div>
                <a href='#' className="loader-link">traintickets.to</a>
            </div>
        );
    }
}

export default Loader;

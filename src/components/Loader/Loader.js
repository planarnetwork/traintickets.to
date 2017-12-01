import React, {Component} from "react";

import './Loader.css';

class Loader extends Component {

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
                <a href='http://traintickets.to' className="loader-link">traintickets.to</a>
            </div>
        );
    }
}

export default Loader;

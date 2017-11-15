import React, { Component } from 'react';

import './App.css';
import Header from  './Header/Header';
import Main from  './Main/MainContainer';
import Footer from  './Footer/Footer';
import Loader from  './Loader/LoaderContainer';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
                {this.props.loading ? (<Loader />) : []}
            </div>
        );
    }
}

export default App;

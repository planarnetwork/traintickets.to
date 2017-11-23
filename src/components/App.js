import React, { Component } from 'react';

import './App.css';
import Header from  './Header/Header';
import Main from  './Main/MainContainer';
import Footer from  './Footer/Footer';

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

            </div>
        );
    }
}

export default App;

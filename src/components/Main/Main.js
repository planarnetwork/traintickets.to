import React, {Component} from "react";

import './Main.css';
import Search from  '../Search/SearchContainer';
import Graph from  '../Graph/GraphContainer';
import Fares from  '../Fares/FaresContainer';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <Search />
                <Graph />
                <Fares />
            </main>
        );
    }
}

export default Main;

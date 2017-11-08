import React, {Component} from "react";

import './Main.css';
import Search from  '../Search/SearchContainer';
import Graph from  '../Graph/GraphContainer';
import Fares from  '../Fares/FaresContainer';

class Main extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        if(window.location.reload) {
            sessionStorage.clear();
            await this.props.rebaseData('searchResult', []);
        } else {
            return;
        }
    }

    render() {
        return (
            <main>
                <Search />
                {this.props.searchResult.response ? <Graph /> : undefined}
                {this.props.searchResult.response ? <Fares />  : undefined}
            </main>
        );
    }
}

export default Main;

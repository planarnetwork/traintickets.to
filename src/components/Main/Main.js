import React, {Component} from "react";
import './Main.css';
import Search from  '../Search/SearchContainer';
import Graph from  '../Graph/Graph';
import Fares from  '../Fares/FaresContainer';

class Main extends Component {

    render() {
        return (
            <main>
                <Search />
                {this.props.searchResult && this.props.searchResult.response ? <Graph journeys={this.props.searchResult.response} fares={this.props.searchResult.fares} /> : undefined}
                {this.props.searchResult && this.props.searchResult.response ? <Fares />  : undefined}
            </main>
        );
    }
}

export default Main;

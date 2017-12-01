import React, {Component} from "react";
import './Main.css';
import Search from  '../Search/SearchContainer';
import Graph from  '../Graph/Graph';
import Fares from  '../Fares/FaresContainer';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
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
                {this.props.searchResult.response ? <Graph journeys={this.props.searchResult.response} fares={this.props.searchResult.fares} /> : undefined}
                {this.props.searchResult.response ? <Fares />  : undefined}
            </main>
        );
    }
}

export default Main;

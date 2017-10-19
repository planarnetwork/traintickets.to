import React, {Component} from "react";
import {AutoComplete, DatePicker, TextField, SelectField, MenuItem, RadioButtonGroup, RadioButton, Checkbox} from 'material-ui';
import moment from 'moment'
import locations from '../../data/locations.json';
import railcards from '../../data/railcards.json';
import { search } from '../../services/http';

import './Search.css';
class Search extends Component {
    constructor(props) {
        super(props);
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear());
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxDate.getFullYear());
        maxDate.setHours(0, 0, 0, 0);

        this.state = {
            origin: '',
            destination: '',
            adults: 1,
            children: 0,
            minDate: minDate,
            maxDate: maxDate,
            autoOk: false,
            disableYearSelection: false,
            railcards: ['HMF'],
            filClass: 'standardClass',
            singles: false,
            returns: false,
            advance: false,
        };

        this.search = this.search.bind(this);
    }

    handleChangeMinDate = (event, date) => {
        this.setState({
            minDate: date,
        });
        if(this.state.origin.length && this.state.destination.length) {
            this.search()
        }
    };

    handleChangeMaxDate = (event, date) => {
        this.setState({
            maxDate: date,
        });
        if(this.state.origin.length && this.state.destination.length) {
            this.search()
        }
    };

    handleChange = (event, index, railcards) => {
        this.setState({railcards});
        if(this.state.origin.length && this.state.destination.length) {
            this.search()
        }
    };

    selectionRenderer = (railcard) => {
        let railcardFound = railcards.find((e) => {
            return e.code === this.state.railcards.toString();
        });
        let oneRailcard = railcardFound ? railcardFound.name : undefined;
        switch (railcard.length) {
            case 0:
                return '';
            case 1:
                return `${oneRailcard} selected`;
            default:
                return `${railcard.length} railcards selected`;
        }
    };

    async search() {
        let self = await this;
        let origin = this.state.origin;
        let destination = this.state.destination;
        let o = origin.split(' ');
        let d = destination.split(' ');
        o = o[o.length - 1];
        d = d[d.length - 1];
        let filClass = self.state.filClass;
        search(o, d, self.state.minDate, self.state.adults, self.state.children, self.state.maxDate, self.state.railcards.toString(), filClass, self.state.singles, self.state.returns, self.state.advance)
            .then((data) => {
                self.props.rebaseData('searchResult', data)
            })
            .catch((e) => {
                console.log('Something going wrong: ' + e)
            })
    }

    render() {
        const styles = {
            selectRoot: {
                width: 200,
                backgroundColor: '#ffffff',
                padding: '2px 5px 0px 5px',
                textAlign: 'center'
            },
            underlineStyle: {
                display: 'none',
            },
            calendar: {
                width: 150,
            },
            radioButton: {
                marginBottom: 16,
                fontSize: 14,
                width: 115,
            },
            checkbox: {
                marginBottom: 16,
                fontSize: 14,
                width: 115,
            },
            iconStyle: {
                fill: '#1066d3',
            }
        };
        const menuProps = {
            desktop: true,
            disableAutoFocus: true,
        };

        return (
            <section className="search">
                <div className="container clearfix">
                    <form>
                        <div className="search-col search-col-1 pull-left">
                            <div className="form-group">
                                <p className="form-label">ORIGIN</p>
                                <AutoComplete
                                    filter={AutoComplete.fuzzyFilter}
                                    dataSource={locations.map((key) => key.name + ' - ' + key.code)}
                                    maxSearchResults={10}
                                    className="form-label-input Indigo"
                                    menuProps={menuProps}
                                    onNewRequest={(data) => {
                                        this.setState({origin: data});
                                        if(this.state.destination.length) {
                                            this.search()
                                        }
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <p className="form-label">DESTINATION</p>
                                <AutoComplete
                                    filter={AutoComplete.fuzzyFilter}
                                    dataSource={locations.map((key) => key.name + ' - ' + key.code)}
                                    maxSearchResults={10}
                                    className="form-label-input"
                                    menuProps={menuProps}
                                    onNewRequest={(data) => {
                                        this.setState({destination: data});
                                        if(this.state.origin.length) {
                                            this.search()
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="search-col search-col-2 pull-left">
                            <div className="form-group">
                                <p className="form-label">Outward date</p>
                                <DatePicker
                                    onChange={this.handleChangeMinDate}
                                    autoOk={this.state.autoOk}
                                    defaultDate={this.state.maxDate}
                                    disableYearSelection={this.state.disableYearSelection}
                                    className="form-label-input form-calendar"
                                    formatDate={(date) => moment(date).format('ddd, ' + 'DD MMM YYYY')}
                                    style={styles.calendar}
                                    textFieldStyle={styles.calendar}
                                />
                            </div>

                            <div className="form-group">
                                <p className="form-label">Return date</p>
                                <DatePicker
                                    onChange={this.handleChangeMaxDate}
                                    autoOk={this.state.autoOk}
                                    defaultDate={this.state.minDate}
                                    disableYearSelection={this.state.disableYearSelection}
                                    className="form-label-input form-calendar"
                                    formatDate={(date) => moment(date).format('ddd, ' + 'DD MMM YYYY')}
                                    style={styles.calendar}
                                    textFieldStyle={styles.calendar}
                                />
                            </div>
                        </div>

                        <div className="search-col search-col-3 pull-left center">
                            <div className="form-group">
                                <p className="form-label">Adults</p>
                                <TextField
                                    type="number"
                                    defaultValue={this.state.adults}
                                    min="0"
                                    max="9"
                                    className="form-label-input form-number"
                                    onChange={(event) => {
                                        this.setState({adults: event.target.value});
                                        if(this.state.origin.length && this.state.destination.length) {
                                            this.search()
                                        }
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <p className="form-label">Children</p>
                                <TextField
                                    type="number"
                                    defaultValue={this.state.children}
                                    min="0"
                                    max="9"
                                    className="form-label-input form-number"
                                    onChange={(event) => {
                                        this.setState({children: event.target.value});
                                        if(this.state.origin.length && this.state.destination.length) {
                                            this.search()
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="search-col search-col-4 pull-left">
                            <div className="form-group">
                                <p className="form-label">Railcards</p>
                                <SelectField
                                    multiple={true}
                                    hintText="Select a railcards"
                                    value={this.state.railcards}
                                    onChange={this.handleChange}
                                    selectionRenderer={this.selectionRenderer}
                                    className="form-label-select"
                                    style={styles.selectRoot}
                                    underlineStyle={styles.underlineStyle}
                                    autoWidth={true}
                                >
                                    {railcards.map((key) => {
                                        return (
                                            <MenuItem
                                                key={key.code}
                                                insetChildren={true}
                                                checked={this.state.railcards.indexOf(key.code) > -1}
                                                value={key.code}
                                                primaryText={key.name}
                                            />
                                        )
                                    })}
                                </SelectField>
                            </div>
                        </div>

                        <div className="search-col search-col-5 pull-left">
                            <legend className="form-label">Filters</legend>
                            <RadioButtonGroup className="form-elements" name="shipSpeed" defaultSelected={this.state.filClass} onChange={(event) => {
                                this.setState({filClass: event.target.value});
                                if(this.state.origin.length && this.state.destination.length) {
                                    this.search()
                                }
                            }}>
                                <RadioButton
                                    value="standardClass"
                                    label="Standard"
                                    style={styles.radioButton}
                                    iconStyle={styles.iconStyle}
                                />
                                <RadioButton
                                    value="firstClass"
                                    label="First"
                                    style={styles.radioButton}
                                    iconStyle={styles.iconStyle}
                                />
                            </RadioButtonGroup>
                            <div className="form-elements">
                                <Checkbox
                                    key="1"
                                    label="Singles"
                                    defaultChecked={this.state.singles}
                                    style={styles.checkbox}
                                    iconStyle={styles.iconStyle}
                                    onCheck={() => {
                                        this.setState({singles: !this.state.singles});
                                        if(this.state.origin.length && this.state.destination.length) {
                                            this.search()
                                        }
                                    }}
                                />
                                <Checkbox
                                    key='2'
                                    label="Returns"
                                    defaultChecked={this.state.returns}
                                    style={styles.checkbox}
                                    iconStyle={styles.iconStyle}
                                    onCheck={() => {
                                        this.setState({returns: !this.state.returns});
                                        if(this.state.origin.length && this.state.destination.length) {
                                            this.search()
                                        }
                                    }}
                                />
                            </div>
                            <div className="form-elements">
                                <Checkbox
                                    key="1"
                                    label="Advance"
                                    defaultChecked={this.state.advance}
                                    style={styles.checkbox}
                                    iconStyle={styles.iconStyle}
                                    onCheck={() => {
                                        this.setState({advance: !this.state.advance});
                                        if(this.state.origin.length && this.state.destination.length) {
                                            this.search()
                                        }
                                    }}
                                />
                                <Checkbox
                                    key='2'
                                    label="Off Peak"
                                    style={styles.checkbox}
                                    iconStyle={styles.iconStyle}
                                />
                                <Checkbox
                                    key='3'
                                    label="Anytime"
                                    style={styles.checkbox}
                                    iconStyle={styles.iconStyle}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default Search;

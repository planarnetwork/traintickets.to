import React, {Component} from "react";
import {AutoComplete, DatePicker, TextField, Chip, RadioButtonGroup, RadioButton, Checkbox} from 'material-ui';
import moment from 'moment'
import locations from '../../data/locations.json';
import railcards from '../../data/railcards.json';
import { search } from '../../services/http';
import './Search.css';

const inputLocations = locations.map((key) => key.name + ' - ' + key.code);

class Search extends Component {

    constructor(props) {
        super(props);
        const outwardDate = new Date();
        const inwardDate = new Date();
        outwardDate.setFullYear(outwardDate.getFullYear());
        outwardDate.setHours(0, 0, 0, 0);
        inwardDate.setFullYear(inwardDate.getFullYear());
        inwardDate.setHours(24, 0, 0, 0);

        this.state = {
            origin: '',
            destination: '',
            adults: 2,
            children: 2,
            outwardDate: outwardDate,
            inwardDate: inwardDate,
            searchText: '',
            railcards: railcards.map((key) => key.name),
            chipData: [],
            chipCode: [],
            autoOk: true,
            disableYearSelection: false,
            filClass: 'standardClass',
            singles: true,
            returns: true,
            advance: false,
            offPeak: true,
            anytime: true,
        };

        this.search = this.search.bind(this);
        this.removeDate = this.removeDate.bind(this);
        this.handleChangeOutwardDate = this.handleChangeOutwardDate.bind(this);
        this.handleChangeInwardDate = this.handleChangeInwardDate.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.handleRailcardAdd = this.handleRailcardAdd.bind(this);
    }

    handleChangeOutwardDate(event, date) {
        this.setState({
            outwardDate: date,
        });

        this.search();
    };

    handleChangeInwardDate(event, date) {
        this.setState({
            inwardDate: date,
        });

        this.search()
    };

    handleUpdateInput(searchText) {
        let chipKey;
        for (let i = 0; i < this.state.chipCode.length; i++) {
            chipKey = i + 1;
        }
        if(this.state.chipData.map((chip) => chip.key).indexOf(chipKey) > -1) {
            chipKey = this.state.chipData.length + 1;
        } else {
            for (let i = 0; i < this.state.chipCode.length; i++) {
                chipKey = i + 1;
            }
        }
        this.setState({
            chipData: this.state.chipData.concat([{key: chipKey === undefined ? 0 : chipKey, label: searchText}]),
            searchText: '',
        });
    };

    handleRequestDelete(key) {
        this.chipData = this.state.chipData;
        this.chipCode = this.state.chipCode;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        const chipCodeToDelete = this.chipCode.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.chipCode.splice(chipCodeToDelete, 1);
        this.setState({
            chipData: this.chipData,
            chipCode: this.chipCode,
        });

        this.search();
    };

    handleRailcardAdd() {
        let chipsFound = railcards.find((e) => {
            let result;
            this.state.chipData.map((key) => key.label).forEach(function(item) {
                result = e.name === item;
            });
            return result;
        });
        let chips = chipsFound ? chipsFound.code : undefined;
        let chipKey;
        for (let i = 0; i < this.state.chipData.length; i++) {
            chipKey = i;
        }
        if(this.state.chipCode.map((chip) => chip.key).indexOf(chipKey) > -1) {
            chipKey = this.state.chipCode.length + 1;
        } else {
            for (let i = 0; i < this.state.chipData.length; i++) {
                chipKey = i;
            }
        }
        console.log(chipKey, chips);
        this.setState({chipCode: this.state.chipCode.concat([{key: chipKey, label: chips}])})
    };

    renderChip(data) {
        return (
            <Chip
                key={data.key}
                onRequestDelete={() => this.handleRequestDelete(data.key)}
                style={{
                    margin: '1px',
                    display: 'inline-block',
                }}
                labelStyle={{
                    fontSize: 9,
                }}
                deleteIconStyle={{
                    height: 16,
                    width: 16,
                    margin: '0px 7px -4px -7px',
                }}
            >
                {data.label}
            </Chip>
        );
    }

    removeDate(event) {
        event.preventDefault();

        // We manually reach into the composed component and set it's date to undefined.
        this.refs.datePicker.setState({
            inwardDate: null
        }, () => {
            this.refs.datePicker.props.onChange(null, null);
        });

        this.search();
    }

    async search() {
        if (this.state.origin.length < 3 || this.state.destination.length < 3) {
          return;
        }

        let outDate = moment(this.state.outwardDate).format("YYYY-MM-DD");
        let inwDate = this.state.inwardDate ? moment(this.state.inwardDate).format("YYYY-MM-DD") :  null;
        let filClass = this.state.filClass;
        let chipCode = this.state.chipCode.map(chips => chips.label).join();

        try {
            // this.props.rebaseData('loading', true);

            const data = await search(
                this.state.origin.split(" ").reverse()[0],
                this.state.destination.split(" ").reverse()[0],
                outDate,
                this.state.adults,
                this.state.children,
                inwDate,
                chipCode,
                filClass,
                this.state.singles,
                this.state.returns,
                this.state.advance,
                this.state.offPeak,
                this.state.anytime
            );

            this.props.rebaseData('searchResult', data);
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        const today = new Date();
        const styles = {
            menuStyle: {
                maxHeight: '400px',
            },
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

        return (
            <section className="search">
                <div className="container clearfix">
                    <form>
                        <div className="search-col search-col-1 pull-left">
                            <div className="form-group">
                                <p className="form-label">ORIGIN</p>
                                <AutoComplete
                                    name="origin"
                                    dataSource={inputLocations}
                                    maxSearchResults={40}
                                    className="form-label-input Indigo"
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    textFieldStyle={{
                                        width: 180,
                                    }}
                                    menuStyle={styles.menuStyle}
                                    openOnFocus={true}
                                    onNewRequest={(data) => {
                                        this.setState({origin: data});
                                        this.search();
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <p className="form-label">DESTINATION</p>
                                <AutoComplete
                                    name="destination"
                                    dataSource={inputLocations}
                                    maxSearchResults={40}
                                    className="form-label-input"
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    textFieldStyle={{
                                        width: 180,
                                    }}
                                    menuStyle={styles.menuStyle}
                                    openOnFocus={true}
                                    onNewRequest={(data) => {
                                        this.setState({destination: data});
                                        this.search();
                                    }}
                                />
                            </div>
                        </div>

                        <div className="search-col search-col-2 pull-left">
                            <div className="form-group">
                                <p className="form-label">Outward date</p>
                                <DatePicker
                                    name="outwardDate"
                                    onChange={this.handleChangeOutwardDate}
                                    autoOk={this.state.autoOk}
                                    defaultDate={this.state.outwardDate}
                                    disableYearSelection={this.state.disableYearSelection}
                                    minDate={today}
                                    className="form-label-input form-calendar"
                                    formatDate={(date) => moment(date).format('ddd, DD MMM YYYY')}
                                    style={styles.calendar}
                                    textFieldStyle={styles.calendar}
                                />
                            </div>

                            <div className="form-group">
                                <p className="form-label">Return date <button className='clear-date' onClick={this.removeDate}>clear</button></p>
                                <DatePicker
                                    name="inwardDate"
                                    onChange={this.handleChangeInwardDate}
                                    autoOk={this.state.autoOk}
                                    disableYearSelection={this.state.disableYearSelection}
                                    minDate={this.state.outwardDate}
                                    value={this.state.inwardDate}
                                    ref="datePicker"
                                    className="form-label-input form-calendar"
                                    formatDate={(date) => moment(date).format('ddd, DD MMM YYYY')}
                                    style={styles.calendar}
                                    textFieldStyle={styles.calendar}
                                />
                            </div>
                        </div>

                        <div className="search-col search-col-3 pull-left center">
                            <div className="form-group">
                                <p className="form-label">Adults</p>
                                <TextField
                                    name="numAdults"
                                    type="text"
                                    value={this.state.adults}
                                    className="form-label-input form-number"
                                />
                                <i className="fa fa-caret-left number-left" aria-hidden="true" onClick={() => {
                                    if (this.state.adults > 0) {
                                        this.setState({adults: this.state.adults - 1})
                                    }

                                    this.search();
                                }}></i>
                                <i className="fa fa-caret-right number-right" aria-hidden="true" onClick={() => {
                                    if (this.state.adults < 9) {
                                        this.setState({adults: this.state.adults + 1})
                                    }

                                    this.search();
                                }}></i>
                            </div>

                            <div className="form-group">
                                <p className="form-label">Children</p>
                                <TextField
                                    name="numChildren"
                                    type="text"
                                    value={this.state.children}
                                    className="form-label-input form-number"
                                />
                                <i className="fa fa-caret-left number-left" aria-hidden="true" onClick={() => {
                                    if(this.state.children <= 1) {
                                        this.setState({children: 0})
                                    } else {
                                        this.setState({children: this.state.children - 1})
                                    }

                                    this.search();
                                }}></i>
                                <i className="fa fa-caret-right number-right" aria-hidden="true" onClick={() => {
                                    if(this.state.children >= 9) {
                                        this.setState({children: 9})
                                    } else {
                                        this.setState({children: this.state.children + 1})
                                    }

                                    this.search();
                                }}></i>
                            </div>
                        </div>

                        <div className="search-col search-col-4 pull-left">
                            <div className="form-group">
                                <p className="form-label">Railcards</p>
                                <AutoComplete
                                    name="railcards"
                                    filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                                    searchText={this.state.searchText}
                                    onUpdateInput={this.handleUpdateInput}
                                    openOnFocus={true}
                                    dataSource={this.state.railcards}
                                    textFieldStyle={{
                                        width: 270,
                                    }}
                                    readOnly
                                    className="form-label-input"
                                    onNewRequest={() => {
                                        this.handleRailcardAdd();
                                        this.search()
                                    }}
                                />
                                <div>
                                    {this.state.chipData.map(this.renderChip, this)}
                                </div>
                            </div>
                        </div>

                        <div className="search-col search-col-5 pull-left">
                            <legend className="form-label">Filters</legend>
                            <RadioButtonGroup className="form-elements" name="shipSpeed" defaultSelected={this.state.filClass} onChange={(event) => {
                                this.setState({filClass: event.target.value});

                                this.search();
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

                                        this.search();
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

                                        this.search();
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

                                        this.search();
                                    }}
                                />
                                <Checkbox
                                    key='2'
                                    label="Off Peak"
                                    defaultChecked={this.state.offPeak}
                                    style={styles.checkbox}
                                    iconStyle={styles.iconStyle}
                                    onCheck={() => {
                                        this.setState({offPeak: !this.state.offPeak});

                                        this.search();
                                    }}
                                />
                                <Checkbox
                                    key='3'
                                    label="Anytime"
                                    defaultChecked={this.state.anytime}
                                    style={styles.checkbox}
                                    iconStyle={styles.iconStyle}
                                    onCheck={() => {
                                        this.setState({anytime: !this.state.anytime});

                                        this.search();
                                    }}
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

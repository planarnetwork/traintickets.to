import React, {Component} from "react";
import {AutoComplete, DatePicker, TextField, Chip, RadioButtonGroup, RadioButton, Checkbox} from 'material-ui';
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
        maxDate.setHours(24, 0, 0, 0);

        this.state = {
            origin: null,
            destination: null,
            adults: 2,
            children: 2,
            minDate: minDate,
            maxDate: maxDate,
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
        this.testAdults = this.testAdults.bind(this);
        this.testChildren = this.testChildren.bind(this);
        this.getMaxDate = this.getMaxDate.bind(this);
        this.removeDate = this.removeDate.bind(this);
        this.handleChangeMinDate = this.handleChangeMinDate.bind(this);
        this.handleChangeMaxDate = this.handleChangeMaxDate.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.handleRequestAdd = this.handleRequestAdd.bind(this);
    }

    handleChangeMinDate(event, date) {
        this.setState({
            minDate: date,
        });
        if(this.state.origin.length && this.state.destination.length) {
            this.search()
        }
    };

    handleChangeMaxDate(event, date) {
        this.setState({
            maxDate: date,
        });
        if(this.state.origin.length && this.state.destination.length) {
            if(date !== undefined) {
                this.search()
            }
        }
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
        if(this.state.origin.length && this.state.destination.length) {
            this.search()
        }
    };

    handleRequestAdd() {
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

    testAdults(event) {
        let value = event.target.value;
        let rep = /[-.;":'a-zA-Zа-яА-Я]/;
        if (rep.test(value)) {
            value = value.replace(rep, this.state.adults);
            event.target.value = value;
        }
        this.setState({adults: event.target.value});

        if(this.state.origin.length && this.state.destination.length) {
            this.search()
        }
    }

    testChildren(event) {
        let value = event.target.value;
        let rep = /[-.;":'a-zA-Zа-яА-Я]/;
        if (rep.test(value)) {
            value = value.replace(rep, this.state.children);
            event.target.value = value;
        }
        this.setState({children: event.target.value});
        if(this.state.origin.length && this.state.destination.length) {
            this.search()
        }
    }

    async getMaxDate(newDay) {
        let self = await this;
        self.setState({
            maxDate: moment(newDay).add(1, 'day')._d
        });
    }

    removeDate(event) {
        event.preventDefault();

        // We manually reach into the composed component and set it's date to undefined.
        let newDate;
        this.refs.datePicker.setState({
            maxDate: newDate
        }, () => {
            this.refs.datePicker.props.onChange(null, newDate);
        });
        if(this.state.origin.length && this.state.destination.length) {
            this.search('false');
        }
    }

    async search(returnDate) {
        let self = await this;
        let retDate;
        let origin = this.state.origin;
        let destination = this.state.destination;
        let o = origin.split(' ');
        let d = destination.split(' ');
        o = o[o.length - 1];
        d = d[d.length - 1];
        let filClass = self.state.filClass;
        let chipCode = self.state.chipCode.map((chips) => chips.label).toString();
        this.props.rebaseData('adults', this.state.adults);
        this.props.rebaseData('children', this.state.children);

        if(returnDate || self.state.maxDate === undefined) {
            retDate = null;
        } else {
            retDate = moment(self.state.maxDate).format("YYYY-MM-DD");
        }

        search(o, d, moment(self.state.minDate).format("YYYY-MM-DD"), self.state.adults, self.state.children, retDate, chipCode, filClass, self.state.singles, self.state.returns, self.state.advance, self.state.offPeak, self.state.anytime)
            .then((data) => {
                self.props.rebaseData('searchResult', data)
            })
            .catch((e) => {
                console.log('Something going wrong: ' + e)
            })
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
                                    dataSource={locations.map((key) => key.name + ' - ' + key.code)}
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
                                        if(this.state.destination.length) {
                                            this.search();
                                            if(this.state.origin.length && this.state.destination.length) {
                                                this.props.rebaseData('loading', true);
                                            }
                                        }
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <p className="form-label">DESTINATION</p>
                                <AutoComplete
                                    dataSource={locations.map((key) => key.name + ' - ' + key.code)}
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
                                        if(this.state.origin.length) {
                                            this.search()
                                        }
                                        if(this.state.origin.length && this.state.destination.length) {
                                            this.props.rebaseData('loading', true);
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
                                    defaultDate={this.state.minDate > this.state.maxDate ? this.getMaxDate(this.state.minDate) : this.state.minDate}
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
                                    onChange={this.handleChangeMaxDate}
                                    autoOk={this.state.autoOk}
                                    disableYearSelection={this.state.disableYearSelection}
                                    minDate={this.state.minDate}
                                    value={this.state.maxDate}
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
                                    onChange={(event) => {
                                        this.testAdults(event);
                                    }}
                                />
                                <i className="fa fa-caret-left number-left" aria-hidden="true" onClick={() => {
                                    if(this.state.adults <= 1) {
                                        this.setState({adults: 0})
                                    } else {
                                        this.setState({adults: this.state.adults - 1})
                                    }
                                    if(this.state.origin.length && this.state.destination.length) {
                                        this.search()
                                    }
                                }}></i>
                                <i className="fa fa-caret-right number-right" aria-hidden="true" onClick={() => {
                                    if(this.state.adults >= 9) {
                                        this.setState({adults: 9})
                                    } else {
                                        this.setState({adults: this.state.adults + 1})
                                    }
                                    if(this.state.origin.length && this.state.destination.length) {
                                        this.search()
                                    }
                                }}></i>
                            </div>

                            <div className="form-group">
                                <p className="form-label">Children</p>
                                <TextField
                                    name="numChildren"
                                    type="text"
                                    value={this.state.children}
                                    className="form-label-input form-number"
                                    onChange={(event) => {
                                        this.testChildren(event)
                                    }}
                                />
                                <i className="fa fa-caret-left number-left" aria-hidden="true" onClick={() => {
                                    if(this.state.children <= 1) {
                                        this.setState({children: 0})
                                    } else {
                                        this.setState({children: this.state.children - 1})
                                    }
                                    if(this.state.origin.length && this.state.destination.length) {
                                        this.search()
                                    }
                                }}></i>
                                <i className="fa fa-caret-right number-right" aria-hidden="true" onClick={() => {
                                    if(this.state.children >= 9) {
                                        this.setState({children: 9})
                                    } else {
                                        this.setState({children: this.state.children + 1})
                                    }
                                    if(this.state.origin.length && this.state.destination.length) {
                                        this.search()
                                    }
                                }}></i>
                            </div>
                        </div>

                        <div className="search-col search-col-4 pull-left">
                            <div className="form-group">
                                <p className="form-label">Railcards</p>
                                <AutoComplete
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
                                        this.handleRequestAdd();
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
                                    defaultChecked={this.state.offPeak}
                                    style={styles.checkbox}
                                    iconStyle={styles.iconStyle}
                                    onCheck={() => {
                                        this.setState({offPeak: !this.state.offPeak});
                                        if(this.state.origin.length && this.state.destination.length) {
                                            this.search()
                                        }
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
                                        if(this.state.origin.length && this.state.destination.length) {
                                            this.search()
                                        }
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

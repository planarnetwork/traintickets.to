/*global google*/
import React, {Component} from "react";
import locations from '../../data/locations.json';
import './Map.css';
const { compose, withProps, lifecycle } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} = require("react-google-maps");

const styles = {
    containerElement: {
        position: 'fixed',
        height: '100%',
        top: '0',
        left: '0',
        width: '100%',
    }
};

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldRenderMap: true
        };
    }

    render() {
        const val = this.props.route;

            let origin = locations.find((e) => {
                return e.code === val.origin;
            });
            let destination = locations.find((e) => {
                return e.code === val.destination;
            });
            let wayPointsData = [];
            val.legs.map((leg) => {
                leg.callingPoints ? leg.callingPoints.map((point) => {
                    let pointOrigin = locations.find((e) => {
                        return e.code === point.station;
                    });
                    if(origin.name !== pointOrigin.name && destination.name !== pointOrigin.name && wayPointsData.length < 23) {
                        wayPointsData.push({
                            lat: pointOrigin.lat,
                            lon: pointOrigin.lon
                        });
                    }
                }) : []
            });
            const MapWithADirectionsRenderer = compose(
                withProps({
                    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCwD7tScQzIMMwTaC5DLZjaKgPpzvEToGA",
                    loadingElement: <div style={{ height: `100%` }} />,
                    containerElement: <div style={styles.containerElement} />,
                    mapElement: <div style={{ height: `100%` }} />,
                }),
                withScriptjs,
                withGoogleMap,
                lifecycle({
                    componentDidMount() {
                        const DirectionsService = new google.maps.DirectionsService();
                        DirectionsService.route({
                            origin: new google.maps.LatLng(origin.lat, origin.lon),
                            destination: new google.maps.LatLng(destination.lat, destination.lon),
                            travelMode: google.maps.TravelMode.TRANSIT, /*DRIVING, BICYCLING, TRANSIT and WALKING*/
                            waypoints: wayPointsData.map((key) => {
                                return {
                                    location: new google.maps.LatLng(key.lat, key.lon),
                                }
                            }),
                            optimizeWaypoints: false,
                        }, (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    directions: result,
                                });
                            } else {
                                console.error(`error fetching directions ${result}`);
                            }
                        });
                    }
                })
            )(props =>
                <GoogleMap
                    defaultZoom={8}
                    defaultCenter={new google.maps.LatLng(origin.lat, origin.lon)}
                >
                    {props.directions && <DirectionsRenderer directions={props.directions} />}
                </GoogleMap>
            );
        return (
            <div className="map">
                <MapWithADirectionsRenderer />
            </div>
        );
    }
}

export default Map;

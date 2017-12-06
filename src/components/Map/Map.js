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
        const journey = this.props.route;
        const origin = locations.find(e => e.code === journey.origin);

        const MapWithADirectionsRenderer = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCwD7tScQzIMMwTaC5DLZjaKgPpzvEToGA",
                loadingElement: <div style={{ height: `95%` }} />,
                containerElement: <div style={styles.containerElement} />,
                mapElement: <div style={{ height: `98%` }} />,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentDidMount() {
                    const DirectionsService = new google.maps.DirectionsService();
                    const wayPointsData = this.getWayPointsData(journey);
                    const waypoints = [];

                    for (const [origin, destination, mode] of wayPointsData) {
                        DirectionsService.route({
                            origin: origin,
                            destination: destination,
                            travelMode: mode
                        }, (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                result.geocoded_waypoints = waypoints.concat(result.geocoded_waypoints);

                                this.setState({
                                    directions: result,
                                });
                            } else {
                                console.error(`error fetching directions ${result}, ${status}`);
                            }
                        });
                    }
                },
                getWayPointsData(journey) {
                    const wayPointsData = [];

                    for (const leg of journey.legs) {
                        if (leg.callingPoints && leg.callingPoints.length > 1) {
                            let pointOrigin = locations.find(e => e.code === leg.callingPoints[0].station);
                            for (let i = 1; i < leg.callingPoints.length; i++) {
                                const pointDestination = locations.find(e => e.code === leg.callingPoints[i].station);

                                wayPointsData.push([
                                    new google.maps.LatLng(pointOrigin.lat, pointOrigin.lon),
                                    new google.maps.LatLng(pointDestination.lat, pointDestination.lon),
                                    leg.mode === 'train' ? google.maps.TravelMode.TRANSIT : google.maps.TravelMode.DRIVING
                                ]);

                                pointOrigin = pointDestination;
                            }
                        }
                        else {
                            const pointOrigin = locations.find(e => e.code === leg.origin);
                            const pointDestination = locations.find(e => e.code === leg.destination);

                            wayPointsData.push([
                                new google.maps.LatLng(pointOrigin.lat, pointOrigin.lon),
                                new google.maps.LatLng(pointDestination.lat, pointDestination.lon),
                                leg.mode === 'walk' ? google.maps.TravelMode.WALKING : google.maps.TravelMode.TRANSIT
                            ]);
                        }
                    }

                    return wayPointsData;
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

/*global google*/
import React, {Component} from "react";
import locations from '../../data/locations.json';
import './Map.css';
const { compose, withProps } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polyline,
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
        const wayPointsData = [];

        for (const leg of journey.legs) {
            if (leg.callingPoints && leg.callingPoints.length > 1) {
                let pointOrigin = locations.find(e => e.code === leg.callingPoints[0].station);
                for (let i = 1; i < leg.callingPoints.length; i++) {
                    const pointDestination = locations.find(e => e.code === leg.callingPoints[i].station);

                    if (pointOrigin && pointDestination) {
                        wayPointsData.push([
                            { lat: pointOrigin.lat, lng: pointOrigin.lon },
                            { lat: pointDestination.lat, lng: pointDestination.lon }
                        ]);
                    }

                    pointOrigin = pointDestination;
                }
            }
            else {
                const pointOrigin = locations.find(e => e.code === leg.origin);
                const pointDestination = locations.find(e => e.code === leg.destination);

                if (pointOrigin && pointDestination) {
                    wayPointsData.push([
                        { lat: pointOrigin.lat, lng: pointOrigin.lon },
                        { lat: pointDestination.lat, lng: pointDestination.lon }
                    ]);
                }
            }
        }

        const MapWithRoute = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCwD7tScQzIMMwTaC5DLZjaKgPpzvEToGA",
                loadingElement: <div style={{ height: `95%` }} />,
                containerElement: <div style={styles.containerElement} />,
                mapElement: <div style={{ height: `98%` }} />,
            }),
            withScriptjs,
            withGoogleMap,
        )(() =>
            <GoogleMap
                defaultOptions={{
                    gestureHandling: 'greedy'
                }}
                defaultZoom={8}
                defaultCenter={new google.maps.LatLng(origin.lat, origin.lon)}
            >
                { wayPointsData.map((points, i) => <Polyline key={i} path={points}/>) }
            </GoogleMap>
        );

        return (
            <div className="map">
                <MapWithRoute />
            </div>
        );
    }
}

export default Map;

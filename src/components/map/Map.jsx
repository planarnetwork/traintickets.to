import classes from './Map.scss'
import { GoogleMapLoader, GoogleMap } from 'react-google-maps'

export default class Map extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <section className={classes.mapWrapper}>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props}
              style={{
                height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              containerProps={{
                style: {
                  height: `100%`,
                  width: '100%'
                },
              }}
              defaultZoom={8}
              defaultCenter={{ lat: -34.397, lng: 150.644 }} />
          } />
        {children}
      </section>
    );
  }
}

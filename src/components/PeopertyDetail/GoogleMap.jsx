import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '600px',
};

class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: null,
    };
  }

  componentDidMount() {
    // Use the Geocoding API to get the coordinates for the ZIP code
    const { google, zipCode } = this.props;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: zipCode }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location;
        // console.log('Location: ', location);
        // alert('Location: ')
        this.setState({ mapCenter: location });
      } else {
        console.log('results: ', results);
        console.log('status: ', status);
      }
    });
  }

  render() {
    const { mapCenter } = this.state;

    return (
      <div>
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          center={mapCenter}
        >
          {mapCenter && (
            <Marker
              position={{
                lat: mapCenter.lat(),
                lng: mapCenter.lng(),
              }}
            />
          )}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA0iKmisEWJWWvZCCNem16Ii7aJS8_lo6o',
})(LocationMap);

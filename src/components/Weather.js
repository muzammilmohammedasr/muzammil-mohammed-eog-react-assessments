import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import ChipRaw from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
var test;

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const cardStyles = theme => ({
  root: {
    background: theme.palette.secondary.main
  },
  label: {
    color: theme.palette.primary.main
  }
});
const Chip = withStyles(cardStyles)(ChipRaw);

class Weather extends Component {
  componentDidMount() {
    this.interval = setInterval(() => this.props.onLoad(), 4000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /*componentWillReceiveProps() {
    //this.props.getId();
    fetch(`https://react-assessment-api.herokuapp.com/api/drone`, {
      method: 'GET'
    }).then((response) => {
      response.json().then((result) => {
      var lastdata=result.data.length-1;
        console.log(result.data[lastdata]);
      });
    });
  }*/
  render() {
    const {
      loading,
      name,
      weather_state_name,
      temperatureinFahrenheit,
      latitude,
      longitude
    } = this.props;
    const center = {
      lat: latitude,
      lng: longitude
    };
    const zoom = 11;
    const coords = { lat: latitude, lng: longitude };

    //if (loading) return "";
    return (
      /*
          <Map
            google={this.props.google}
            style={{ width: '100%', height: '1500px' }}
            initialCenter={{
              lat: latitude,
              lng: longitude
            }}
            Marker
            zoom={11}
          />
    */
      <Map google={this.props.google}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        initialCenter={coords}
        className={'map'}
        zoom={5}>
        
        <Marker
          name={'Dolores park'}
          position={{ lat: latitude, lng: longitude }} />
        
        
      </Map>
      /*

    <Chip
      label={`Latitude = ${latitude} and Longtitude = ${longitude}`}
    />
    
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyDJdJF2Ufv6fcHVRgk-skaXlvO7Zdtnmeo' }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <AnyReactComponent
        lat={latitude}
        lng={longitude}
        text={latitude + ", " + longitude}
      />
    </GoogleMapReact>
  </div>
  */
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit,
    latitude,
    longitude
  } = state.weather;
  return {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit,
    latitude,
    longitude
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_WEATHER
    }),
});

const WrappedContainer = GoogleApiWrapper({
  apiKey: 'AIzaSyDJdJF2Ufv6fcHVRgk-skaXlvO7Zdtnmeo'
});
/*
export default connect(
  mapState,
  WrappedContainer,
  mapDispatch,
)(Weather);
*/

export default connect(
  mapState, mapDispatch)(GoogleApiWrapper({ apiKey: 'AIzaSyDJdJF2Ufv6fcHVRgk-skaXlvO7Zdtnmeo', version: '3.27' })(Weather));
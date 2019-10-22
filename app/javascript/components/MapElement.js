import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import images from './../images';

const MapElement = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={props.defaultCenter}
    center={props.center}
  >
    {props.data.map((element, index) => {
      const { lat, lng, id } = element;
      const { highlightedElement } = props;
      return highlightedElement && id == highlightedElement.id ? (
        <Marker zIndex={2} key={index} icon={images.tinyBluePrinter} position={{ lat, lng }} />

      ) : (
        <Marker zIndex={1} key={index} icon={images.tinyPrinter} position={{ lat, lng }} />
      )
  })}
  </GoogleMap>
);

export default MapElement;
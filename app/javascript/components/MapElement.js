import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import images from './../images';

const MapElement = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ defaultZoom, defaultCenter, center = null, highlightedElement, data }) =>
  <GoogleMap
    defaultZoom={defaultZoom}
    defaultCenter={defaultCenter}
    center={center}
  >
    {data.map((element, index) => {
      const { lat, lng, id } = element;
      return highlightedElement && id == highlightedElement.id ? (
        <Marker zIndex={2} key={index} icon={images.tinyBluePrinter} position={{ lat, lng }} />

      ) : (
        <Marker zIndex={1} key={index} icon={images.tinyPrinter} position={{ lat, lng }} />
      )
  })}
  </GoogleMap>
);

export default MapElement;
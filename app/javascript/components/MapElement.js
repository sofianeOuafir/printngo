import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import images from "./../images";

const MapElement = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&v=3.38&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: "100%" }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          if (this.props.onBoundsHaveChanged) {
            this.props.onBoundsHaveChanged(refs.map.getBounds());
          }
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(
  ({
    defaultZoom,
    defaultCenter,
    center = null,
    highlightedElement,
    data,
    onBoundsChanged,
    onMapMounted
  }) => (
    <GoogleMap
      ref={onMapMounted}
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      center={center}
      onBoundsChanged={onBoundsChanged}
    >
      {data.map((element, index) => {
        const { lat, lng, id } = element;
        return highlightedElement && id == highlightedElement.id ? (
          <Marker
            zIndex={2}
            key={index}
            icon={images.tinyBluePrinter}
            position={{ lat, lng }}
          />
        ) : (
          <Marker
            zIndex={1}
            key={index}
            icon={images.tinyPrinter}
            position={{ lat, lng }}
          />
        );
      })}
    </GoogleMap>
  )
);

export default MapElement;

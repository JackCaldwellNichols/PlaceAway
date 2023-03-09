import React, { useEffect, useState } from 'react'
import { getRooms } from '../actions/room'
import { useValue } from '../context/ContextProvider'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Avatar, Box, Paper, Tooltip } from '@mui/material'
import Supercluster from 'supercluster'
import './cluster.css'
import GeoCoderInput from '../components/GeoCoderInput'
import PopUpRoom from './PopUpRoom'


const supercluster = new Supercluster ({
  radius: 75,
  maxZoom : 20
})


  const ClusterMap = () => {
    const {
      state: { filteredRooms, room },
      dispatch,
      mapRef,
    } = useValue();
    const [points, setPoints] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [bounds, setBounds] = useState([-180, -85, 180, 85]);
    const [zoom, setZoom] = useState(0);
    const [popUpInfo, setPopUpInfo] = useState(null)




    useEffect(() => {
      getRooms(dispatch);
    }, []);
  
    useEffect(() => {
      const points = filteredRooms.map((room) => ({
        type: 'Feature',
        properties: {
          cluster: false,
          roomId: room._id,
          price: room.price,
          title: room.title,
          description: room.description,
          longitude: room.longitude,
          latitude: room.latitude,
          images: room.images,
          uPhoto: room.userimage,
          uName: room.userame,
        },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(room.longitude), parseFloat(room.latitude)],
        },
      }));
      setPoints(points);
    }, [filteredRooms]);
    
    useEffect(() => {
      supercluster.load(points);
      setClusters(supercluster.getClusters(bounds, zoom));
    }, [points, zoom, bounds]);

    useEffect(() => {
      if (mapRef.current) {
        setBounds(mapRef.current.getMap().getBounds().toArray().flat());
      }
    }, [mapRef?.current]);

  return (
    <Box sx={{height:'100vh'}}>
    <ReactMapGL
      initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
    >
      {clusters.map((cluster) => {
        const { cluster: isCluster, point_count } = cluster.properties;
      
        const [longitude, latitude] = cluster.geometry.coordinates;
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (point_count / points.length) * 20}px`,
                  height: `${10 + (point_count / points.length) * 20}px`,
                }}
                onClick={() => {
                  const zoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
                {point_count}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={`room-${cluster.properties.roomId}`}
            longitude={longitude}
            latitude={latitude}
          >
            <Tooltip title={cluster.properties.uName}>
              <Avatar
                src={cluster.properties.uPhoto}
                component={Paper}
                elevation={2}
                onClick={()=>setPopUpInfo(cluster.properties)}
              />
            </Tooltip>
          </Marker>
        );
      })}
      <GeoCoderInput />
      {popUpInfo && (
        <Popup
          longitude={popUpInfo.longitude}
          latitude={popUpInfo.latitude}
          maxWidth="auto"
          closeOnClick={false}
          focusAfterOpen={false}
          onClose={() => setPopUpInfo(null)}
        >
          <PopUpRoom {...{ popUpInfo }} />
        </Popup>
      )}
    </ReactMapGL>
</Box>
  )
}

export default ClusterMap
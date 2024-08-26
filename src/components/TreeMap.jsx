/* eslint-disable react-refresh/only-export-components */
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchTreeAPI } from "../apis/treesAPI";
import Applayout from "./layout/AppLayout";
import LoaderComponent from "./Loader";
import TreeInfoWindow from "./TreeInfoWindow";

const MapComponent = () => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [searchParams] = useSearchParams();
  const [map, setMap] = useState(null);
  const { data } = useQuery({
    queryKey: ["trees", debouncedSearchTerm],
    queryFn: () => fetchTreeAPI(debouncedSearchTerm),
  });

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const lat = parseFloat(searchParams.get("lat"));
    const lng = parseFloat(searchParams.get("lng"));

    if (!isNaN(lat) && !isNaN(lng)) {
      const tree = data?.data.find((tree) => {
        const [treeLat, treeLng] = tree.geolocation
          .split(",")
          .map((coord) => parseFloat(coord.trim()));
        return treeLat === lat && treeLng === lng;
      });

      if (tree) {
        setSelectedTree(tree);
        if (map) {
          map.panTo({ lat, lng });
        }
      }
    }
  }, [searchParams, data, map]);

  const handleMarkerClick = (tree) => {
    setSelectedTree(tree);
  };

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  return (
    <div className="h-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a tree..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-72 my-3 ml-2 p-2 border border-gray-400 rounded-md"
        />
        {searchTerm && (
          <ul className="absolute top-full left-2 z-10 bg-gray-300 shadow-lg w-72 rounded-md mt-0.5">
            {data?.data.length === 0 && (
              <li className="p-2 flex justify-start items-center cursor-pointer border-b border-gray-200 hover:bg-gray-400 hover:text-black rounded-md">
                No Tree Found
              </li>
            )}
          </ul>
        )}
      </div>

      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY}
        loadingElement={<LoaderComponent />}
      >
        <GoogleMap
          mapContainerClassName="h-full"
          center={userLocation || { lat: 20.5937, lng: 78.9629 }}
          zoom={12}
          options={{ disableDefaultUI: true, zoomControl: true }}
          onLoad={onMapLoad}
        >
          {data?.data.map((tree) => {
            const [lat, lng] = tree.geolocation
              .split(",")
              .map((coord) => parseFloat(coord.trim()));

            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker
                  key={tree._id}
                  position={{ lat, lng }}
                  onClick={() => handleMarkerClick(tree)}
                />
              );
            }
            console.error("Invalid geolocation format:", tree.geolocation);
            return null;
          })}

          {selectedTree && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedTree.geolocation.split(",")[0]),
                lng: parseFloat(selectedTree.geolocation.split(",")[1]),
              }}
              onCloseClick={() => setSelectedTree(null)}
            >
              <TreeInfoWindow tree={selectedTree} />
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Applayout(MapComponent);

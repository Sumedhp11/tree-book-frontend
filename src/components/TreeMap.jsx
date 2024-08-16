/* eslint-disable react-refresh/only-export-components */
import { useEffect, useLayoutEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Applayout from "./layout/AppLayout";
import TreeInfoWindow from "./TreeInfoWindow";
import QRCode from "qrcode";

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [selectedTree, setSelectedTree] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTrees, setFilteredTrees] = useState([]);

  useLayoutEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error fetching user location:", error);

            setUserLocation({ lat: 20.5937, lng: 78.9629 });
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setUserLocation({ lat: 20.5937, lng: 78.9629 });
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const response = await fetch(
          `https://tree-book-backend.vercel.app/api/trees/all?searchTerm=${searchQuery}`
        );
        const result = await response.json();

        if (response.ok) {
          setFilteredTrees(result.data);
        } else {
          console.error("Error fetching trees data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching trees data:", error);
      }
    };

    const debounceFetch = setTimeout(() => {
      if (searchQuery) {
        fetchTrees();
      } else {
        setFilteredTrees([]);
      }
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  const handleMarkerClick = async (tree) => {
    setSelectedTree(tree);

    const url = `https://treebook.vercel.app/map?lat=${
      tree.geolocation.split(",")[0]
    }&lng=${tree.geolocation.split(",")[1]}`;
    try {
      const qrCode = await QRCode.toDataURL(url);
      setQrCodeUrl(qrCode);
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  return (
    <div className="h-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a tree..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-72 my-3 ml-2 p-2 border border-gray-400 rounded-md"
        />
        {searchQuery && (
          <ul className="absolute top-full left-2 z-10 bg-gray-300 shadow-lg w-72 rounded-md mt-0.5">
            {filteredTrees.length === 0 && (
              <li className="p-2 flex justify-start items-center cursor-pointer border-b border-gray-200 hover:bg-gray-400 hover:text-black rounded-md">
                No Tree Found
              </li>
            )}
          </ul>
        )}
      </div>

      <LoadScript googleMapsApiKey="AIzaSyDoXymPuoD_3En9-KxcHIr3jegSR6E4G-o">
        <GoogleMap
          mapContainerClassName="h-full"
          center={userLocation || { lat: 20.5937, lng: 78.9629 }}
          zoom={12}
          options={{ disableDefaultUI: true, zoomControl: true }}
        >
          {userLocation && filteredTrees.geolocation && (
            <Marker position={userLocation} />
          )}

          {filteredTrees.map((tree) => {
            const [lat, lng] = tree.geolocation
              .split(",")
              .map((coord) => parseFloat(coord.trim()));

            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker
                  key={tree.id}
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
              <div>
                <TreeInfoWindow tree={selectedTree} />
                {qrCodeUrl && (
                  <div>
                    <img src={qrCodeUrl} alt="QR Code" />
                    <a
                      href={qrCodeUrl}
                      download={`tree-${selectedTree.id}-qrcode.png`}
                      className="block mt-2 text-blue-500"
                    >
                      Download QR Code
                    </a>
                  </div>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Applayout(MapComponent);

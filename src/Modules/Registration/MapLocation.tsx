import { useEffect, useRef, useState } from "react";
import { API_KEY } from "../../KEY";
import { Button, TextInput, Group, Card } from "@mantine/core";
import { ChevronLeft, Search } from "lucide-react";
import { TrafficCone, Moon, XCircle } from "lucide-react";
import LocationConfirmDrawer from "./LocationConfirmDrawer";

declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
        DirectionsRenderer: any;
        DirectionsService: any;
        TrafficLayer: any;
        Geocoder: any;
        LatLngBounds: any;
        SymbolPath: any;
        TravelMode: any;
        places: {
          AutocompleteService: any;
          PlacesService: any;
          PlacesServiceStatus: any;
        };
        GeocoderStatus: any;
      };
    };
  }
}

interface Props {
  lat: number;
  lng: number;
  height?: string;
}

let googleMapsPromise: Promise<void> | null = null;

/* Load Google Maps only once */
const loadGoogleMaps = (apiKey: string): Promise<void> => {
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });

  return googleMapsPromise;
};

export default function LocationMapView({ lat, lng, height = "99vh" }: Props) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // const userMarkerRef = useRef<any>(null);

  const watchIdRef = useRef<number | null>(null);

  const directionsRendererRef = useRef<any>(null);

  const trafficLayerRef = useRef<any>(null);
  const centerMarkerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);

  // const [userLocation, setUserLocation] = useState<{
  //   lat: number;
  //   lng: number;
  // } | null>(null);

  const [traffic, setTraffic] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(API_KEY?.GOOGLE_API_KEY || "");
  const [showApiForm, setShowApiForm] = useState(!API_KEY?.GOOGLE_API_KEY);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name?: string;
  } | null>({ lat, lng, name: `${lat}, ${lng}` });
  const [, setShowConfirmDrawer] = useState(true);

  const autocompleteServiceRef = useRef<any>(null);
  const placesServiceRef = useRef<any>(null);

  /* Initialize Map */
  useEffect(() => {
    const apiKey = apiKeyInput || API_KEY?.GOOGLE_API_KEY;
    if (!apiKey) return;

    loadGoogleMaps(apiKey)
      .then(() => {
        if (!mapContainerRef.current) return;

        mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
          center: { lat, lng },
          zoom: 15,
          mapTypeControl: true,
          scaleControl: true,
          rotateControl: true,
          tilt: 45,
          fullscreenControl: false,
          streetViewControl: false,
        });

        // Destination Marker
        new window.google.maps.Marker({
          position: { lat, lng },
          map: mapRef.current,
          title: "Destination",
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#2563eb",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 2,
          },
        });

        // Directions
        directionsRendererRef.current =
          new window.google.maps.DirectionsRenderer({
            polylineOptions: {
              strokeColor: "#2563eb",
              strokeWeight: 5,
            },
          });

        directionsRendererRef.current.setMap(mapRef.current);

        // Traffic
        trafficLayerRef.current = new window.google.maps.TrafficLayer();

        // Initialize Autocomplete Service
        autocompleteServiceRef.current =
          new window.google.maps.places.AutocompleteService();
        placesServiceRef.current = new window.google.maps.places.PlacesService(
          mapRef.current,
        );

        // Initialize Geocoder
        geocoderRef.current = new window.google.maps.Geocoder();

        // Add center marker
        centerMarkerRef.current = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapRef.current,
          title: "Selected Location",
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#ef4444",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 3,
          },
        });

        // Listen to map drag/idle events
        mapRef.current.addListener("idle", handleMapIdle);
      })
      .catch(console.error);

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [lat, lng, apiKeyInput]);

  /* Live Location */
  // const startTrackingLocation = () => {
  //   if (!navigator.geolocation) return;

  //   watchIdRef.current = navigator.geolocation.watchPosition(
  //     (pos) => {
  //       const coords = {
  //         lat: pos.coords.latitude,
  //         lng: pos.coords.longitude,
  //       };

  //       setUserLocation(coords);

  //       if (!userMarkerRef.current) {
  //         userMarkerRef.current = new window.google.maps.Marker({
  //           position: coords,
  //           map: mapRef.current,
  //           title: "You",
  //           icon: {
  //             path: window.google.maps.SymbolPath.CIRCLE,
  //             scale: 6,
  //             fillColor: "#10b981",
  //             fillOpacity: 1,
  //             strokeColor: "#fff",
  //             strokeWeight: 2,
  //           },
  //         });
  //       } else {
  //         userMarkerRef.current.setPosition(coords);
  //       }

  //       mapRef.current?.panTo(coords);
  //     },
  //     () => alert("Location permission denied"),
  //     { enableHighAccuracy: true },
  //   );
  // };

  /* Route */
  // const drawRoute = () => {
  //   if (!userLocation) return;

  //   const service = new window.google.maps.DirectionsService();

  //   service.route(
  //     {
  //       origin: userLocation,
  //       destination: { lat, lng },
  //       travelMode: window.google.maps.TravelMode.DRIVING,
  //     },
  //     (res: any, status: string) => {
  //       if (status === "OK") {
  //         directionsRendererRef.current.setDirections(res);

  //         const bounds = new window.google.maps.LatLngBounds();
  //         bounds.extend(userLocation);
  //         bounds.extend({ lat, lng });
  //         mapRef.current.fitBounds(bounds);
  //       }
  //     },
  //   );
  // };

  /* Clear Route */
  const clearRoute = () => {
    directionsRendererRef.current?.setDirections({ routes: [] });
  };

  /* Toggles */
  const toggleTraffic = () => {
    const next = !traffic;
    setTraffic(next);
    trafficLayerRef.current.setMap(next ? mapRef.current : null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    mapRef.current.setOptions({
      styles: darkMode
        ? []
        : [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] }],
    });
  };

  /* External Navigation */
  // const openNavigation = () => {
  //   window.open(
  //     `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
  //     "_blank",
  //   );
  // };

  /* Search Location */
  const handleSearchChange = (value: string) => {
    setSearchInput(value);

    if (value.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    if (!autocompleteServiceRef.current) return;

    autocompleteServiceRef.current.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: "pe" }, // Peru
      },
      (predictions: any, status: string) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSearchResults(predictions || []);
          setShowSearchResults(true);
        }
      },
    );
  };

  /* Select Location from Search */
  const handleSelectLocation = (placeId: string) => {
    if (!placesServiceRef.current) return;

    placesServiceRef.current.getDetails(
      { placeId },
      (place: any, status: string) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const newLat = place.geometry.location.lat();
          const newLng = place.geometry.location.lng();

          mapRef.current?.panTo({ lat: newLat, lng: newLng });
          mapRef.current?.setZoom(15);

          // Show confirm drawer
          setSelectedLocation({
            lat: newLat,
            lng: newLng,
            name: place.formatted_address,
          });
          setShowConfirmDrawer(true);

          // Clear search
          setSearchInput("");
          setSearchResults([]);
          setShowSearchResults(false);
        }
      },
    );
  };

  /* Back Button */
  const handleBackClick = () => {
    window.history.back();
  };

  /* Confirm Location */
  const handleConfirmLocation = (location: {
    lat: number;
    lng: number;
    name?: string;
  }) => {
    // Handle confirmation - could pass to parent or trigger navigation
    console.log("Location confirmed:", location);
    setShowConfirmDrawer(false);
    // You can emit this to parent component or navigate next
  };

  /* Get Location Name from Coordinates */
  const reverseGeocode = (lat: number, lng: number) => {
    if (!geocoderRef.current) return;

    geocoderRef.current.geocode(
      { location: { lat, lng } },
      (results: any, status: string) => {
        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          setSelectedLocation({
            lat,
            lng,
            name: results[0].formatted_address,
          });
        } else {
          setSelectedLocation({
            lat,
            lng,
            name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          });
        }
      },
    );
  };

  /* Handle Map Idle (when user stops dragging) */
  const handleMapIdle = () => {
    if (!mapRef.current) return;
    const center = mapRef.current.getCenter();
    if (center) {
      const lat = center.lat();
      const lng = center.lng();

      // Update center marker position
      if (centerMarkerRef.current) {
        centerMarkerRef.current.setPosition({ lat, lng });
      }

      // Reverse geocode to get address
      reverseGeocode(lat, lng);
    }
  };

  return (
    <div className="relative w-full bg-gray-100">
      {/* API Key Form */}
      {showApiForm && (
        <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full">
          <Card.Section className="p-4 border-b">
            <h3 className="font-semibold">Google Maps API Key</h3>
          </Card.Section>
          <Card.Section className="p-4">
            <TextInput
              placeholder="Enter your Google Maps API Key"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.currentTarget.value)}
              type="password"
            />
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={() => setShowApiForm(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (apiKeyInput.trim()) {
                    setShowApiForm(false);
                  }
                }}
              >
                Save
              </Button>
            </Group>
          </Card.Section>
        </Card>
      )}

      <div ref={mapContainerRef} style={{ height }} />

      {/* Top Navigation Bar - Absolute Positioned on Top of Map */}
      <div className="absolute top-12 left-0 right-0 z-50   p-3 flex items-center gap-3 pointer-events-auto">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="w-10 h-12 flex bg-white items-center justify-center rounded-lg hover:bg-gray-100 transition"
          title="Go back"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="relative">
            <TextInput
              size="lg"
              placeholder="Search location..."
              value={searchInput}
              onChange={(e) => handleSearchChange(e.currentTarget.value)}
              leftSection={<Search size={18} />}
              className="w-full"
            />

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-50 max-h-64 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectLocation(result.place_id)}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 transition"
                  >
                    <div className="font-medium text-sm">
                      {result.main_text}
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.secondary_text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-32 right-3 z-10 flex flex-col gap-2">
        {/* Traffic */}
        <div
          onClick={toggleTraffic}
          title="Traffic"
          className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow cursor-pointer hover:bg-gray-100"
        >
          <TrafficCone size={16} />
        </div>

        {/* Dark mode */}
        <div
          onClick={toggleDarkMode}
          title="Dark map"
          className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow cursor-pointer hover:bg-gray-100"
        >
          <Moon size={16} />
        </div>

        {/* Clear route */}
        <div
          onClick={clearRoute}
          title="Clear route"
          className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow cursor-pointer hover:bg-gray-100"
        >
          <XCircle size={16} />
        </div>
      </div>

      {/* Bottom Actions */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <Button
          leftSection={<LineSquiggle />}
          onClick={drawRoute}
          disabled={!userLocation}
          className="w-full mb-3"
        >
          Show Route
        </Button>

        <div className="flex gap-3">
          <Button
            leftSection={<Locate />}
            onClick={startTrackingLocation}
            className="flex-1"
          >
            My Location
          </Button>
          <Button
            leftSection={<SquareArrowOutUpRight />}
            onClick={openNavigation}
            className="flex-1"
          >
            Navigate
          </Button>
        </div>
      </div> */}

      {/* Location Confirm Drawer - Always visible at bottom */}
      <LocationConfirmDrawer
        location={selectedLocation}
        onConfirm={handleConfirmLocation}
        onEdit={() => {}}
      />
    </div>
  );
}

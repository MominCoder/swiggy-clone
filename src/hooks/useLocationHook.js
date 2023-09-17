import { useState, useEffect } from "react";

export default function useLocationHook() {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }

    geo.getCurrentPosition(onChange, onError);
  }, []);
  return { ...location, error };
}

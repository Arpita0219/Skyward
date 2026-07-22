import { useState, useEffect } from "react";

const STORAGE_KEY = "skyward_saved_locations";

const useSavedLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setLocations(JSON.parse(stored));
  }, []);

  const persist = (list) => {
    setLocations(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const addLocation = (city) => {
    const trimmed = city.trim();
    if (!trimmed || locations.includes(trimmed)) return;
    persist([...locations, trimmed]);
  };

  const removeLocation = (city) => {
    persist(locations.filter((c) => c !== city));
  };

  return { locations, addLocation, removeLocation };
};

export default useSavedLocations;
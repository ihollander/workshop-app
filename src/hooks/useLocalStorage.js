import { useEffect, useRef, useState } from "react";

function getLocalStorageValue(key, fallback) {
  const storedValue = window.localStorage.getItem(key);
  if (storedValue === null) return fallback;
  try {
    return JSON.parse(storedValue);
  } catch {}
  return storedValue;
}

function setLocalStorageValue(key, value) {
  const valueToStore =
    typeof value === "string" ? value : JSON.stringify(value);
  window.localStorage.setItem(key, valueToStore);
}

function useLocalStorage(key, initialValue = null) {
  // use this if no value is saved in localStorage
  const fallbackRef = useRef(initialValue);

  const [state, setState] = useState(() =>
    getLocalStorageValue(key, initialValue)
  );

  useEffect(() => {
    setLocalStorageValue(key, state);
  }, [key, state]);

  useEffect(() => {
    function handleChange() {
      const newValue = getLocalStorageValue(key, fallbackRef.current);
      setState(newValue);
    }

    window.addEventListener("storage", handleChange);

    return function cleanup() {
      window.removeEventListener("storage", handleChange);
    };
  }, [key]);

  return [state, setState];
}

export default useLocalStorage;

import { useState, Dispatch, SetStateAction } from "react";

/**
 *
 * @param keyName target key stored in localStorage
 * @param defaultValue used when key doesn't exist or setItem error
 */

type SetValue<T> = Dispatch<SetStateAction<T>>;
function useLocalStorage<T>(
  keyName: string,
  defaultValue: T
): [T, SetValue<T>] {
    
  // pass the function, run only the very first time when component render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue: SetValue<T> = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

import { useState } from "react";

/**
 * @param {Object} options - Options for the hook
 * @param {('local'|'session')} [options.storage='local'] - Type of storage to use. Default is 'local'.
 * @param {string} options.key - Key to use in storage.
 * @param {*} options.initial - Initial value.
 * @returns {[*, SetValueFunction, ClearValueFunction]} - Returns the value, set function, and clear function.
 */

const useBrowserStorage = ({ storage = "local", key, initial }) => {
  const storageApi = storage === "local" ? localStorage : sessionStorage;
  const solve = typeof window !== 'undefined' && storageApi

  const [value, setValue] = useState(() => {
    try {
      const item = solve && storageApi.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (error) {
      console.error(error);
      return initial;
    }
  });
  const set = (val) => {
    const newValue = { ...value, ...val }
    solve && storageApi.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }
  const clear = () => {
    solve && storageApi.removeItem(key);
    setValue(initial);
  }
  return [value, set, clear];
}

export default useBrowserStorage;
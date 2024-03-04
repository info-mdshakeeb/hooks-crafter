import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @param {Object} options - Options for the hook
 * @param {('local'|'session')} [options.storage='local'] - Type of storage to use. Default is 'local'.
 * @param {string} options.key - Key to use in storage.
 * @param {*} options.initial - Initial value.
 * @returns {[*, SetValueFunction, ClearValueFunction]} - Returns the value, set function, and clear function.
 */

const useBrowserStorage = ({ storage = "local", key, initial }) => {

  const solve = typeof window !== 'undefined';

  const [value, setValue] = useState(() => {
    try {
      const item = solve && storage === "local" ? localStorage.getItem(key) : solve && storage === "session" ? sessionStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initial;
    } catch (error) {
      console.error(error);
      return initial;
    }
  });
  const set = (val) => {
    const newValue = { ...value, ...val };
    const valueString = JSON.stringify(newValue);


    solve && storage === "local" ? localStorage.setItem(key, valueString) : sessionStorage.setItem(key, valueString);
    setValue(newValue);
  };
  const clear = () => {
    solve && storage === "local" ? localStorage.removeItem(key) : sessionStorage.removeItem(key);
    setValue(initial);
  };
  return [value, set, clear];
};

useBrowserStorage.propTypes = {
  storage: PropTypes.oneOf(['local', 'session']),
  key: PropTypes.string.isRequired,
  initial: PropTypes.any
};

export { useBrowserStorage };
# Introduction

A custom React hook for interacting with Web Storage (localStorage and sessionStorage).

## Installation

```bash
npm install hooks-crafter
```

Usage

```jsx
import useBrowserStorage from "hooks-crafter";

// Usage within a functional component
const [value, set, clear] = useBrowserStorage({ key: "myKey", initial: {} });
```

### Parameters

The `useBrowserStorage` hook takes an options object with the following properties:

`storage` (optional): Specifies the type of Web Storage to use. Can be either `"local"` for localStorage or "session" for sessionStorage. Defaults to `"local"`.
`key:` Specifies the key to use in the Web Storage.
`initial:` The initial value to use when the key is not yet present in the Web Storage.

### Return Values

The hook returns an array with three elements:

`value:` The current value from the Web Storage. If the key is not present in the Web Storage, this will be the initial value.
`set:` A function that takes a value and updates the value in the Web Storage. The new value is merged with the old value using the spread operator (...), so it's possible to partially update the value if it's an object.
`clear:` A function that removes the key from the Web Storage and sets the value back to the initial value.

### Error Handling

If there's an error while getting or setting the value in the Web Storage (for example, if the value is not valid JSON), the error will be logged to the console, and the value will be set to the initial value.

e.g.

```jsx
import { useBrowserStorage } from "hooks-crafter";

const MyComponent = () => {
  const [value, set, clear] = useBrowserStorage({ key: "myKey", initial: {} });

  const updateValue = () => {
    set({ name: "John", age: 30 });
  };

  return (
    <div>
      <p>Stored value: {JSON.stringify(value)}</p>
      <button onClick={updateValue}>Update Value</button>
      <button onClick={clear}>Clear Value</button>
    </div>
  );
};

export default MyComponent;
```

## License

MIT

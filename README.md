# JS Client SDK for Feature Flags API

### Install

```sh
npm i flags-js
```

## Usage

    import Features from 'flags-js';
    const apiKey = "123456790";

    async function Example(){
      const user = {
      key: "johnDoe@gmail.com", // must be unique
      attributes: {
        age: 25,
        gender: "male",
        sports: ["basketball","hockey"],
      }
    }

    const features =  await Features.initializeClient(apiKey,user);

    // simple on/off flag
    const shouldShowNewModal = features.isEnabled('new-modal-flag-key');
    // string flag
    const newToolbarColor = features.getFlagVariation('new-toolbar-flag')

    }

- `initializeClient` makes api call to fetch all flags
- attributes are what is matched in user targeting / segments

### `isEnabled(flagKey): Boolean`

Returns evaluation of flag for user. If flag is disabled or client initialization fails it returns false by default.

### `getFlagVariation(flagKey): Boolean`

Returns name of variation if exists, otherwise null. Using this for flag keys associated with boolean flags will return "On" or "Off".

import { ON_FLAG, OFF_FLAG, BASE_URL } from "./constants";

class Features {
  constructor(flags) {
    this.flags = flags;
    if (Array.isArray(flags)) {
      this.enabledMap = flags.reduce((acc, nxt) => {
        const isBoolFlag = [ON_FLAG, OFF_FLAG].includes(nxt.variation.name);
        if (isBoolFlag) {
          const evalStatus = (nxt.flag.enabled && nxt.variation.name === ON_FLAG) || false;
          acc[nxt.flag.key] = evalStatus;
        }
        return acc;
      }, {});
    }
  }

  isEnabled(key) {
    const result = this.enabledMap[key];
    return Boolean(result); // in case bad key is sent
  }

  getFlagVariation(key) {
    const flag = this.flags.find(({ flag }) => flag.key === key);
    if (flag) {
      return flag.variation.name;
    }
    return null;
  }
}

async function initializeClient(apiKey, user) {
  const url = `${BASE_URL}${apiKey}`;
  const body = JSON.stringify({ user: user });
  let flags;
  try {
    const res = await fetch(url, { body, method: "POST" });
    if (res.status === 400) {
      console.error("invalid feature flag api key, setting all flags to off");
      flags = null;
    } else {
      flags = await res.json();
    }
  } catch (err) {
    console.error("error fetching feature flags", err);
    console.error("features will all evaluate to default");
    flags = null;
  }
  return new Features(flags);
}

export default {
  initializeClient,
};

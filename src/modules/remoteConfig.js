import { fetchAndActivate, getRemoteConfig, getValue } from "firebase/remote-config";

const getConfig = async (key) => {
  const remoteConfig = getRemoteConfig();
  // remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

  await fetchAndActivate(remoteConfig);

  const param = getValue(remoteConfig, key);
  if (! param) {
    return null;
  }

  const value = param._value;

  if (! value) {
    return null;
  } else if (value === "true" || value === "false") {
    return value === "true";
  } else if (value === "null") {
    return null;
  } 
  
  const parsedFloat = parseFloat(value);
  if (parsedFloat === 0 || parsedFloat) {
    return parsedFloat;
  }

  if (value.startsWith("{") || value.startsWith("[")) {
    return JSON.parse(value);
  }

  return value;
}

const remoteConfigModule = {
  getConfig,
};

export default remoteConfigModule;

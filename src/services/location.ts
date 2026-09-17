import * as Location from "expo-location";


export async function locationRequest(): Promise<"denied"|"granted"> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return "denied";
  }

  return "granted";
}


export async function getCountry(): Promise<string|null> {
  const location = await Location.getCurrentPositionAsync({});

  const [address] = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  return address?.isoCountryCode ?? null;
}
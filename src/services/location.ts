import * as Location from "expo-location";

export async function locationRequest(): Promise<"denied"|"granted"> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return "denied";
  }

  return "granted";
}
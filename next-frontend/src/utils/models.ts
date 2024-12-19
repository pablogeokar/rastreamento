/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type DirectionsData = DirectionsResponseData & { request: any };

export type RouteModel = {
  id: string;
  name: string;
  source: { name: string; location: { lat: number; lng: number } };
  destination: { name: string; location: { lat: number; lng: number } };
  distance: number;
  duration: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  directions: DirectionsResponseData & { request: any };
  created_at: Date;
  updated_at: Date;
};

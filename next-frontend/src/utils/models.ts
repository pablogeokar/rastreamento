/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type DirectionsData = DirectionsResponseData & { request: any };

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Map } from "../utils/map";
import { getCurrentPosition } from "./geolocation";

export function useMap(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [map, setMap] = useState<Map | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["routes", "geometry", "marker"],
      });
      try {
        const [, , , position] = await Promise.all([
          loader.importLibrary("routes"),
          loader.importLibrary("geometry"),
          loader.importLibrary("marker"),
          getCurrentPosition({ enableHighAccuracy: true }),
        ]);

        if (!containerRef.current) return;
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const map = new Map(containerRef.current!, {
          mapId: "3a3b33f0dc57f900", //"8e0a97af9386fef", //theme
          zoom: 15,
          center: position,
        });
        setMap(map);
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    })();
  }, [containerRef]);

  return map;
}

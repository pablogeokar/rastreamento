"use client";

import { useMap } from "@/hooks/useMap";
import { socket } from "@/utils/socket-io";
import { useEffect, useRef } from "react";

export default function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef);

  useEffect(() => {
    if (!map) return;

    // conexão websocket apenas uma instância
    if (socket.disconnect()) {
      socket.connect();
    } else {
      // off geral
      socket.offAny();
    }

    socket.on(
      "server:new-points:list",
      async (data: { route_id: string; lat: number; lng: number }) => {
        if (!map.hasRoute(data.route_id)) {
          const response = await fetch(
            `http://localhost:3001/api/routes/${data.route_id}`
          );
          const route = await response.json();
          map.addRouteWithIcons({
            routeId: data.route_id,
            startMarkerOptions: {
              position: route.directions.routes[0].legs[0].start_location,
            },
            endMarkerOptions: {
              position: route.directions.routes[0].legs[0].end_location,
            },
            carMarkerOptions: {
              position: route.directions.routes[0].legs[0].start_location,
            },
          });
        }
        map.moveCar(data.route_id, { lat: data.lat, lng: data.lng });
      }
    );
    return () => {
      socket.disconnect();
    };
  }, [map]);

  return <div className="w-full h-full" ref={mapContainerRef} />;
}

"use client";

import { useMap } from "@/hooks/useMap";
import { useRef } from "react";

export default function MapDriver() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef);

  return <div className="w-2/3 h-full" ref={mapContainerRef} />;
}

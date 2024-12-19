/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createRouteAction(state: any, formData: FormData) {
  "use server";
  const { sourceId, destinationId } = Object.fromEntries(formData);

  const directionsResponse = await fetch(
    `http://localhost:3000/directions?originId=${sourceId}&destinationId=${destinationId}`
  );

  if (!directionsResponse.ok) {
    console.error(await directionsResponse.text());
    return { error: "Failed to fetch directions" };
  }

  const directionsData = await directionsResponse.json();

  const startAddress = directionsData.routes[0].legs[0].start_address;
  const endAddress = directionsData.routes[0].legs[0].end_address;

  const response = await fetch("http://localhost:3000/routes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${startAddress} - ${endAddress}`,
      source_id: directionsData.request.origin.place_id.replace(
        "place_id:",
        ""
      ),
      destination_id: directionsData.request.destination.place_id.replace(
        "place_id:",
        ""
      ),
    }),
  });

  if (!response.ok) {
    console.error(await response.text());
    return { error: "Failed to create route" };
  }

  revalidateTag("routes");

  return { success: true };
}

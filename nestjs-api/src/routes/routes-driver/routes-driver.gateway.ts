import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { RoutesService } from "../routes.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class RoutesDriverGateway {
  constructor(private routesService: RoutesService) {}

  @SubscribeMessage("client:new-points")
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async handleMessage(client: any, payload: any) {
    const { route_id } = payload;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const route: any = await this.routesService.findOne(route_id);
    const { steps } = route.directions.routes[0].legs[0];

    for (const step of steps) {
      const { lat, lng } = step.start_location;
      client.emit(`server:new-points/${route_id}:list`, { route_id, lat, lng });

      await sleep(2000);
      const { lat: lat2, lng: lng2 } = step.end_location;
      client.emit(`server:new-points/${route_id}:list`, {
        route_id,
        lat: lat2,
        lng: lng2,
      });
    }
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

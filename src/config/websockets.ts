import { Express } from "express"
import { GraphQLSchema } from "graphql"
import http, { Server } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";

export const initWebSockets = (app: Express, schema: GraphQLSchema): void => {
  const server: Server = http.createServer(app);

  const webSocketServer = new WebSocketServer({
    server: server,
    path: "/graphql"
  });

  useServer({ schema }, webSocketServer);

  const WS_PORT = process.env.WS_PORT;

  server.listen(WS_PORT, () => {
    console.log(`WebSocket server is running on port ${WS_PORT}`);
  });
}

export const pubSub = new PubSub();

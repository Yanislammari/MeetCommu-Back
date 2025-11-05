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
}

export const pubSub = new PubSub();

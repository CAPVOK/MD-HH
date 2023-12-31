import { Manager, Socket } from "socket.io-client";
import { BASE_URL, events, rooms } from "./types";
import store from "./store";
import { socketConnection } from "./slices/common";
import { Middleware } from "@reduxjs/toolkit";

const initialization = (socket: Socket) => {
  socket.on("connect", () => {
    store.dispatch(socketConnection({ type: "socketConnection", state: true }));
    console.log("Connection established :)");
  });
  socket.on("connect_error", () => {
    store.dispatch(
      socketConnection({ type: "socketConnection", state: false })
    );
    console.log("Socket disconnected!");
  });
};

const manager = new Manager(BASE_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});
const socket = manager.socket("/");
initialization(socket);

const someRoom = manager.socket(rooms.SOME_ROOM);

export const socketMiddleware: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ dispatch }) =>
  (next) =>
  (action) => {
    switch (action.type) {
      default:
        return next(action);
    }
  };

  someRoom.on(events.SET, (data: unknown) => {
    console.log("SomeRoom data", data);
  });



import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") ||
  "http://localhost:5000";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  const token = localStorage.getItem("servigo_token");

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  if (socket?.connected) {
    return socket;
  }

  socket = io(SOCKET_URL, {
    auth: {
      token,
    },

    transports: ["websocket", "polling"],

    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("🔌 ServiGo Socket connected:", socket?.id);
  });

  socket.on("connect_error", (error) => {
    console.error(
      "❌ ServiGo Socket connection error:",
      error.message
    );
  });

  socket.on("disconnect", (reason) => {
    console.log(
      "🔌 ServiGo Socket disconnected:",
      reason
    );
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
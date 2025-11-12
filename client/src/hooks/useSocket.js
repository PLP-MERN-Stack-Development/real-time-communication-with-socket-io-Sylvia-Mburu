import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL;

export function useSocket(userId) {
  const socketRef = useRef(null);
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"], // force websocket only for stability

    });

    socketRef.current = socket;
    setSocketInstance(socket);

    socket.connect();

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      setSocketInstance(null);
    };
  }, [userId]);

  return socketInstance;
}

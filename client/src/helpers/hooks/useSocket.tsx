import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Replace with your actual backend URL (or Ngrok URL)
const SOCKET_SERVER_URL = "https://a0c6-178-138-194-11.ngrok-free.app";

const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [maskStatus, setMaskStatus] = useState<{ jobId: string | null; error: string | null } | null>(null);

    useEffect(() => {
        const socketInstance = io(SOCKET_SERVER_URL, {
            transports: ["websocket"], // Force WebSocket connection
            withCredentials: true
        });

        socketInstance.on("masks_ready", (data) => {
            console.log("Received WebSocket event:", data);
            setMaskStatus(data);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return { socket, maskStatus };
};

export default useSocket;

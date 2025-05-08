import { useEffect, useState } from "react";
import { FORWARDED_PORT } from "../constants";
import { io, Socket } from "socket.io-client";

// Replace with your actual backend URL (or Ngrok URL)

const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [maskStatus, setMaskStatus] = useState<{ jobId: string | null; error: string | null, credits: number } | null>(null);

    useEffect(() => {
        const socketInstance = io(FORWARDED_PORT, {
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

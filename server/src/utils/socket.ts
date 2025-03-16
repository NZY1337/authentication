import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server; // Define io globally

export const initializeSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: { origin: "*" } // ✅ Allow frontend connections
    });

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    console.log("WebSocket initialized on same server.");
};

export { io };

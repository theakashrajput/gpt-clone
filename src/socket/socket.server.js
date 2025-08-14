import { Server } from "socket.io";
import { genrateAnswer } from "../services/ai.service.js";

const setUpSocketServer = (httpServer) => {
    const io = new Server(httpServer, {});


    io.on("connection", (socket) => {
        console.log("User connected");

        socket.on("user-prompt", async (prompt) => {
            const response = await genrateAnswer(prompt);
            socket.emit("ai-response", response);
        })

        socket.on("disconnect", () => {
            console.log("User disconnected");
        })

    })
}

export default setUpSocketServer;
import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import connectTODB from './src/db/db.js';
import { createServer } from 'http';
import setUpSocketServer from './src/socket/socket.server.js';


const httpServer = createServer(app);
setUpSocketServer(httpServer);

connectTODB();

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
})
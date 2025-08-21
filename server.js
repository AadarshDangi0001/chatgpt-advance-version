import dotenv from "dotenv";
dotenv.config();

import http from 'http';
import app from './src/app.js';
import connectDB from './src/db/db.js';
import setupSocketServer from "./src/socket/socket.server.js";


const httpServer = http.createServer(app);
const io = setupSocketServer(httpServer);

connectDB();


httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});
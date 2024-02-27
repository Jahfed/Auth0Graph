import express from "express";
import toolRouter from "./routes/toolRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from "tesseract.js";

const app = express();

//configuration --> set to .env or replace with server port;
const PORT = 3000;

//general middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//all the routes
app.use("/tools", toolRouter);

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: <please specify a reason of ignoring this>
app.get("/", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const _retfile = path.join(__dirname, 'public/index.html');
    res.sendFile(_retfile);
});

//define the port
app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});
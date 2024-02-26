import express from "express";
import cors from "cors";
import toolRouter from "./routes/toolRoute.js";

const app = express();

//configuration --> set to .env or replace with server port;
const PORT = 3000;

//general middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

//all the routes
app.use("/tools", toolRouter);

app.get("/", (req, res) => {
    res.send("Hello worlds!");
});

//define the port
app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});
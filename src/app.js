import express from "express"
import rateLimit from "./config/rateLimit.js";
import routeIndex from "./routes/index.js";
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 3000;

app
    .use(rateLimit)

    .use(express.json())

    .use("/api", routeIndex)

    .listen(PORT, ()=> {
        console.log(`server in http://127.10.10.10:${PORT}`);
    })
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routerApi from "./routes/index.js";
import { sequelize } from "./db/config.js";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

const whitelist = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://localhost:5173",
    "https://localhost:5173",
];

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}
dbConnection();


routerApi(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

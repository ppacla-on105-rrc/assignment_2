import express, { Express } from "express";
import morgan from "morgan";
import healthRoutes from "./api/v1/routes/healthRoutes";

const app: Express = express();

app.use(express.json());
app.use(morgan("combined"));

app.use("/api/v1", healthRoutes);

export default app;

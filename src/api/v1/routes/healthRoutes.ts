import { Router } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

const router = Router();

router.get("/health", (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

export default router;

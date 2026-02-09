import { Router } from "express";
import * as ticketController from "../controllers/ticketController";

const router = Router();

router.get("/tickets", ticketController.getAllTickets);

export default router;

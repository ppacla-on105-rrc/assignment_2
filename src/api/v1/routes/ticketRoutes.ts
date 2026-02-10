import { Router } from "express";
import * as ticketController from "../controllers/ticketController";

const router = Router();

router.get("/tickets", ticketController.getAllTickets);
router.get("/tickets/:id", ticketController.getTicketById);
router.post("/tickets", ticketController.createTicket);
router.put("/tickets/:id", ticketController.updateTicket);
router.delete("/tickets/:id", ticketController.deleteTicket);
router.get("/tickets/:id/urgency", ticketController.getTicketUrgency);


export default router;

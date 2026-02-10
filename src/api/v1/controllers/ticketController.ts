import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as ticketService from "../services/ticketService";
import { TicketStatus } from "../services/ticketTypes";
import { tickets } from "../../../data/tickets";



export const getAllTickets = (req: Request, res: Response): void => {
  const allTickets = ticketService.getAllTickets();

  res.status(HTTP_STATUS.OK).json({
    message: "Tickets retrieved",
    count: allTickets.length,
    data: allTickets,
  });
};

export const getTicketById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const ticket = ticketService.getTicketById(id);

  if (!ticket) {
    res.status(404).json({ message: "Ticket not found" });
    return;
  }

  res.status(200).json({
    message: "Ticket retrieved",
    data: ticket,
  });
};

export const createTicket = (req: Request, res: Response): void => {

    if (!req.body) {
    res.status(400).json({ message: "Missing request body" });
    return;
  }

  const { title, description, priority } = req.body;

  if (!title) {
    res.status(400).json({ message: "Missing required field: title" });
    return;
  }

  if (!description) {
    res.status(400).json({ message: "Missing required field: description" });
    return;
  }

  const validPriorities = ["critical", "high", "medium", "low"];

  if (!validPriorities.includes(priority)) {
    res.status(400).json({
      message: "Invalid priority. Must be one of: critical, high, medium, low",
    });
    return;
  }

  const newTicket = {
    id: tickets.length + 1,
    title,
    description,
    priority,
    status: "open" as TicketStatus,
    createdAt: new Date().toISOString(),
  };

  const created = ticketService.createTicket(newTicket);

  res.status(201).json({
    message: "Ticket created",
    data: created,
  });
};

export const updateTicket = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const ticket = ticketService.getTicketById(id);

  if (!ticket) {
    res.status(404).json({ message: "Ticket not found" });
    return;
  }

  const { priority, status } = req.body;

  const validPriorities = ["critical", "high", "medium", "low"];
  const validStatuses = ["open", "in-progress", "resolved"];

  if (priority && !validPriorities.includes(priority)) {
    res.status(400).json({
      message: "Invalid priority. Must be one of: critical, high, medium, low",
    });
    return;
  }

  if (status && !validStatuses.includes(status)) {
    res.status(400).json({
      message: "Invalid status. Must be one of: open, in-progress, resolved",
    });
    return;
  }

  const updated = ticketService.updateTicket(id, req.body);

  res.status(200).json({
    message: "Ticket updated",
    data: updated,
  });
};

export const deleteTicket = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const deleted = ticketService.deleteTicket(id);

  if (!deleted) {
    res.status(404).json({ message: "Ticket not found" });
    return;
  }

  res.status(200).json({ message: "Ticket deleted" });
};

export const getTicketUrgency = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const ticket = ticketService.getTicketById(id);

  if (!ticket) {
    res.status(404).json({ message: "Ticket not found" });
    return;
  }

  const urgency = ticketService.calculateUrgency(ticket);

  res.status(200).json({
    message: "Ticket urgency calculated",
    data: {
      ...ticket,
      ...urgency,
    },
  });
};

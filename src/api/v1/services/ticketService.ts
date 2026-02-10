import { tickets } from "../../../data/tickets";
import { Ticket } from "./ticketTypes";

export const getAllTickets = (): Ticket[] => {
  return tickets;
};

export const getTicketById = (id: number) => {
  return tickets.find(ticket => ticket.id === id);
};

export const createTicket = (ticket: Ticket) => {
  tickets.push(ticket);
  return ticket;
};

export const updateTicket = (id: number, updates: Partial<Ticket>) => {
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) return null;

  Object.assign(ticket, updates);

  return ticket;
};

export const deleteTicket = (id: number): boolean => {
  const index = tickets.findIndex((t) => t.id === id);

  if (index === -1) return false;

  tickets.splice(index, 1);
  return true;
};

export const calculateUrgency = (ticket: Ticket) => {
  const baseScores: Record<string, number> = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10,
  };

  const created = new Date(ticket.createdAt);
  const now = new Date();

  const ageInDays = Math.floor(
    (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  );

  const urgencyScore = baseScores[ticket.priority] + ageInDays * 5;

  let urgencyLevel = "";

  if (ticket.status === "resolved") {
    urgencyLevel = "Resolved ticket. No urgency.";
  } else if (urgencyScore >= 80) {
    urgencyLevel = "Critical urgency. Immediate action required.";
  } else if (urgencyScore >= 50) {
    urgencyLevel = "High urgency. Address as soon as possible.";
  } else if (urgencyScore >= 30) {
    urgencyLevel = "Medium urgency. Schedule soon.";
  } else {
    urgencyLevel = "Low urgency. Address when capacity allows.";
  }

  return {
    ticketAge: ageInDays,
    urgencyScore,
    urgencyLevel,
  };
};


import { tickets } from "../../../data/tickets";
import { Ticket } from "./ticketTypes";

export const getAllTickets = (): Ticket[] => {
  return tickets;
};

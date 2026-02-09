import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as ticketService from "../services/ticketService";

export const getAllTickets = (req: Request, res: Response): void => {
  const allTickets = ticketService.getAllTickets();

  res.status(HTTP_STATUS.OK).json({
    message: "Tickets retrieved",
    count: allTickets.length,
    data: allTickets,
  });
};

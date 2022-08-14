import tracksModel from "../models/tracks";
import { Request, Response } from "express";

/**
 * Obtener lista de la db
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    // const user = req.user;
    const data = await tracksModel.findAllData();
    res.send({ data });
  } catch (error) {
    res.status(400);
    res.send({ error: "ERROR_GET_ITEMS" });
  }
};

/**
 * Obtener un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req: Request, res: Response) => {
  try {
    const data = await tracksModel.findOne();
    res.send({ data });
  } catch (error) {
    res.status(400);
    res.send({ error: "ERROR_GET_ITEMS" });
  }
};

export { getItems, getItem };

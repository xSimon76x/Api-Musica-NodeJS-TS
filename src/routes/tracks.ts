// import { validatorCreateItem, validatorGetItem } from "../validators/tracks";
// import customHeader from "../middleware/customHeader";
// import authMiddleware from "../middleware/session";
// import checkRol from "../middleware/rol";
import express from "express";
import { getItems } from "../controllers/tracks";
const router = express.Router();

//TODO https://localhost/tracks GET

/**
 * Obtener todos los items
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Listar canciones"
 *      description: Obten todas las listas de las canciones
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las canciones.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", getItems);

export { router };

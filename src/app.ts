//  conts express = require("express")

import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import openApiConfiguration from "./docs/swagger";
import dbConnectNoSql from "./config/mongo";
import routes from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
app.use("/api", routes);
app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(openApiConfiguration)
);

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || "deveploment";

// app.get("/", (req: Request, res: Response) => {
//   console.log("first");
// });

app.listen(PORT, () => {
  console.log("Listo por el puerto " + PORT);
});

ENGINE_DB === "nosql"
  ? dbConnectNoSql()
  : console.log("No Hay conexión a la Base de Datos"); //dbConnectMySQL();

export default app;

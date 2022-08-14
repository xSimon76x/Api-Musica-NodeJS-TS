import express, { Router } from "express";
import { readdirSync } from "fs";

const router: Router = express.Router();
const PATH_ROUTES = __dirname; // ruta absoluta de donde se encuentra este archivo

const removeExtension = (fileName: string): string => {
  const cleanFileName = <string>fileName.split(".").shift();
  return cleanFileName;
};

/**
 *
 * @param file tracks.ts
 */
function loadRouter(file: string): void {
  const name = removeExtension(file); //llega index o tracks
  if (name !== "index") {
    import(`./${file}`).then((routerModule) => {
      console.log(`Cargando ruta ${name}`);
      //TODO localhost
      router.use(`/${name}`, routerModule.router); // https://localhost:/3000/api/tracks
    });
  }
}
// leer el directorio de path, para devolver un array
readdirSync(PATH_ROUTES).filter((file) => loadRouter(file));

export default router;

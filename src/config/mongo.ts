import { connect } from "mongoose";

const NODE_ENV = process.env.NODE_ENV || "development";

async function dbConnectNoSql(): Promise<void> {
  // Con la definición de <string> definimos que el valor de la derecha, sera un string
  try {
    const DB_URI_NOSQL =
      NODE_ENV === "test"
        ? <string>process.env.DB_URI_TEST
        : <string>process.env.DB_URI;

    await connect(DB_URI_NOSQL).then(() => {
      console.log("**** CONEXION NO_SQL CORRECTA ****");
    });
  } catch (error) {
    console.log(error);
  }
}

export default dbConnectNoSql;

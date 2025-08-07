import express from "express";
import { productManager } from "./src/manager/product-manager.js";
import { errorHandler } from "./src/middlewares/error-handler.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(errorHandler);

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
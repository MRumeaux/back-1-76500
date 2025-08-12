import express from "express";
import { productRouter } from "./src/routes/product-router.js";
import { cartRouter } from "./src/routes/cart-router";
import { errorHandler } from "./src/middlewares/error-handler.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
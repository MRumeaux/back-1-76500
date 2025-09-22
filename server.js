import express from "express";
import handlebars from 'express-handlebars';
import productRouter from "./src/routes/product-router.js";
import cartRouter from "./src/routes/cart-router.js";
import viewsRouter from "./src/routes/views.router.js";
import { errorHandler } from "./src/middlewares/error-handler.js";
import { initMongoDB } from "./src/config/connect-mongo.js";
import { cartManager } from "./src/manager/cart-manager.js";

initMongoDB()
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

let defaultCartId = null;

const init = async () => {
    const newCart = await cartManager.createCart();
    defaultCartId = newCart._id.toString();
};

init();

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${process.cwd()}/src/public`))

app.engine('handlebars', handlebars.engine());
app.set('views', `${process.cwd()}/src/views`);
app.set('view engine', 'handlebars');

app.use((res, req, next) => {
    try {
        res.locals.defaultCartId = defaultCartId;
    } catch (error) {
        next(error)
    }
})
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));

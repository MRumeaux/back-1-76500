import express from "express";
import { Server } from "socket.io";
import handlebars from 'express-handlebars';
import productRouter from "./src/routes/product-router.js";
import cartRouter from "./src/routes/cart-router.js";
import productList from "./src/routes/views.router.js";
import { errorHandler } from "./src/middlewares/error-handler.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${process.cwd()}/src/public`))

app.engine('handlebars', handlebars.engine());
app.set('views', `${process.cwd()}/src/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/realtimeproducts', productList);

app.use(errorHandler);

const httpServer = app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {

    console.log(`Usuario conectado ${socket.id}`)
    socket.on('disconnect', () => {
        console.log(`Usuario desconectado`)
    })

    socket.on('newProd', (prod) => {
        socketServer.emit('products', acaVaAlgoADeterminar)
    })

})
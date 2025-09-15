import { model, Schema } from "mongoose";

const CartSchema = new Schema({
    products: [
        {
            product: {},
            quantity: {}
        }
    ]
});

export const CartModel = new model("Cart", CartSchema);
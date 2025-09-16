import { model, Schema } from "mongoose";

const CartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
});

export const CartModel = new model("cart", CartSchema);
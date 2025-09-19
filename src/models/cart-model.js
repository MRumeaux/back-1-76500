import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            products: {
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

CartSchema.pre("find", function () {
    this.populate("products");
});

CartSchema.pre("findById", function () {
    this.populate("products");
});

CartSchema.pre("findByIdAndUpdate", function () {
    this.populate("products");
});

CartSchema.pre("findOne", function () {
    this.populate("products");
});

CartSchema.pre("findOneAndUpdate", function () {
    this.populate("products");
});


export const CartModel = model("cart", cartSchema);
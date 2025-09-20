import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "product",
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
    this.populate("products.product");
});

CartSchema.pre("findById", function () {
    this.populate("products.product");
});

CartSchema.pre("findByIdAndUpdate", function () {
    this.populate("products.product");
});

CartSchema.pre("findOne", function () {
    this.populate("products.product");
});

CartSchema.pre("findOneAndUpdate", function () {
    this.populate("products.product");
});


export const CartModel = model("cart", cartSchema);
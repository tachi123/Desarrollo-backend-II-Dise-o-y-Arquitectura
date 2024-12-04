import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const collection = "Orders";
const schema = new Schema({
  number: Number,
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  products: [Number],
  totalPrice: Number
});

const orderModel = mongoose.model(collection, schema);
export default orderModel;
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const collection = "Users";
const schema = new Schema({
  name: String,
  email: String,
  role: String,
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Orders'
  }]
});

const usersModel = mongoose.model(collection, schema);
export default usersModel;
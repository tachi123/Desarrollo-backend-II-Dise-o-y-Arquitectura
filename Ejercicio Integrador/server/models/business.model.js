import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const collection = "Business";
const schema = new Schema({
  name: String,
  products: []
});


const businessModel = mongoose.model(collection, schema);
export default businessModel;
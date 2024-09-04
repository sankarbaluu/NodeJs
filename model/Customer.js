import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true,unique:true },
  email: { type: String, required: true,unique:true},
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
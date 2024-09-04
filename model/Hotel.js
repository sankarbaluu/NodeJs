import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;

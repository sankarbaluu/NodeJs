import express from 'express';
import Customer from '../model/Customer.js';
import Hotel from '../model/Hotel.js';
import { checkAdmin } from '../checkAdmin.js';

const router = express.Router();

// Getting the list of hotels from db
router.get('/',async (req, res) => {
    try {
        const hotels = await Hotel.find().populate('owner');
        res.json(hotels);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    //console.log(hotels);
    //res.send(hotels);
})

// Adding hotels to db
router.post('/',checkAdmin, async (req, res) => {

    const hotel = new Hotel(req.body);
    try {
      const savedHotel = await hotel.save();
      res.status(201).json(savedHotel);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    //res.send(`${hotel.name} has been added to the Database`);
})

// get a particular hotel
router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
          return res.status(404).send();
        }
        res.send(hotel);
      } catch (error) {
        res.status(400).send(error);
      }
    //res.send(foundhotel)
});

// delete the hotel from the database
router.delete('/:id', checkAdmin, async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hotel deleted' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

// Make a PATCH request to the database
router.patch('/:id', checkAdmin, async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!hotel) {
          return res.status(404).send();
        }
        res.send(hotel);
      } catch (error) {
        res.status(400).send(error);
      }
  
});
export default router

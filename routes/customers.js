import express from 'express';
import Customer from '../model/Customer.js';
import Hotel from '../model/Hotel.js';
import {checkAdmin} from '../checkAdmin.js';

const router = express.Router();

let id=1;

let customers = [
  // {
  //   first_name: 'John',
  //   last_name: 'Doe',
  //   email: 'johndoe@example.com',
    // type:admin
  // },
  // {
  //   first_name: 'Alice',
  //   last_name: 'Smith',
  //   email: 'alicesmith@example.com',
  // },
];

// Getting the list of customers from
router.get('/',async (req, res) => {
    try {
        const customers = await Customer.find().populate('hotels');
        res.json(customers);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    //console.log(customers);
    //res.send(customers);
})

// Adding customers to db
router.post('/',checkAdmin, async (req, res) => {

    const customer = new Customer(req.body);
    try {
      const savedCustomer = await customer.save();
      res.status(201).json(savedCustomer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    //res.send(`${customer.name} has been added to the Database`);
})

// get a particular customer
router.get('/:id',async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
          return res.status(404).send();
        }
        res.send(customer);
      } catch (error) {
        res.status(400).send(error);
      }
    //res.send(foundcustomer)
});

// delete the customer from the database
router.delete('/:id', checkAdmin, async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Customer deleted' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

// Make a PATCH request to the database
router.patch('/:id',checkAdmin, async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!customer) {
          return res.status(404).send();
        }
        res.send(customer);
      } catch (error) {
        res.status(400).send(error);
      }
  
});
export default router
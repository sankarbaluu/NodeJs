import express from 'express';
import bodyParser from 'body-parser'
const app = express();
import custRoutes from './routes/customers.js'
import hotelRoutes from './routes/hotels.js'
import connectDB from './db.js';

const PORT = 5000;
connectDB();
app.use(bodyParser.json());

app.use('/customer', custRoutes);
app.use('/hotel', hotelRoutes);

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE'))

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
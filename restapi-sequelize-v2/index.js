import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoute.js';
import db from './models/dbConnection.js';

const app = express();

// cors pass
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// db syncing
db.sequelize.authenticate()
	.then(() => {
		console.log('DB connection has been established successfully.');
	})
	.catch((err) => {
		console.log('Failed to establish db connection: ' + err.message);
	});

app.use('/api/product', productRoutes);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
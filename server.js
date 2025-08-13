import app from './src/app.js';
import connectTODB from './src/db/db.js';
import dotenv from 'dotenv';
dotenv.config();

connectTODB();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
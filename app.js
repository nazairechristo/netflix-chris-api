const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/Auth');
const userRoute = require('./routes/User');
const movieRoute = require('./routes/Movie');
const listRoute = require('./routes/List');

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connection on MongoDB successfull'))
    .catch((err) => console.log('Connection Failed : ' + err))


    
    
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);






app.listen(PORT, () => console.log(`Backend starting on http://localhost:${PORT}`));
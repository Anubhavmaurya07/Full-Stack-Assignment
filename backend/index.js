const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToDB = require("./utils/db.js")
const authRoute = require("./routes/auth.route.js");
const movieRoute = require("./routes/movies.route.js")


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
// Database connection
connectToDB();

// Middlewares
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the Movie API');
});

// Routes
app.use('/api', authRoute);
app.use('/api', movieRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

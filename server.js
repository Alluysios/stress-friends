const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Set environment file path
dotenv.config({ path: './config.env' });
const app = require('./app');

const db = process.env.DATABASE_SF;
// Connect to Database
mongoose.connect(db, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
).then(() => {
    console.log('Database connected');
}).catch(() => {
    console.log('Something is wrong with the database');
})

// PORT *required for HEROKU DEPLOYMENT
const PORT = process.env.PORT || 8000;

// Server listen/start
app.listen(PORT, () => {
    console.log(`App listening on port:${PORT}`);
});
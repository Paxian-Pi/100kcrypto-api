const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

// Initialize port
const port = process.env.PORT || 5000

// Define routes
const user = require('./routes/users')

// Initialize app
const app = express()

// Configure cross origin
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

//  Configure Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Banking API',
            version: '1.0.0',
            contact: {
                email: "paxian.pi@gmail.com",
            }
        },
        servers: [
            { url: `http://localhost:5000` }
        ],
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`],
}

const specs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

// Configure midleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Passport initialization
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Configure Db
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Can\'t connect to MongoDB...\n' + err))

// Test server
app.get('/', (req, res) => res.send('Welcome! The 100k Crypto API'))

// Use routes
app.use('/api/user', user)


app.listen(port, () => console.log(`Server running on port ${port}`))
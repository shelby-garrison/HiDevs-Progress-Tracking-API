const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const progressRoutes = require('./routes/progressRoutes');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const moduleRoutes = require("./routes/moduleRoutes");


const app = express();

// Middlewares
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100
});
app.use(limiter);

//Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for our platform',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ BearerAuth: [] }],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // 
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.use('/api/progress', progressRoutes);

app.use("/api/modules", moduleRoutes);

app.use('/auth', require('./routes/auth'));

app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);
connectDB();

module.exports = app;
